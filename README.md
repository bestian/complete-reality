# 流水全真--以佛煉心、以儒應世、以道護體

**Liushui · Complete Reality**  
*Refine the Heart with Buddhism, Engage the World with Confucianism, Nurture the Body with Taoism*

## 專案簡介

本專案以 Cloudflare Workers 為執行環境，結合 Hono 作為 Web Framework，並使用 Vue 進行頁面渲染。
渲染策略同時支援：

- Vue Prerender（預渲染靜態頁面）
- Vue SSR（伺服端渲染）

適合部署於邊緣節點，追求快速回應與良好首屏體驗。

## 技術規格

- Runtime：Cloudflare Workers
- Framework：Hono
- View：Vue 3
- Rendering：Vue Prerender + Vue SSR
- Language：TypeScript
- Tooling：Wrangler

## 基本開發方式

### 1. 安裝相依套件

```bash
npm install
```

### 2. 啟動本機開發

```bash
npx wrangler dev
```

### 3. 部署到 Cloudflare

```bash
npx wrangler deploy
```

## 建議目錄與開發原則

- 將路由與 API 邏輯集中於 Hono App
- 將 Vue 視圖與元件獨立管理，維持渲染層清晰
- 預渲染頁面優先放置內容穩定、SEO 需求高的頁面
- 動態內容與個人化頁面可採 SSR，以保留彈性

## 授權

目前未指定授權條款，可於後續補上 LICENSE 檔案。
