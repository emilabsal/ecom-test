import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "./src/assets/styles/partials/_variables.scss" as *;
          @use "./src/assets/styles/partials/_mixins.scss" as *;
          @use "./src/assets/styles/partials/_text.scss" as *;
        `
      }
    }
  }
})
