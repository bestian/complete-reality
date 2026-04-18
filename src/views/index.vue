<script setup lang="ts">
import { articles } from '../data/articles'
</script>

<template>
  <div class="page">

    <!-- 頁首：淺粉藍／粉紫漸層、水紋、光點與下緣波浪動畫（樣式見 site.css） -->
    <header class="site-header">
      <div class="site-header-inner">
        <h1 class="ui header site-title">流水全真</h1>
        <p class="tagline">以佛煉心・以儒應世・以道護體</p>
      </div>
      <div class="site-header-wave" aria-hidden="true"></div>
    </header>

    <main class="main">

      <section class="article-section">

        <!-- 節標題用 Semantic UI horizontal divider -->
        <div class="ui horizontal divider section-divider">文章</div>

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
