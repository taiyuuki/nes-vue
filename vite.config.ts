import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Delete from "rollup-plugin-delete";
import Dts from "vite-plugin-dts";
const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [
    Dts({
      outputDir: "dist",
      staticImport: true,
      insertTypesEntry: true,
    }),
    vue(),
  ],
  resolve: {
    alias: {
      "@": resolve("src"),
      src: resolve("src"),
      common: resolve("src/common"),
      components: resolve("src/components"),
    },
  },
  build: {
    lib: {
      entry: resolve("src/index.ts"),
      name: "NesVue",
      fileName: (format) => `nes-vue.${format}.js`,
    },
    rollupOptions: {
      // 打包时忽略vue
      external: ["vue"],
      output: {
        //为外部依赖提供全局变量
        globals: {
          vue: "Vue",
        },
      },
      plugins: [
        Delete({
          targets: ["dist/*.{ico,txt}", "dist/*.nes", "dist/*.NES"],
          hook: "generateBundle",
        }),
      ],
    },
  },
});
