import { defineConfig } from 'vite'
import { cloudflare } from '@cloudflare/vite-plugin'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  // www/ 同時作為 Cloudflare ASSETS 目錄與 Vite publicDir，
  // 確保 dev、preview、production 三者皆以相同方式提供靜態資產。
  publicDir: 'www',
  plugins: [
    cloudflare(),
    vue(),
  ],
})
