<h1 align="center">nes-vue</h1>

<p align="center">
用于 Vue 3 的 NES (FC)🎮 游戏模拟器组件。
</p>


<p align="center">
<a href="https://www.npmjs.com/package/nes-vue"><img alt="GitHub package.json version" src="https://img.shields.io/npm/v/nes-vue?color=green&logo=npm"></a>
</p>

## 游乐场

🚀[Playground](https://taiyuuki.gitee.io/nes-vue)

## 功能

- [x] 支持双人
- [x] 支持手柄
- [x] 支持连发键
- [x] 支持保存、读取
- [x] 支持回放TAS录像（*.fm2文件）

## 使用

### 安装

```shell
npm install nes-vue --save
```

然后:

```vue
<script setup>
  import { NesVue } from 'nes-vue';
</script>
<template>
  <nes-vue
    url="https://taiyuuki.github.io/nes-vue/Super Mario Bros (JU).nes"
  />
</template>
```

更多组件API请查看 [文档](https://taiyuuki.gitee.io/nes-vue-docs/zh/)