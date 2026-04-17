import { Hono } from 'hono'
import { marked } from 'marked'
import { createSSRApp } from 'vue'
import { renderToString } from '@vue/server-renderer'
import IndexView from './views/index.vue'
import ArticleView from './views/article.vue'
import { getHead, renderHeadTags } from './ssr/heads'

type Bindings = {
  ASSETS: {
    fetch: (request: RequestInfo | URL, init?: RequestInit) => Promise<Response>
  }
}

const app = new Hono<{ Bindings: Bindings }>()

function buildPage(headTags: string, bodyHtml: string): string {
  return `<!doctype html>
<html lang="zh-Hant">
  <head>
    ${headTags}
  </head>
  <body>
    ${bodyHtml}
  </body>
</html>`
}

app.get('/', async (c) => {
  const vueApp = createSSRApp(IndexView)
  const bodyHtml = await renderToString(vueApp)
  const headTags = renderHeadTags(getHead('/'))
  return c.html(buildPage(headTags, bodyHtml))
})

app.get('/article/:slug', async (c) => {
  const slug = decodeURIComponent(c.req.param('slug'))
  const markdownPath = `/articles_for_prototype/${slug}.md`
  const requestUrl = new URL(markdownPath, c.req.url)

  const response = await c.env.ASSETS.fetch(requestUrl)
  if (!response.ok) {
    return c.text('找不到文章', 404)
  }

  const markdown = await response.text()
  const contentHtml = await marked.parse(markdown) as string

  const vueApp = createSSRApp(ArticleView, { contentHtml, slug })
  const bodyHtml = await renderToString(vueApp)
  const headTags = renderHeadTags(getHead(`/article/${slug}`))
  return c.html(buildPage(headTags, bodyHtml))
})

export default app
