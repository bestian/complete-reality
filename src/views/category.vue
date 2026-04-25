<script setup lang="ts">
import { categories, type ArticleInfo } from '../data/articles'

defineProps<{
  category: string
  articles: ArticleInfo[]
}>()
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
            <a :href="`/category/${encodeURIComponent(item)}`" class="category-link">{{ item }}</a>
            <span v-if="idx < categories.length - 1" class="category-sep">／</span>
          </template>
        </div>

        <div class="ui horizontal divider section-divider">目前分類：{{ category }}</div>

        <!-- 關鍵字搜尋（Vue island，無 JS 時不顯示） -->
        <div id="list-search-island" class="list-search-island"></div>

        <div class="ui relaxed items article-list">
          <div class="quick-links">
            <a href="/" class="quick-link-favorites">回首頁</a>
            <a href="/favorites" class="quick-link-favorites">我的最愛</a>
          </div>

          <div
            v-for="article in articles"
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

          <p v-if="articles.length === 0" class="description article-summary">此分類目前沒有文章。</p>
        </div>
      </section>
    </main>

    <footer class="site-footer">
      <div class="ui divider footer-divider"></div>
      <p>原作者網站：<a href="https://life3.pages.dev/#/" target="_blank" rel="noopener noreferrer">life3.pages.dev</a></p>
    </footer>
  </div>
</template>
