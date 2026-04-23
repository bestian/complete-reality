<script setup lang="ts">
import { articles, categories } from '../data/articles'
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

        <!-- 文章列表用 Semantic UI items -->
        <div class="ui relaxed items article-list">

          <!-- 快速連結 -->
          <div class="quick-links">
            <a href="/favorites" class="quick-link-favorites">我的最愛</a>
          </div>
          
          <div
            v-for="article in articles"
            :key="article.slug"
            class="item article-card"
          >
            <div class="content">
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
      <p>原作者網站：<a href="https://life3.pages.dev/#/" target="_blank" rel="noopener noreferrer">life3.pages.dev</a></p>
    </footer>

  </div>
</template>
