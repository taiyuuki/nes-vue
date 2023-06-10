# 开始使用

## 游乐场

🚀[Playground](https://taiyuuki.github.io/nes-vue)

## 安装

```shell
npm i nes-vue
```
## 引入组件

```vue
<template>
  <nes-vue
    url="https://taiyuuki.github.io/nes-vue/Super Mario Bros (JU).nes"
  />
</template>
<script setup>
  import { NesVue } from 'nes-vue';
</script>
```

`url`是`nes-vue`的必需属性，见[props](/zh/guide/props#url)