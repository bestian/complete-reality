<template>
  <div class="page favorites-page">
    <nav class="ui breadcrumb breadcrumb-nav">
      <a href="/" class="section back-section">首頁</a>
      <span class="divider breadcrumb-sep"> › </span>
      <span class="active section article-slug">我的最愛</span>
    </nav>

    <header class="favorites-header">
      <h1 class="ui header favorites-title">我的最愛</h1>
      <p class="favorites-subtitle">已收藏的文章會保存在這台裝置的瀏覽器中。</p>
    </header>

    <section class="favorites-content" data-favorites-root>
      <p class="favorites-loading">讀取我的最愛中...</p>
    </section>
  </div>
</template>
