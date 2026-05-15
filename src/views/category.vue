<script setup lang="ts">
import { computed } from 'vue'
import { categories, type ArticleInfo } from '../data/articles'

const props = defineProps<{
  category: string
  articles: ArticleInfo[]
  initialKeyword?: string
}>()

const sortedArticles = computed(() =>
  [...props.articles].sort((a, b) => {
    if (a.attention_needed && !b.attention_needed) return -1
    if (!a.attention_needed && b.attention_needed) return 1
    return b.date.replace(/\./g, '').localeCompare(a.date.replace(/\./g, ''))
  })
)

function withKeyword(path: string): string {
  const keyword = (props.initialKeyword ?? '').trim()
  if (!keyword) return path

  const params = new URLSearchParams({ keyword })
  return `${path}?${params.toString()}`
}
</script>

<template>
  <div class="page">
    <header class="site-header">
      <div class="site-header-inner">
        <h1 class="ui header site-title">流水全真</h1>
        <p class="tagline">以佛煉心・以儒應世・以道護體</p>
      </div>
      <div class="site-header-wave" aria-hidden="true"></div>
    </header>

    <main class="main">
      <section class="article-section">
        <div class="ui horizontal divider section-divider category-divider">
          分類：
          <template v-for="(item, idx) in categories" :key="item">
            <a :href="withKeyword(`/category/${encodeURIComponent(item)}`)" class="category-link" data-list-state-link>{{ item }}</a>
            <span v-if="idx < categories.length - 1" class="category-sep">／</span>
          </template>
        </div>

        <div class="ui horizontal divider section-divider">目前分類：{{ category }}</div>

        <!-- 關鍵字搜尋（Vue island，無 JS 時不顯示） -->
        <div id="list-search-island" class="list-search-island" :data-initial-keyword="props.initialKeyword ?? ''"></div>

        <div class="ui relaxed items article-list">
          <div class="quick-links">
            <div class="font-size-toggle" role="group" aria-label="字級切換">
              <button
                type="button"
                class="font-size-button font-size-button-small"
                data-font-size-set="small"
                aria-label="切換為小字級"
              >小字</button>
              <button
                type="button"
                class="font-size-button font-size-button-large"
                data-font-size-set="large"
                aria-label="切換為大字級"
              >大字</button>
            </div>
            <a :href="withKeyword('/')" class="quick-link-favorites" data-list-state-link>回首頁</a>
            <button type="button" class="quick-share-button" data-list-share-button aria-label="分享目前搜尋結果">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                <path fill="currentColor" d="M12 2 7 7l1.4 1.4L11 5.8V16h2V5.8l2.6 2.6L17 7zM5 12v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-8h-2v8H7v-8z"></path>
              </svg>
              分享
            </button>
            <a href="/favorites" class="quick-link-favorites">我的最愛</a>
          </div>

          <div
            v-for="article in sortedArticles"
            :key="article.slug"
            class="item article-card"
          >
            <div class="content">
              <template v-if="article.type === 'video'">
                <a :href="article.link" target="_blank" rel="noopener noreferrer" class="header article-title">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" style="vertical-align: middle; margin-right: 5px; flex-shrink: 0;"><path fill="#FF0000" d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  {{ article.title }}
                </a>
              </template>
              <template v-else>
                <a :href="`/article/${article.slug}`" class="header article-title">
                  {{ article.title }}
                  <span
                    v-if="article.attention_needed === true"
                    class="attention-arrow"
                    aria-label="由此進"
                  >
                    ← 請先閱讀
                  </span>
                </a>
              </template>
              <div class="meta article-meta">
                <span class="ui label article-date">{{ article.date }}</span>
              </div>
              <div class="description article-summary">{{ article.summary }}</div>
            </div>
          </div>

          <p v-if="sortedArticles.length === 0" class="description article-summary">此分類目前沒有文章。</p>
        </div>
      </section>
    </main>

    <footer class="site-footer">
      <div class="ui divider footer-divider"></div>
      <p>原作者網站：<a href="https://life3.pages.dev/#/" target="_blank" rel="noopener noreferrer">life3.pages.dev</a></p>
    </footer>
  </div>
</template>
