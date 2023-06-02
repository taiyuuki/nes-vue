import { repoURL } from 'src/template'

export const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite App</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
`

export const pkg = `{
  "name": "nes-vue-demo",
  "version": "0.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "serve": "vite preview"
  },
  "dependencies": {
    "nes-vue": "^1.5.0",
    "vue": "^3.3.0"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^3.2.0",
    "@vue/compiler-sfc": "^3.2.0",
    "vite": "^3.2.7"
  }
}`

export const main = `import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
`

export const viteConfig = `import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()]
})
`

export const readme = `# NesVue Demo

This is a [nes-vue](${repoURL}) project demo.

To start:

\`\`\`sh
npm install
npm run dev

# if using yarn:
yarn
yarn dev
\`\`\`
`
