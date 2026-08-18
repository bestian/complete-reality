# AGENTS.md

This file provides guidance to coding agents working in this repository.

## Project

**流水全真 (Liushui · Complete Reality)** — a zh-Hant personal site for the writings of 李雅卿 (道號：流水). Cloudflare Workers + Hono + Vue 3 SSR, with prerendering as the primary delivery path.

## Working agreement

### Completion boundary

- By default, finish a task after making the requested changes and validating them.
- Do not commit, push, open or merge a pull request, close an issue, or deploy unless the developer explicitly asks for that action.
- Treat all GitHub writes—including comments, labels, assignment, issue state changes, pushes, and pull requests—as requiring prior developer approval.

### Commits

- Only create a commit when explicitly requested.
- Write commit messages in Traditional Chinese (正體中文).
- For issue work, the commit message must include `close #<issue-number>` using the actual issue number. If no issue number is known, ask before committing rather than inventing one.

### Generated files

- Always regenerate and retain the affected prerendered files under `www/`; they are part of the intended change, not disposable build output.
- When a commit is explicitly requested, include the affected `www/` prerendered files in the same commit as their source changes.

### Validation and reporting

- Run validation appropriate to the change, normally `npm run build` when prerendered output or application code is affected.
- A successful command may still emit known warnings. Report every build warning clearly to the developer in the final response; do not silently omit it.

### Scope discipline

- Keep changes narrowly scoped to the requested task.
- Do not change an existing design or product decision without explicit permission.
- Avoid broad refactors and mass formatting. Do not rewrite unrelated files merely for stylistic consistency.

## Commands

```bash
npm install            # bootstrap
npm run dev            # vite dev (also runs copy-css)
npm run prerender      # build-only: render Vue routes to www/*.html
npm run build          # copy-css → prerender → vite build
npm run preview        # build + vite preview
npm run deploy         # build + wrangler deploy
npm run copy-css       # copy semantic-ui-css + compile www/scss → www/css
```

There is no test suite, no linter, and no typecheck script wired up. `tsc` is not in deps; type errors only surface at build time via Vite/`tsx`.

## Architecture

### Two render paths, one template

The same HTML shell (`buildPage(headTags, bodyHtml)`) is duplicated in two places:

- `src/index.ts` — Hono Worker SSR (runtime fallback)
- `scripts/prerender.ts` — Node-side prerender (build time)

**Any change to the page shell, head injection, or trailing scripts must be applied to both.** They are not shared via import because the prerender script runs in Node via `tsx` and the Worker runs on Cloudflare's edge.

### Render priority

`wrangler.jsonc` binds `./www/` as `ASSETS`. The Hono `app.get('*')` fallback delegates to `c.env.ASSETS.fetch`, and Cloudflare serves static assets *before* invoking the Worker. So:

1. `npm run prerender` writes `www/index.html`, `www/favorites/index.html`, `www/category/<cat>/index.html`, `www/article/<slug>/index.html`, plus `www/rss.xml` (built by `src/ssr/rss.ts`) and `www/sitemap.xml` (built by `src/ssr/sitemap.ts`; both also have Worker fallback routes in `src/index.ts`).
2. In production those static files are served directly — the Worker SSR routes in `src/index.ts` only run for paths that have no prerendered file (e.g. a new article whose markdown exists but wasn't included in the last prerender).

This means **prerender must be re-run whenever you add/remove an article or change a Vue view**, or stale HTML will be served.

### Article pipeline

Adding an article requires two coordinated changes:

1. Drop the markdown file in one of:
   - `www/articles_real/<slug>.md` (canonical content)
   - `www/articles_for_prototype/<slug>.md` (placeholder/draft content)
2. Append an entry to `articles` in `src/data/articles.ts`. The `slug` must match the markdown filename. `category` (if set) must be one of the strings in the exported `categories` array, or it won't surface on any category page.

Both prerender (`resolveArticleMarkdownPath`) and runtime SSR (the `bundledArticles` glob + the `ASSETS.fetch` loop in `src/index.ts`) check `articles_real` first, then `articles_for_prototype`. The runtime loader uses `import.meta.glob('../www/articles_{real,for_prototype}/*.md', { query: '?raw' })` so new article files are picked up automatically at build time but require a rebuild to appear in the bundled fallback.

`type: 'video'` entries render as external YouTube links on listing pages — their `link` is opened directly and no `/article/<slug>` route is generated for them.

`attention_needed: true` floats the article to the top of the home listing and renders a "← 請先閱讀" arrow.

### HEAD / SEO

All `<title>`, meta, OG tags, and per-route stylesheet links come from `src/ssr/heads.ts`. The `getStylesheetsForPath` switch picks which page-specific CSS to include — when adding a new top-level route, add a branch there. Article OG images use `https://moedict.tw/<encoded-title>.png`; other pages use the site's square `images/main-img.jpeg`. RSS always exposes the stable canonical-site image through channel and Media RSS metadata so feed readers do not fall back to the article OG image.

### Styles

SCSS source lives in `www/scss/` (entry `site.scss` + `rwd.scss`, with per-page partials under `www/scss/pages/`). `npm run copy-css` compiles these into `www/css/` and copies the prebuilt `semantic-ui-css/semantic.min.css`. The compiled `www/css/*.css` files are checked in and served as static assets — **do not edit them by hand; edit the SCSS and re-run `copy-css`**.

### Client-side JS

`www/js/article-gestures.js` (mobile swipe → back/favorite) and `www/js/favorites-page.js` (renders the favorites list from `localStorage` key `complete-reality:favorites`) are loaded via `<script type="module">` from the page shell. They are plain JS, not bundled.

### `public/` vs `www/`

`public/` holds the original favicon/manifest set; `prerender.ts` does a one-way `cpSync(PUBLIC, WWW, { recursive, force })` at the start of every prerender, so `www/` is the source of truth at deploy time. Edit assets in `public/` if you want them to survive a clean prerender; everything else in `www/` (compiled CSS, prerendered HTML, article markdown) is either generated or content.
