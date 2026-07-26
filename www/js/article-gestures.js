const FAVORITES_KEY = 'complete-reality:favorites'
const SWIPE_THRESHOLD = 72
const MAX_TRANSLATE = 132
const DIRECTION_LOCK = 14

function readFavorites() {
  try {
    const raw = window.localStorage.getItem(FAVORITES_KEY)
    if (!raw) return []

    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function writeFavorites(items) {
  window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(items))
}

function saveFavorite(meta) {
  const items = readFavorites().filter((item) => item.path !== meta.path)
  writeFavorites([meta, ...items])
}

function isFavorited(path) {
  return readFavorites().some((item) => item.path === path)
}

function getArticleMeta(page) {
  const title = page.dataset.articleTitle || page.dataset.articleSlug || document.title
  const path = page.dataset.articlePath || window.location.pathname
  const description = page.dataset.articleDescription || ''
  const slug = page.dataset.articleSlug || title

  return {
    title,
    path,
    description,
    slug,
    savedAt: new Date().toISOString(),
  }
}

function canUseSwipeGesture() {
  return 'ontouchstart' in window && window.matchMedia('(pointer: coarse)').matches
}

function canGoBackInApp() {
  if (window.history.length <= 1 || !document.referrer) return false

  try {
    return new URL(document.referrer).origin === window.location.origin
  } catch {
    return false
  }
}

function createToastController(toast) {
  if (!toast) return () => {}

  let toastTimer = 0

  return (message) => {
    toast.textContent = message
    toast.classList.add('is-visible')
    window.clearTimeout(toastTimer)
    toastTimer = window.setTimeout(() => {
      toast.classList.remove('is-visible')
    }, 1600)
  }
}

function setFavoriteButtonState(button, saved) {
  if (!button) return
  button.classList.toggle('is-saved', saved)
  button.textContent = saved ? '★ 已收藏' : '☆ 收藏'
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[char])
}

function buildShareText(meta, url) {
  const description = meta.description ? `\n\n${meta.description}` : ''
  return `[${meta.title}](${url})${description}`
}

function buildShareHtml(meta, url) {
  const description = meta.description ? `<p>${escapeHtml(meta.description)}</p>` : ''
  return `<p><a href="${escapeHtml(url)}">${escapeHtml(meta.title)}</a></p>${description}`
}

async function copyToClipboard(meta, url, showToast) {
  const text = buildShareText(meta, url)

  if (navigator.clipboard && navigator.clipboard.write && typeof ClipboardItem === 'function') {
    try {
      await navigator.clipboard.write([
        new ClipboardItem({
          'text/plain': new Blob([text], { type: 'text/plain' }),
          'text/html': new Blob([buildShareHtml(meta, url)], { type: 'text/html' }),
        }),
      ])
      showToast('已複製連結')
      return
    } catch {
      // fall through to plain-text fallback
    }
  }

  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(text)
      showToast('已複製連結')
      return
    } catch {
      // fall through to manual hint
    }
  }
  showToast('請手動複製網址')
}

function setupShareButton(page, showToast) {
  const shareButton = page.querySelector('[data-share-button]')
  if (!shareButton) return

  shareButton.addEventListener('click', async () => {
    const meta = getArticleMeta(page)
    const url = new URL(meta.path, window.location.origin).href
    const shareData = {
      title: meta.title,
      text: `${meta.description || meta.title}\n${url}`,
      url,
    }

    if (typeof navigator.share === 'function') {
      try {
        await navigator.share(shareData)
        return
      } catch (err) {
        if (err && err.name === 'AbortError') return
        // fall through to clipboard fallback
      }
    }

    await copyToClipboard(meta, url, showToast)
  })
}

function setupFavoriteButton(page, showToast) {
  const favoriteButton = page.querySelector('[data-favorite-button]')
  if (!favoriteButton) return

  const meta = getArticleMeta(page)
  setFavoriteButtonState(favoriteButton, isFavorited(meta.path))

  favoriteButton.addEventListener('click', () => {
    const alreadySaved = isFavorited(meta.path)
    if (alreadySaved) {
      showToast('這篇已在我的最愛')
      setFavoriteButtonState(favoriteButton, true)
      return
    }

    try {
      saveFavorite(getArticleMeta(page))
      setFavoriteButtonState(favoriteButton, true)
      showToast('已加入我的最愛')
    } catch {
      showToast('無法寫入我的最愛')
    }
  })
}

function setupPrintButton(page) {
  const printButton = page.querySelector('[data-print-button]')
  if (!printButton) return

  printButton.addEventListener('click', () => {
    window.print()
  })
}

function setupSwipeGesture(page, showToast) {
  const frame = page.querySelector('.article-gesture-frame')
  if (!frame || !canUseSwipeGesture()) return

  let startX = 0
  let startY = 0
  let currentX = 0
  let trackingTouch = false
  let dragging = false

  function setOffset(offset) {
    page.style.setProperty('--swipe-offset', `${offset}px`)
  }

  function setDirection(offset) {
    if (offset > 18) {
      page.dataset.swipeDirection = 'right'
      return
    }

    if (offset < -18) {
      page.dataset.swipeDirection = 'left'
      return
    }

    delete page.dataset.swipeDirection
  }

  function resetSwipe() {
    page.classList.remove('is-swiping')
    delete page.dataset.swipeDirection
    setOffset(0)
  }

  function finishSwipe(deltaX) {
    if (deltaX >= SWIPE_THRESHOLD) {
      try {
        saveFavorite(getArticleMeta(page))
        showToast('已加入我的最愛')
        setFavoriteButtonState(page.querySelector('[data-favorite-button]'), true)
      } catch {
        showToast('無法寫入我的最愛')
      }
      return
    }

    if (deltaX <= -SWIPE_THRESHOLD) {
      showToast('返回上一頁')
      window.setTimeout(() => {
        if (canGoBackInApp()) {
          window.history.back()
          return
        }

        window.location.href = '/'
      }, 120)
    }
  }

  frame.addEventListener('touchstart', (event) => {
    if (event.touches.length !== 1) return

    const touch = event.touches[0]
    trackingTouch = true
    dragging = false
    startX = touch.clientX
    startY = touch.clientY
    currentX = touch.clientX
  }, { passive: true })

  frame.addEventListener('touchmove', (event) => {
    if (!trackingTouch || event.touches.length !== 1) return

    const touch = event.touches[0]
    const deltaX = touch.clientX - startX
    const deltaY = touch.clientY - startY
    currentX = touch.clientX

    if (!dragging) {
      if (Math.abs(deltaX) < DIRECTION_LOCK) return

      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        trackingTouch = false
        resetSwipe()
        return
      }

      dragging = true
      page.classList.add('is-swiping')
    }

    event.preventDefault()

    const clampedOffset = Math.max(-MAX_TRANSLATE, Math.min(MAX_TRANSLATE, deltaX))
    setOffset(clampedOffset)
    setDirection(clampedOffset)
  }, { passive: false })

  function handleTouchEnd() {
    if (!trackingTouch) {
      resetSwipe()
      return
    }

    const deltaX = currentX - startX
    trackingTouch = false
    finishSwipe(deltaX)
    resetSwipe()
  }

  frame.addEventListener('touchend', handleTouchEnd, { passive: true })
  frame.addEventListener('touchcancel', handleTouchEnd, { passive: true })
}

function setupArticlePage(page) {
  const showToast = createToastController(page.querySelector('.article-swipe-toast'))
  setupShareButton(page, showToast)
  setupFavoriteButton(page, showToast)
  setupPrintButton(page)
  setupSwipeGesture(page, showToast)
}

document.querySelectorAll('.article-page').forEach(setupArticlePage)
