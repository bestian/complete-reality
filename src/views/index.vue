<script setup lang="ts">
import { articles, categories } from '../data/articles'

const sortedArticles = [...articles].sort((a, b) => {
  if (a.attention_needed && !b.attention_needed) return -1
  if (!a.attention_needed && b.attention_needed) return 1
  return b.date.replace(/\./g, '').localeCompare(a.date.replace(/\./g, ''))
})
</script>

<template>
  <div class="page">

    <!-- 頁首：淺粉藍／粉紫漸層、水紋、光點與下緣波浪動畫（樣式見 site.css） -->
    <header class="site-header">
      <div class="site-header-inner">
        <div class="img-wrapper" style="width: 300px; height: 253px; overflow: hidden; margin: 0 auto;">
          <img src="/images/main-img.jpeg" alt="流水全真" class="logo" width="300" height="300" style="border-radius: 50%;" />
        </div>
        <!-- <p class="tagline">以佛煉心・以儒應世・以道護體</p> -->
      </div>
      <div class="site-header-wave" aria-hidden="true"></div>
    </header>

    <main class="main">

      <section class="article-section">

        <!-- 節標題改為分類連結 -->
        <div class="ui horizontal divider section-divider category-divider">
          <span>分類：</span>
          <template v-for="(category, idx) in categories" :key="category">
            <a :href="`/category/${encodeURIComponent(category)}`" class="category-link">{{ category }}</a>
            <span v-if="idx < categories.length - 1" class="category-sep">／</span>
          </template>
        </div>

        <!-- 關鍵字搜尋（Vue island，無 JS 時不顯示） -->
        <div id="list-search-island" class="list-search-island"></div>

        <!-- 文章列表用 Semantic UI items -->
        <div class="ui relaxed items article-list">

          <!-- 快速連結 -->
          <div class="quick-links">
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
                <!-- 日期用 Semantic UI label（淺紫） -->
                <span class="ui label article-date">{{ article.date }}</span>
              </div>
              <div class="description article-summary">{{ article.summary }}</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 我的最愛 -->
      <section class="favorites-section">
        <!-- 快速連結 -->
        <div class="quick-links">
          <a href="/favorites" class="quick-link-favorites">我的最愛</a>
        </div>
      </section>
    </main>

    <footer class="site-footer">
      <div class="ui divider footer-divider"></div>
      <p>作者：李雅卿（道號：流水）
        <br/>
        個人網站：<a href="https://life3.pages.dev/#/" target="_blank" rel="noopener noreferrer">life3.pages.dev</a>
      </p>
    </footer>

  </div>
</template>
