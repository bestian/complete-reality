<script setup lang="ts">
defineProps<{
  contentHtml: string
  slug: string
  title: string
  description: string
  path: string
}>()
</script>

<template>
  <div
    class="page article-page"
    :data-article-title="title"
    :data-article-path="path"
    :data-article-description="description"
    :data-article-slug="slug"
  >
    <div class="article-swipe-actions" aria-hidden="true">
      <span class="swipe-action swipe-action-back">左滑返回</span>
      <span class="swipe-action swipe-action-favorite">右滑收藏</span>
    </div>

    <div class="article-gesture-frame">
      <!-- 麵包屑導覽：Semantic UI breadcrumb -->
      <nav class="ui breadcrumb breadcrumb-nav">
        <a href="/" class="section back-section">首頁</a>
        <span class="divider breadcrumb-sep"> › </span>
        <span class="active section article-slug">{{ slug }}</span>
      </nav>

      <div class="quick-links">
        <button
          type="button"
          class="quick-favorite-button"
          data-favorite-button
          aria-label="加入我的最愛"
        >
          ☆ 收藏
        </button>
        <a href="/favorites" class="quick-link-favorites">我的最愛</a>
      </div>

      <!-- 文章正文 -->
      <article class="article-body" v-html="contentHtml" />

      <!-- 底部分隔線 + 返回 -->
      <footer class="article-footer">
        <div class="ui divider"></div>
        <a href="/" class="back-link">← 返回首頁</a>
      </footer>
    </div>

    <p class="article-swipe-hint">手機可左滑返回，右滑加入我的最愛</p>
    <p class="article-swipe-toast" aria-live="polite"></p>
  </div>
</template>
