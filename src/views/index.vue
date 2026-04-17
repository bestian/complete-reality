<script setup lang="ts">
const articles = [
  {
    slug: '芙蓉說',
    title: '芙蓉說',
    date: '2012.10.01',
    summary: '芙蓉風華，一日三幻化——晨迎朝露，絳極離枝，功成身退，乃合天道。',
  },
  {
    slug: '走路',
    title: '走路',
    date: '2012.05.06',
    summary: '在山上，要走路。走山路，是不說話的。',
  },
]
</script>

<template>
  <div class="page">

    <!-- 頁首：淡藍/淺紫漸層底色 -->
    <header class="site-header">
      <h1 class="ui header site-title">流水全真</h1>
      <p class="tagline">以佛煉心・以儒應世・以道護體</p>
    </header>

    <main class="main">
      <section class="article-section">

        <!-- 節標題用 Semantic UI horizontal divider -->
        <div class="ui horizontal divider section-divider">文章</div>

        <!-- 文章列表用 Semantic UI items -->
        <div class="ui relaxed items article-list">
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
    </main>

    <footer class="site-footer">
      <div class="ui divider footer-divider"></div>
      <p>原作者網站：<a href="https://life3.pages.dev/#/" target="_blank" rel="noopener noreferrer">life3.pages.dev</a></p>
    </footer>

  </div>
</template>
