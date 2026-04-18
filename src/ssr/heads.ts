export interface HeadConfig {
  title: string
  description?: string
  keywords?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
}

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
  '/favorites': {
    title: '我的最愛 | 流水全真',
    description: '查看你在本機瀏覽器收藏的文章清單。',
    keywords: '我的最愛,收藏,文章',
  },
  '/article/芙蓉說': {
    title: '芙蓉說 | 流水全真',
    description: '芙蓉風華，一日三幻化：晨迎朝露，白淨無瑕，隨陽氣上昇，次第轉紅，絳極離枝，不復流連，委地成泥，再護芳華。',
    keywords: '芙蓉,花,人生,天道',
  },
  '/article/走路': {
    title: '走路 | 流水全真',
    description: '走路的意義與體悟。',
    keywords: '走路,身體,修行',
  },
}

/**
 * 取得指定路由的 HEAD 設定，若無則回傳預設值
 */
export function getHead(path: string): HeadConfig {
  return routeHeads[path] ?? { title: '流水全真' }
}

/**
 * 將 HeadConfig 轉換為 HTML 字串，用於注入 <head> 區塊
 */
export function renderHeadTags(config: HeadConfig): string {
  const parts: string[] = [
    `<meta charset="UTF-8" />`,
    `<meta name="viewport" content="width=device-width, initial-scale=1" />`,
    `<title>${escapeHtml(config.title)}</title>`,
    `<meta property="og:title" content="${escapeHtml(config.ogTitle ?? config.title)}" />`,
    `<link rel="stylesheet" href="/css/semantic.min.css" />`,
    `<link rel="stylesheet" href="/css/site.css" />`,
    `<link rel="stylesheet" href="/css/rwd.css" />`,
  ]

  if (config.description) {
    parts.push(`<meta name="description" content="${escapeHtml(config.description)}" />`)
    parts.push(`<meta property="og:description" content="${escapeHtml(config.ogDescription ?? config.description)}" />`)
  }

  if (config.keywords) {
    parts.push(`<meta name="keywords" content="${escapeHtml(config.keywords)}" />`)
  }

  if (config.ogImage) {
    parts.push(`<meta property="og:image" content="${escapeHtml(config.ogImage)}" />`)
  }

  return parts.join('\n    ')
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}
