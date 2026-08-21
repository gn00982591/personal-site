/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// GitHub Pages 專案站台必須使用 Repository 名稱作為 base path。
export default defineConfig({
  base: '/personal-site/',
  plugins: [vue()],
  test: {
    environment: 'jsdom'
  }
})
