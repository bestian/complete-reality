const FAVORITES_KEY = 'complete-reality:favorites'

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

function removeFavorite(path) {
  const next = readFavorites().filter((item) => item.path !== path)
  writeFavorites(next)
  return next
}

function formatSavedAt(savedAt) {
  if (!savedAt) return ''

  const date = new Date(savedAt)
  if (Number.isNaN(date.getTime())) return ''

  return date.toLocaleString('zh-Hant-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function createCard(item) {
  const card = document.createElement('article')
  card.className = 'favorite-card'
  card.dataset.path = item.path || ''

  const titleLink = document.createElement('a')
  titleLink.className = 'favorite-title'
  titleLink.href = item.path || '/'
  titleLink.textContent = item.title || item.slug || '未命名文章'

  const desc = document.createElement('p')
  desc.className = 'favorite-description'
  desc.textContent = item.description || '沒有摘要。'

  const meta = document.createElement('div')
  meta.className = 'favorite-meta'

  const pathText = document.createElement('span')
  pathText.className = 'favorite-path'
  pathText.textContent = item.path || '/'

  const savedAt = document.createElement('span')
  savedAt.className = 'favorite-saved-at'
  const savedAtText = formatSavedAt(item.savedAt)
  savedAt.textContent = savedAtText ? `收藏時間：${savedAtText}` : ''

  meta.append(pathText, savedAt)

  const removeButton = document.createElement('button')
  removeButton.type = 'button'
  removeButton.className = 'favorite-remove'
  removeButton.textContent = '移除'
  removeButton.addEventListener('click', () => {
    const next = removeFavorite(item.path)
    renderFavorites(next)
  })

  card.append(titleLink, desc, meta, removeButton)
  return card
}

function renderFavorites(items) {
  const root = document.querySelector('[data-favorites-root]')
  if (!root) return

  root.textContent = ''

  if (items.length === 0) {
    const empty = document.createElement('div')
    empty.className = 'favorites-empty'

    const title = document.createElement('h2')
    title.className = 'favorites-empty-title'
    title.textContent = '目前還沒有收藏'

    const tip = document.createElement('p')
    tip.className = 'favorites-empty-tip'
    tip.textContent = '在文章頁向右滑即可加入我的最愛。'

    const goHome = document.createElement('a')
    goHome.href = '/'
    goHome.className = 'favorites-empty-link'
    goHome.textContent = '回首頁看看文章'

    empty.append(title, tip, goHome)
    root.append(empty)
    return
  }

  const list = document.createElement('div')
  list.className = 'favorites-list'
  items.forEach((item) => {
    list.append(createCard(item))
  })

  const clearButton = document.createElement('button')
  clearButton.type = 'button'
  clearButton.className = 'favorites-clear'
  clearButton.textContent = '清空我的最愛'
  clearButton.addEventListener('click', () => {
    writeFavorites([])
    renderFavorites([])
  })

  root.append(list, clearButton)
}

if (document.querySelector('.favorites-page')) {
  renderFavorites(readFavorites())
}
