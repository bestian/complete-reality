import { Hono } from 'hono'
import { marked } from 'marked'
import { createSSRApp } from 'vue'
import { renderToString } from '@vue/server-renderer'
import IndexView from './views/index.vue'
import CategoryView from './views/category.vue'
import ArticleView from './views/article.vue'
import FavoritesView from './views/favorites.vue'
import { getArticleBySlug, getArticlesByCategory } from './data/articles'
import { getHead, renderHeadTags } from './ssr/heads'

type Bindings = {
  ASSETS?: {
    fetch: (request: RequestInfo | URL, init?: RequestInit) => Promise<Response>
  }
}

/** 建置時打包；避免 preview／本機執行時缺少 ASSETS 綁定而拋錯。 */
const bundledArticles = import.meta.glob<string>('../www/articles_{real,for_prototype}/*.md', {
  query: '?raw',
  import: 'default',
})

const app = new Hono<{ Bindings: Bindings }>()

function buildPage(headTags: string, bodyHtml: string): string {
  return `<!doctype html>
<html lang="zh-Hant">
  <head>
    ${headTags}
  </head>
  <body>
    ${bodyHtml}
    <script type="module" src="/js/article-gestures.js"></script>
    <script type="module" src="/js/favorites-page.js"></script>
    <script type="module" src="/js/list-search.js"></script>
    <script type="module" src="/js/font-size-toggle.js"></script>
  </body>
</html>`
}

function getInitialKeyword(url: string): string {
  return new URL(url).searchParams.get('keyword') ?? ''
}

app.get('/', async (c) => {
  const initialKeyword = getInitialKeyword(c.req.url)
  const vueApp = createSSRApp(IndexView, { initialKeyword })
  const bodyHtml = await renderToString(vueApp)
  const headTags = renderHeadTags(getHead('/'), '/')
  return c.html(buildPage(headTags, bodyHtml))
})

app.get('/category/:category', async (c) => {
  const category = decodeURIComponent(c.req.param('category'))
  const initialKeyword = getInitialKeyword(c.req.url)
  const articles = getArticlesByCategory(category)
  const vueApp = createSSRApp(CategoryView, { category, articles, initialKeyword })
  const bodyHtml = await renderToString(vueApp)
  const categoryPath = `/category/${category}`
  const headTags = renderHeadTags(getHead(categoryPath), categoryPath)
  return c.html(buildPage(headTags, bodyHtml))
})

app.get('/article/:slug', async (c) => {
  const slug = decodeURIComponent(c.req.param('slug'))
  const path = `/article/${slug}`
  const head = getHead(path)
  const article = getArticleBySlug(slug)
  const markdownPathCandidates = [
    `/articles_real/${slug}.md`,
    `/articles_for_prototype/${slug}.md`,
  ]
  const bundledKeyCandidates = [
    `../www/articles_real/${slug}.md`,
    `../www/articles_for_prototype/${slug}.md`,
  ]

  let markdown: string | undefined

  if (c.env.ASSETS) {
    for (const markdownPath of markdownPathCandidates) {
      const requestUrl = new URL(markdownPath, c.req.url)
      const response = await c.env.ASSETS.fetch(requestUrl)
      if (response.ok) {
        markdown = await response.text()
        break
      }
    }
  }

  if (markdown === undefined) {
    for (const bundledKey of bundledKeyCandidates) {
      const load = bundledArticles[bundledKey]
      if (load) {
        markdown = await load()
        break
      }
    }
  }

  if (markdown === undefined) {
    return c.text('找不到文章', 404)
  }
  const contentHtml = await marked.parse(markdown) as string

  const vueApp = createSSRApp(ArticleView, {
    contentHtml,
    slug,
    title: article?.title ?? slug,
    description: article?.summary ?? head.description ?? '',
    path,
    author: article?.author ?? '',
    category: article?.category,
  })
  const bodyHtml = await renderToString(vueApp)
  const headTags = renderHeadTags(head, path)
  return c.html(buildPage(headTags, bodyHtml))
})

app.get('/favorites', async (c) => {
  const vueApp = createSSRApp(FavoritesView)
  const bodyHtml = await renderToString(vueApp)
  const headTags = renderHeadTags(getHead('/favorites'), '/favorites')
  return c.html(buildPage(headTags, bodyHtml))
})

// 靜態資源 fallback：/css/*.css、圖片等未匹配路由交給 ASSETS 處理
app.get('*', async (c) => {
  if (!c.env.ASSETS) return c.notFound()
  return c.env.ASSETS.fetch(c.req.raw)
})

export default app
