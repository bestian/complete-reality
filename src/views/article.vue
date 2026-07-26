<script setup lang="ts">
defineProps<{
  contentHtml: string
  slug: string
  title: string
  description: string
  path: string
  author?: string
  category?: string
}>()

function categoryPath(category: string): string {
  return `/category/${encodeURIComponent(category)}`
}
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
        <template v-if="category">
          <a :href="categoryPath(category)" class="section back-section">{{ category }}</a>
          <span class="divider breadcrumb-sep"> › </span>
        </template>
        <span class="active section article-slug">{{ slug }}</span>
      </nav>

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
        <button
          type="button"
          class="quick-share-button"
          data-share-button
          aria-label="分享文章"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
            <path fill="currentColor" d="M12 2 7 7l1.4 1.4L11 5.8V16h2V5.8l2.6 2.6L17 7zM5 12v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-8h-2v8H7v-8z"/>
          </svg>
          分享
        </button>
        <button
          type="button"
          class="quick-favorite-button"
          data-favorite-button
          aria-label="加入我的最愛"
        >
          ☆ 收藏
        </button>
        <button
          type="button"
          class="quick-print-button"
          data-print-button
          aria-label="列印本文"
          title="列印本文"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
            <path fill="currentColor" d="M7 3h10v4H7zm12 5H5a3 3 0 0 0-3 3v6h4v3h12v-3h4v-6a3 3 0 0 0-3-3zm-3 10H8v-4h8zm2.5-6.2a1.05 1.05 0 1 1 0-2.1 1.05 1.05 0 0 1 0 2.1z"/>
          </svg>
          列印
        </button>
        <a href="/favorites" class="quick-link-favorites">我的最愛</a>
      </div>

      <!-- 文章正文 -->
      <p v-if="author" class="article-author">本文作者：{{ author }}</p>
      <article class="article-body" v-html="contentHtml" />

      <!-- 底部分隔線 + 返回 -->
      <footer class="article-footer">
        <div class="ui divider"></div>
        <div class="article-license">
          <a
            href="https://creativecommons.org/licenses/by-sa/4.0/deed.zh-hant"
            target="_blank"
            rel="license noopener noreferrer"
            class="article-license-link"
          >
            <img
              src="/images/CC_BY_SA.png"
              alt="CC BY-SA 4.0"
              class="article-license-image"
              loading="lazy"
            >
            <span class="article-print-source">出處：流水全真https://real.bestian.tw</span>
            <span>本站文章皆以 CC-BY-SA-4.0 創用授權分享</span>
          </a>
        </div>
        <a href="/" class="back-link">← 返回首頁</a>
      </footer>
    </div>

    <p class="article-swipe-hint">手機可左滑返回，右滑加入我的最愛</p>
    <p class="article-swipe-toast" aria-live="polite"></p>
  </div>
</template>
