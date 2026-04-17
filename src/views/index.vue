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
    <header class="site-header">
      <h1>流水全真</h1>
      <p class="tagline">以佛煉心・以儒應世・以道護體</p>
    </header>

    <main class="main">
      <section class="article-section">
        <h2 class="section-title">文章</h2>
        <ul class="article-list">
          <li v-for="article in articles" :key="article.slug" class="article-card">
            <a :href="`/article/${article.slug}`" class="article-link">
              <div class="article-meta">
                <span class="article-title">{{ article.title }}</span>
                <span class="article-date">{{ article.date }}</span>
              </div>
              <p class="article-summary">{{ article.summary }}</p>
            </a>
          </li>
        </ul>
      </section>
    </main>

    <footer class="site-footer">
      <p>原作者網站：<a href="https://life3.pages.dev/#/" target="_blank" rel="noopener noreferrer">life3.pages.dev</a></p>
    </footer>
  </div>
</template>

<style>
*, *::before, *::after { box-sizing: border-box; }

body {
  margin: 0;
  padding: 0;
  font-family: 'Georgia', 'Noto Serif TC', serif;
  background: #fdfaf6;
  color: #2c1a0e;
}

.page {
  max-width: 760px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.site-header {
  text-align: center;
  padding-bottom: 2rem;
  margin-bottom: 2.5rem;
  border-bottom: 1px solid #d4b896;
}

.site-header h1 {
  font-size: 2.2rem;
  letter-spacing: 0.15em;
  color: #5a3a1a;
  margin: 0 0 0.6rem;
}

.tagline {
  color: #8b6245;
  font-size: 1.05rem;
  letter-spacing: 0.08em;
  margin: 0;
}

.section-title {
  font-size: 1.1rem;
  color: #5a3a1a;
  border-left: 3px solid #c8864a;
  padding-left: 0.75rem;
  margin: 0 0 1.5rem;
  font-weight: 600;
  letter-spacing: 0.05em;
}

.article-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.article-card {
  border: 1px solid #e8d8c4;
  border-radius: 6px;
  background: #fff;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.article-card:hover {
  border-color: #c8864a;
  box-shadow: 0 2px 8px rgba(90, 58, 26, 0.08);
}

.article-link {
  display: block;
  padding: 1.2rem 1.5rem;
  text-decoration: none;
  color: inherit;
}

.article-meta {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 0.5rem;
}

.article-title {
  font-size: 1.15rem;
  font-weight: 600;
  color: #0b63ce;
}

.article-card:hover .article-title {
  text-decoration: underline;
}

.article-date {
  font-size: 0.82rem;
  color: #9b7b5a;
}

.article-summary {
  margin: 0;
  font-size: 0.92rem;
  color: #6b4f35;
  line-height: 1.7;
}

.site-footer {
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid #d4b896;
  text-align: center;
  color: #9b7b5a;
  font-size: 0.85rem;
}

.site-footer a {
  color: #0b63ce;
}
</style>
