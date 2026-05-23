import type { ArticleInfo } from '../data/articles'

const SITE_URL = 'https://real.bestian.tw'
const SITE_TITLE = '流水全真──以佛煉心、以儒應世、以道護體'
const SITE_DESCRIPTION = '流水全真，探索修身養性之道，融合佛、儒、道三家智慧。'

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function articleDateToRfc822(date: string): string {
  const [y, m, d] = date.split('.').map((n) => Number(n))
  const dt = new Date(Date.UTC(y || 1970, (m || 1) - 1, d || 1, 0, 0, 0))
  return dt.toUTCString()
}

function articleLink(article: ArticleInfo): string {
  if (article.type === 'video' && article.link) {
    return article.link
  }
  return `${SITE_URL}/article/${encodeURIComponent(article.slug)}`
}

function articleGuid(article: ArticleInfo): { value: string; isPermaLink: boolean } {
  if (article.type === 'video') {
    return {
      value: `${SITE_URL}/video/${encodeURIComponent(article.slug)}#${article.date}`,
      isPermaLink: false,
    }
  }
  return {
    value: `${SITE_URL}/article/${encodeURIComponent(article.slug)}`,
    isPermaLink: true,
  }
}

export function buildRssXml(articles: ArticleInfo[]): string {
  const sorted = [...articles].sort((a, b) =>
    b.date.replace(/\./g, '').localeCompare(a.date.replace(/\./g, ''))
  )

  const items = sorted
    .map((article) => {
      const link = articleLink(article)
      const guid = articleGuid(article)
      const lines: string[] = [
        `      <title>${escapeXml(article.title)}</title>`,
        `      <link>${escapeXml(link)}</link>`,
        `      <guid isPermaLink="${guid.isPermaLink ? 'true' : 'false'}">${escapeXml(guid.value)}</guid>`,
        `      <pubDate>${articleDateToRfc822(article.date)}</pubDate>`,
      ]
      if (article.author) {
        lines.push(`      <dc:creator>${escapeXml(article.author)}</dc:creator>`)
      }
      if (article.category) {
        lines.push(`      <category>${escapeXml(article.category)}</category>`)
      }
      lines.push(`      <description>${escapeXml(article.summary)}</description>`)
      return `    <item>\n${lines.join('\n')}\n    </item>`
    })
    .join('\n')

  const latestPubDate = sorted.length > 0 ? articleDateToRfc822(sorted[0].date) : new Date().toUTCString()

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <link>${SITE_URL}/</link>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>zh-Hant</language>
    <lastBuildDate>${latestPubDate}</lastBuildDate>
${items}
  </channel>
</rss>
`
}
