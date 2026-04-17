<script setup lang="ts">
defineProps<{
  contentHtml: string
  slug: string
}>()
</script>

<template>
  <div class="page">
    <nav class="breadcrumb">
      <a href="/" class="back-link">← 返回首頁</a>
    </nav>

    <article class="article-body" v-html="contentHtml" />

    <footer class="article-footer">
      <a href="/" class="back-link">← 返回首頁</a>
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

.breadcrumb {
  margin-bottom: 2rem;
}

.back-link {
  color: #8b6245;
  text-decoration: none;
  font-size: 0.9rem;
  letter-spacing: 0.03em;
}

.back-link:hover {
  color: #0b63ce;
  text-decoration: underline;
}

.article-body {
  line-height: 1.9;
}

.article-body h1,
.article-body h2,
.article-body h3 {
  color: #5a3a1a;
  line-height: 1.4;
  margin-top: 2rem;
}

.article-body h2 {
  font-size: 1.5rem;
  letter-spacing: 0.05em;
  border-bottom: 1px solid #d4b896;
  padding-bottom: 0.5rem;
}

.article-body p {
  margin-bottom: 1.2em;
  text-align: justify;
}

.article-body a {
  color: #0b63ce;
}

.article-body img {
  max-width: 100%;
  height: auto;
  border-radius: 4px;
}

.article-body blockquote {
  margin: 1.5em 0;
  padding: 0.8em 1.2em;
  border-left: 3px solid #c8864a;
  background: #fdf3e7;
  color: #5a3a1a;
  font-style: italic;
}

.article-footer {
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid #d4b896;
}
</style>
