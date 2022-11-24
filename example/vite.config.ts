import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve('src'),
      src: resolve('src'),
      common: resolve('src/common'),
      components: resolve('src/components'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: '[ext]/[name].[ext]',
      },
    },
  },
})