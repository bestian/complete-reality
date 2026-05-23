const SUCCESS_MESSAGE = 'RSS訂閱網址已複製到剪貼簿'
const FALLBACK_MESSAGE = '請手動複製：'

async function copyToClipboard(url) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(url)
      return true
    } catch {
      // fall through
    }
  }

  try {
    const textarea = document.createElement('textarea')
    textarea.value = url
    textarea.setAttribute('readonly', '')
    textarea.style.position = 'fixed'
    textarea.style.top = '-1000px'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.select()
    const ok = document.execCommand('copy')
    document.body.removeChild(textarea)
    return ok
  } catch {
    return false
  }
}

function setupRssCopyButtons() {
  document.querySelectorAll('[data-rss-copy-button]').forEach((button) => {
    button.addEventListener('click', async (event) => {
      event.preventDefault()
      const url = button.dataset.rssUrl
      if (!url) return
      const ok = await copyToClipboard(url)
      if (ok) {
        window.alert(SUCCESS_MESSAGE)
      } else {
        window.alert(FALLBACK_MESSAGE + url)
      }
    })
  })
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupRssCopyButtons)
} else {
  setupRssCopyButtons()
}
