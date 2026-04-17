# 流水全真 — 以佛煉心、以儒應世、以道護體

**Liushui · Complete Reality**  
*Refine the Heart with Buddhism, Engage the World with Confucianism,*  
*Nurture the Body with Taoism*

## 專案簡介

本專案以 Cloudflare Workers 為執行環境，
採用 Hono 建立伺服端路由與 API，並用 Vue 3 提供頁面渲染。

渲染策略同時支援：

- Vue Prerender（預渲染靜態頁）
- Vue SSR（伺服端動態渲染）

這種組合可兼顧：

- 首屏與回應速度
- SEO 與社群分享預覽（Social Preview）
- 邊緣節點部署效率

## 技術堆疊

- Runtime：Cloudflare Workers
- Server Framework：Hono
- View Layer：Vue 3
- Rendering：Prerender + SSR
- Language：TypeScript
- Tooling：Vite + Wrangler

## 開發指令

### 安裝套件

```bash
npm install
```

### 啟動本機開發

```bash
npm run dev
```

### 預渲染靜態頁面

```bash
npm run prerender
```

### 建置

```bash
npm run build
```

### 部署到 Cloudflare

```bash
npm run deploy
```

## 專案原則

- 路由與 API 集中於 Hono App，保持 server 邏輯一致
- Vue 視圖與元件獨立管理，降低耦合
- 內容穩定且重視 SEO 的頁面優先 prerender
- 動態內容與個人化頁面使用 SSR 保留彈性

## 授權

目前尚未指定授權條款，後續再補上 `LICENSE`。
