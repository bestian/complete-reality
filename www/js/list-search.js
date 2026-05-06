const island = document.getElementById('list-search-island')

if (island) {
  const VUE_CDN = 'https://unpkg.com/vue@3.5.32/dist/vue.esm-browser.prod.js'
  const articleList = document.querySelector('.article-list')
  const cards = articleList ? Array.from(articleList.querySelectorAll('.article-card')) : []
  const originalHtml = new WeakMap()
  cards.forEach((card) => originalHtml.set(card, card.innerHTML))
  const initialKeyword = island.dataset.initialKeyword || new URL(window.location.href).searchParams.get('keyword') || ''
  let currentKeyword = initialKeyword

  function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  }

  function urlWithKeyword(rawKeyword) {
    const url = new URL(window.location.href)
    const keyword = rawKeyword.trim()

    if (keyword) {
      url.searchParams.set('keyword', keyword)
    } else {
      url.searchParams.delete('keyword')
    }

    return url
  }

  function syncUrlKeyword(rawKeyword) {
    const nextUrl = urlWithKeyword(rawKeyword)
    const current = `${window.location.pathname}${window.location.search}`
    const next = `${nextUrl.pathname}${nextUrl.search}`
    if (current !== next) {
      window.history.replaceState({}, '', next)
    }
  }

  function syncStateLinks(rawKeyword) {
    const keyword = rawKeyword.trim()

    document.querySelectorAll('[data-list-state-link]').forEach((link) => {
      const href = link.getAttribute('href')
      if (!href) return

      const url = new URL(href, window.location.origin)
      if (keyword) {
        url.searchParams.set('keyword', keyword)
      } else {
        url.searchParams.delete('keyword')
      }

      link.setAttribute('href', `${url.pathname}${url.search}${url.hash}`)
    })
  }

  function highlightTextNodes(root, keyword) {
    const escaped = escapeRegex(keyword)
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const tag = node.parentNode && node.parentNode.nodeName
        if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'MARK') {
          return NodeFilter.FILTER_REJECT
        }
        return NodeFilter.FILTER_ACCEPT
      },
    })
    const targets = []
    let n
    while ((n = walker.nextNode())) targets.push(n)

    targets.forEach((textNode) => {
      const text = textNode.textContent
      const regex = new RegExp(escaped, 'gi')
      const matches = [...text.matchAll(regex)]
      if (matches.length === 0) return

      const fragment = document.createDocumentFragment()
      let lastEnd = 0
      matches.forEach((m) => {
        if (m.index > lastEnd) {
          fragment.appendChild(document.createTextNode(text.slice(lastEnd, m.index)))
        }
        const mark = document.createElement('mark')
        mark.className = 'search-highlight'
        mark.textContent = m[0]
        fragment.appendChild(mark)
        lastEnd = m.index + m[0].length
      })
      if (lastEnd < text.length) {
        fragment.appendChild(document.createTextNode(text.slice(lastEnd)))
      }
      textNode.replaceWith(fragment)
    })
  }

  function applyFilter(rawKeyword, countSetter) {
    const keyword = rawKeyword.trim()
    let visibleCount = 0

    cards.forEach((card) => {
      card.innerHTML = originalHtml.get(card)

      if (!keyword) {
        card.hidden = false
        visibleCount++
        return
      }

      const titleEl = card.querySelector('.article-title')
      const summaryEl = card.querySelector('.article-summary')
      const haystack = (
        (titleEl ? titleEl.textContent : '') +
        '\n' +
        (summaryEl ? summaryEl.textContent : '')
      ).toLowerCase()

      if (haystack.includes(keyword.toLowerCase())) {
        if (titleEl) highlightTextNodes(titleEl, keyword)
        if (summaryEl) highlightTextNodes(summaryEl, keyword)
        card.hidden = false
        visibleCount++
      } else {
        card.hidden = true
      }
    })

    countSetter(keyword, visibleCount)
  }

  function getShareUrl() {
    return urlWithKeyword(currentKeyword).href
  }

  async function copyToClipboard(url, button) {
    const originalHtml = button.innerHTML

    function showFeedback(message) {
      button.textContent = message
      window.setTimeout(() => {
        button.innerHTML = originalHtml
      }, 1400)
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(url)
        showFeedback('已複製')
        return
      } catch {
        // fall through to manual hint
      }
    }

    showFeedback('請複製網址')
  }

  function setupShareButtons() {
    document.querySelectorAll('[data-list-share-button]').forEach((button) => {
      button.addEventListener('click', async () => {
        const url = getShareUrl()
        const shareData = {
          title: document.title,
          text: document.title,
          url,
        }

        if (typeof navigator.share === 'function') {
          try {
            await navigator.share(shareData)
            return
          } catch (err) {
            if (err && err.name === 'AbortError') return
          }
        }

        await copyToClipboard(url, button)
      })
    })
  }

  import(VUE_CDN).then(({ createApp, ref, watch }) => {
    createApp({
      setup() {
        const keyword = ref(initialKeyword)
        const visibleCount = ref(cards.length)

        const setCount = (kw, count) => {
          visibleCount.value = count
        }

        watch(keyword, (kw) => {
          currentKeyword = kw
          syncUrlKeyword(kw)
          syncStateLinks(kw)
          applyFilter(kw, setCount)
        }, { immediate: true })

        return { keyword, visibleCount }
      },
      template: `
        <div class="list-search">
          <input
            type="search"
            v-model="keyword"
            class="list-search-input"
            placeholder="搜尋標題或摘要關鍵字"
            aria-label="搜尋標題或摘要關鍵字"
          />
          <span class="list-search-count" aria-live="polite">
            <template v-if="keyword.trim()">
              符合：{{ visibleCount }} 篇
            </template>
          </span>
        </div>
      `,
    }).mount(island)
  })

  setupShareButtons()
  syncStateLinks(initialKeyword)
}
