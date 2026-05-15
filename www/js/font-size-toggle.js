const FONT_SIZE_KEY = 'complete-reality:article-font-size'

function readFontSize() {
  try {
    return window.localStorage.getItem(FONT_SIZE_KEY) === 'large' ? 'large' : 'small'
  } catch {
    return 'small'
  }
}

function writeFontSize(value) {
  try {
    window.localStorage.setItem(FONT_SIZE_KEY, value)
  } catch {
    // ignore quota / privacy mode failures
  }
}

function applyFontSize(page, value) {
  page.dataset.fontSize = value
  page.querySelectorAll('[data-font-size-set]').forEach((button) => {
    button.classList.toggle('is-active', button.dataset.fontSizeSet === value)
  })
}

function setupFontSizeToggle(page) {
  const buttons = page.querySelectorAll('[data-font-size-set]')
  if (buttons.length === 0) return

  applyFontSize(page, readFontSize())

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const value = button.dataset.fontSizeSet === 'large' ? 'large' : 'small'
      writeFontSize(value)
      applyFontSize(page, value)
    })
  })
}

document.querySelectorAll('.page').forEach(setupFontSizeToggle)
