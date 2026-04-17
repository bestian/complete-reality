<script setup lang="ts">
defineProps<{
  contentHtml: string
  slug: string
}>()
</script>

<template>
  <div class="page">

    <!-- 麵包屑導覽：Semantic UI breadcrumb -->
    <nav class="ui breadcrumb breadcrumb-nav">
      <a href="/" class="section back-section">首頁</a>
      <span class="divider breadcrumb-sep"> › </span>
      <span class="active section article-slug">{{ slug }}</span>
    </nav>

    <!-- 文章正文 -->
    <article class="article-body" v-html="contentHtml" />

    <!-- 底部分隔線 + 返回 -->
    <footer class="article-footer">
      <div class="ui divider"></div>
      <a href="/" class="back-link">← 返回首頁</a>
    </footer>

  </div>
</template>
