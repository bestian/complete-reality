/**
 * Vue Prerender 腳本
 *
 * 將已知路由預先渲染成靜態 HTML，存入 www/ 目錄。
 * 若存在 public/，會先將其中靜態資產複製到 www/ 對應路徑（與 Vite publicDir 慣例一致）。
 * Cloudflare ASSETS 會優先提供靜態檔案，減少 Worker 計算量。
 *
 * 執行方式：npm run prerender
 */
import { createSSRApp } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { readFileSync, writeFileSync, mkdirSync, existsSync, cpSync, readdirSync, rmSync } from 'fs'
import { resolve, dirname } from 'path'
import { marked } from 'marked'
import { articles, categories, getArticlesByCategory } from '../src/data/articles'
import { getHead, renderHeadTags } from '../src/ssr/heads'
import { createServer } from 'vite'
import vue from '@vitejs/plugin-vue'

// 因為 prerender 在 Node.js 執行，需要 createRequire 解析 .vue 檔
// 此處直接用 tsx 執行，Vite 的 SSR build 會輸出可複用模組
// 若要在 CI 中執行，建議先 `vite build --ssr` 再執行此腳本

const ROOT = resolve(process.cwd())
const WWW = resolve(ROOT, 'www')
const PUBLIC = resolve(ROOT, 'public')
const ARTICLE_SOURCE_DIRS = [
  resolve(WWW, 'articles_real'),
  resolve(WWW, 'articles_for_prototype'),
]

/** 將 public/ 內容合併至 www/（路徑一對一對應）；若 public 不存在則略過。 */
function copyPublicAssetsToWww() {
  if (!existsSync(PUBLIC)) {
    console.log('（略過）未找到 public/，不複製靜態資產\n')
    return
  }
  console.log('📁 複製 public/ → www/ …')
  cpSync(PUBLIC, WWW, { recursive: true, force: true })
  console.log('   已完成靜態資產合併\n')
}

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
  </body>
</html>`
}

function ensureDir(filePath: string) {
  const dir = dirname(filePath)
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true })
  }
}

function writeHtml(outputPath: string, html: string) {
  ensureDir(outputPath)
  writeFileSync(outputPath, html, 'utf-8')
  console.log(`✓ 已生成：${outputPath.replace(ROOT, '')}`)
}

function cleanStaleCategoryPages() {
  const categoryRoot = resolve(WWW, 'category')

  if (!existsSync(categoryRoot)) {
    return
  }

  const currentCategories = new Set(categories)
  const staleCategories = readdirSync(categoryRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((category) => !currentCategories.has(category))

  if (staleCategories.length === 0) {
    console.log('🧹 分類頁面無需清理\n')
    return
  }

  console.log('🧹 清理已不存在的分類頁面 …')
  for (const category of staleCategories) {
    const stalePath = resolve(categoryRoot, category)
    rmSync(stalePath, { recursive: true, force: true })
    console.log(`   已移除：${stalePath.replace(ROOT, '')}`)
  }
  console.log('')
}

async function prerenderIndex(IndexView: object) {
  const vueApp = createSSRApp(IndexView)
  const bodyHtml = await renderToString(vueApp)
  const headTags = renderHeadTags(getHead('/'), '/')
  const html = buildPage(headTags, bodyHtml)
  writeHtml(resolve(WWW, 'index.html'), html)
}

async function prerenderFavorites(FavoritesView: object) {
  const vueApp = createSSRApp(FavoritesView)
  const bodyHtml = await renderToString(vueApp)
  const headTags = renderHeadTags(getHead('/favorites'), '/favorites')
  const html = buildPage(headTags, bodyHtml)
  writeHtml(resolve(WWW, 'favorites', 'index.html'), html)
}

async function prerenderCategory(CategoryView: object, category: string) {
  const categoryArticles = getArticlesByCategory(category)
  const vueApp = createSSRApp(CategoryView as Parameters<typeof createSSRApp>[0], {
    category,
    articles: categoryArticles,
  })
  const bodyHtml = await renderToString(vueApp)
  const categoryPath = `/category/${category}`
  const headTags = renderHeadTags(getHead(categoryPath), categoryPath)
  const html = buildPage(headTags, bodyHtml)
  writeHtml(resolve(WWW, 'category', category, 'index.html'), html)
}

function resolveArticleMarkdownPath(slug: string): string | undefined {
  for (const sourceDir of ARTICLE_SOURCE_DIRS) {
    const mdPath = resolve(sourceDir, `${slug}.md`)
    if (existsSync(mdPath)) {
      return mdPath
    }
  }
  return undefined
}

async function prerenderArticle(ArticleView: object, article: (typeof articles)[number]) {
  const mdPath = resolveArticleMarkdownPath(article.slug)
  if (!mdPath) {
    console.warn(`⚠ 找不到 markdown 檔（已嘗試 articles_real 與 articles_for_prototype）：${article.slug}.md`)
    return
  }

  const markdown = readFileSync(mdPath, 'utf-8')
  const contentHtml = await marked.parse(markdown) as string
  const path = `/article/${article.slug}`

  const vueApp = createSSRApp(ArticleView as Parameters<typeof createSSRApp>[0], {
    contentHtml,
    slug: article.slug,
    title: article.title,
    description: article.summary,
    author: article.author,
    attention_needed: article.attention_needed ?? false,
    path,
    category: article.category,
  })
  const bodyHtml = await renderToString(vueApp)
  const headTags = renderHeadTags(getHead(path), path)
  const html = buildPage(headTags, bodyHtml)

  // 輸出到 www/article/<slug>/index.html，讓 ASSETS 以目錄形式提供
  writeHtml(resolve(WWW, 'article', article.slug, 'index.html'), html)
}

async function main() {
  console.log('🚀 開始 Vue Prerender...\n')

  copyPublicAssetsToWww()

  // 透過 Vite 的 SSR module loader 載入 .vue，避免 Node ESM 直接解析副檔名失敗
  const vite = await createServer({
    configFile: false,
    appType: 'custom',
    logLevel: 'error',
    root: ROOT,
    server: { middlewareMode: true },
    plugins: [vue()],
  })

  try {
    const { default: IndexView } = await vite.ssrLoadModule('/src/views/index.vue')
    const { default: CategoryView } = await vite.ssrLoadModule('/src/views/category.vue')
    const { default: ArticleView } = await vite.ssrLoadModule('/src/views/article.vue')
    const { default: FavoritesView } = await vite.ssrLoadModule('/src/views/favorites.vue')

    await prerenderIndex(IndexView)
    await prerenderFavorites(FavoritesView)
    cleanStaleCategoryPages()
    for (const category of categories) {
      await prerenderCategory(CategoryView, category)
    }

    for (const article of articles) {
      await prerenderArticle(ArticleView, article)
    }
  } finally {
    await vite.close()
  }

  console.log('\n✅ Prerender 完成！')
  console.log('   靜態 HTML 已存入 www/ 目錄')
  console.log('   Cloudflare ASSETS 會優先提供這些靜態頁面。')
}

main().catch((err) => {
  console.error('Prerender 失敗：', err)
  process.exit(1)
})
