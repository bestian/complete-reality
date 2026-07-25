import type { ArticleInfo } from '../data/articles'

const SITE_URL = 'https://real.bestian.tw'

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

/** `2026.04.21` → `2026-04-21`（sitemap 的 lastmod 採 W3C Datetime） */
function articleDateToIso(date: string): string {
  const [y, m, d] = date.split('.').map((n) => Number(n))
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${y || 1970}-${pad(m || 1)}-${pad(d || 1)}`
}

/** 日期字串可直接以 `2026.04.21` 字面比較大小（皆為零補位） */
function latestDate(list: ArticleInfo[]): string | undefined {
  if (list.length === 0) return undefined
  return list.reduce((latest, a) => (a.date > latest ? a.date : latest), list[0].date)
}

interface SitemapEntry {
  loc: string
  lastmod?: string
  changefreq: string
  priority: string
}

function renderUrl(entry: SitemapEntry): string {
  const lines = [`    <loc>${escapeXml(entry.loc)}</loc>`]
  if (entry.lastmod) {
    lines.push(`    <lastmod>${entry.lastmod}</lastmod>`)
  }
  lines.push(`    <changefreq>${entry.changefreq}</changefreq>`)
  lines.push(`    <priority>${entry.priority}</priority>`)
  return `  <url>\n${lines.join('\n')}\n  </url>`
}

/**
 * 產生 sitemap.xml。
 *
 * 只收錄本站有預渲染頁面的路徑：首頁、各分類頁、各文章頁。
 * `type: 'video'` 的項目連往 YouTube（跨網域），不屬於本站 sitemap；
 * `/favorites` 由 localStorage 於前端渲染，對搜尋引擎無內容，一併略過。
 */
export function buildSitemapXml(articleList: ArticleInfo[], categoryList: string[]): string {
  const pageArticles = articleList.filter((a) => a.type !== 'video')
  const entries: SitemapEntry[] = []

  entries.push({
    loc: `${SITE_URL}/`,
    lastmod: latestDate(articleList) && articleDateToIso(latestDate(articleList)!),
    changefreq: 'weekly',
    priority: '1.0',
  })

  for (const category of categoryList) {
    // 分類頁會列出該分類所有項目（含影片），故 lastmod 取全部項目
    const inCategory = articleList.filter((a) => a.category === category)
    const latest = latestDate(inCategory)
    entries.push({
      // 結尾斜線：Cloudflare ASSETS 會把 /category/x 以 307 導向 /category/x/，
      // sitemap 直接給最終網址，避免 Search Console 出現「含重新導向的網頁」
      loc: `${SITE_URL}/category/${encodeURIComponent(category)}/`,
      lastmod: latest && articleDateToIso(latest),
      changefreq: 'weekly',
      priority: '0.7',
    })
  }

  const sortedArticles = [...pageArticles].sort((a, b) => b.date.localeCompare(a.date))
  for (const article of sortedArticles) {
    entries.push({
      loc: `${SITE_URL}/article/${encodeURIComponent(article.slug)}/`,
      lastmod: articleDateToIso(article.date),
      changefreq: 'monthly',
      priority: '0.8',
    })
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map(renderUrl).join('\n')}
</urlset>
`
}
