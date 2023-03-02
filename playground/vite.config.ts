import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

import pages from 'vite-plugin-pages'
import layouts from 'vite-plugin-vue-layouts'
import autoAPIs from 'unplugin-auto-import/vite'
import autoComponents from 'unplugin-vue-components/vite'
function resolve(dir: string) {
  return path.join(__dirname, dir)
}

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '@': resolve('src'),
      'src': resolve('src'),
      'components': resolve('src/components'),
      'layouts': resolve('src/layouts'),
      'pages': resolve('src/pages'),
      'router': resolve('src/router'),
      'stores': resolve('src/stores'),
    },
  },
  plugins: [
    vue({ reactivityTransform: true }),
    pages({
      extensions: ['vue', 'md'],
      extendRoute(route) {
        if (route.path === '/') {
        // Index is unauthenticated.
          return route
        }
        // Augment the route with meta that indicates that the route requires authentication.
        return {
          ...route,
          meta: { auth: true },
        }
      },
    }),
    layouts({ defaultLayout: 'MainLayout' }),
    autoComponents({ dts: 'src/components.d.ts' }),
    autoAPIs({
      imports: [
        'vue',
        'pinia',
        'vue-router',

        'vue/macros',
      ],
      dts: 'src/auto-imports.d.ts',
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: '[ext]/[name]-[hash].[ext]',
        manualChunks: { 'vue-repl': ['@vue/repl'] },
      },
    },
  },
})