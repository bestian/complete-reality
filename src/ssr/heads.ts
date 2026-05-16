import { getArticleBySlug } from '../data/articles'

export interface HeadConfig {
  title: string
  description?: string
  keywords?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
}

const MAIN_OG_IMAGE = 'https://complete-reality.bestian123.workers.dev/images/main-img.jpeg'
const DEFAULT_OG_TITLE = '流水全真──以佛煉心、以儒應世、以道護體'
const DEFAULT_OG_DESCRIPTION = '流水全真，探索修身養性之道，融合佛、儒、道三家智慧。'
const DEFAULT_THEME_COLOR = '#ffffff'

/**
 * 所有路由的 HEAD 設定
 * key 為路由路徑，value 為 HEAD 設定
 */
export const routeHeads: Record<string, HeadConfig> = {
  '/': {
    title: '流水全真──以佛煉心、以儒應世、以道護體',
    description: '流水全真，探索修身養性之道，融合佛、儒、道三家智慧。',
    keywords: '流水全真,佛,儒,道,修身,養性',
  },
}

/**
 * 取得指定路由的 HEAD 設定，若無則回傳預設值
 */
export function getHead(path: string): HeadConfig {
  if (path === '/favorites') {
    return {
      title: '我的最愛 | 流水全真',
      description: '查看你在本機瀏覽器收藏的文章清單。',
      keywords: '我的最愛,收藏,文章',
    }
  }

  if (path.startsWith('/category/')) {
    const category = decodePathSegment(path.slice('/category/'.length))
    if (category) {
      return {
        title: `${category} | 流水全真`,
        description: `瀏覽「${category}」分類下的文章與內容整理。`,
        keywords: `${category},分類,流水全真`,
      }
    }
  }

  if (path.startsWith('/article/')) {
    const slug = decodePathSegment(path.slice('/article/'.length))
    if (slug) {
      const article = getArticleBySlug(slug)
      if (article) {
        return {
          title: `${article.title} | 流水全真`,
          description: article.summary,
          keywords: [article.title, article.category, '流水全真', '文章']
            .filter(Boolean)
            .join(','),
        }
      }
      return {
        title: `${slug} | 流水全真`,
        description: DEFAULT_OG_DESCRIPTION,
        keywords: `${slug},流水全真,文章`,
      }
    }
  }

  return routeHeads[path] ?? { title: '流水全真' }
}

/**
 * 將 HeadConfig 轉換為 HTML 字串，用於注入 <head> 區塊
 */
export function renderHeadTags(config: HeadConfig, path: string): string {
  const stylesheets = getStylesheetsForPath(path)
  const ogTitle = config.ogTitle ?? config.title ?? DEFAULT_OG_TITLE
  const ogDescription = config.ogDescription ?? config.description ?? DEFAULT_OG_DESCRIPTION
  const parts: string[] = [
    `<meta charset="UTF-8" />`,
    `<meta name="viewport" content="width=device-width, user-scalable=yes", initial-scale=1, maximum-scale=5 />`,
    `<title>${escapeHtml(config.title)}</title>`,
    `<link rel="manifest" href="/site.webmanifest" />`,
    `<meta name="theme-color" content="${DEFAULT_THEME_COLOR}" />`,
    `<link rel="apple-touch-icon" href="/apple-touch-icon.png" />`,
    `<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />`,
    `<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />`,
    `<link rel="shortcut icon" href="/favicon.ico" />`,
    `<meta property="og:title" content="${escapeHtml(ogTitle)}" />`,
    `<meta property="og:description" content="${escapeHtml(ogDescription)}" />`,
    ...stylesheets.map((href) => `<link rel="stylesheet" href="${href}" />`),
  ]

  if (config.description) {
    parts.push(`<meta name="description" content="${escapeHtml(config.description)}" />`)
  }

  if (config.keywords) {
    parts.push(`<meta name="keywords" content="${escapeHtml(config.keywords)}" />`)
  }

  const ogImage = config.ogImage ?? getDefaultOgImageForPath(path) ?? getMoedictOgImageFromArticlePath(path)
  if (ogImage) {
    parts.push(`<meta property="og:image" content="${escapeHtml(ogImage)}" />`)
  }

  return parts.join('\n    ')
}

function getDefaultOgImageForPath(path: string): string | undefined {
  if (path === '/' || path === '/favorites' || path.startsWith('/category/')) {
    return MAIN_OG_IMAGE
  }
  return undefined
}

/** 文章路徑 `/article/{標題}` 對應萌典字圖： https://moedict.tw/{標題}.png */
function getMoedictOgImageFromArticlePath(path: string): string | undefined {
  if (!path.startsWith('/article/')) return undefined
  const raw = path.slice('/article/'.length)
  if (!raw || raw.includes('/')) return undefined
  let title: string
  try {
    title = decodeURIComponent(raw)
  } catch {
    title = raw
  }
  if (!title) return undefined
  return `https://moedict.tw/${title}.png`
}

function decodePathSegment(segment: string): string | undefined {
  if (!segment || segment.includes('/')) return undefined
  try {
    return decodeURIComponent(segment)
  } catch {
    return segment
  }
}

function getStylesheetsForPath(path: string): string[] {
  const common = [
    '/css/semantic.min.css',
    '/css/site.css',
  ]

  if (path === '/') {
    return [...common, '/css/pages/home.css', '/css/rwd.css']
  }

  if (path.startsWith('/category/')) {
    return [...common, '/css/pages/category.css', '/css/rwd.css']
  }

  if (path.startsWith('/article/')) {
    return [...common, '/css/pages/article.css', '/css/rwd.css']
  }

  if (path === '/favorites') {
    return [...common, '/css/pages/favorites.css', '/css/rwd.css']
  }

  return [...common, '/css/rwd.css']
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}
