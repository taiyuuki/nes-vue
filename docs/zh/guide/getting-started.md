# 开始使用

## 安装

```shell
npm i nes-vue
```
## 引入组件

```vue
<script setup>
  import { NesVue } from 'nes-vue';
</script>
<template>
  <nes-vue
    url="https://taiyuuki.github.io/nes-vue/Super Mario Bros (JU).nes"
    width="512"
    height="480"
    label="开始游戏"
  />
</template>
```

<script setup>
import { NesVue } from '../../nes-vue.es'
</script>

<nes-vue
  url="https://taiyuuki.github.io/nes-vue/Super Mario Bros (JU).nes"
  width="512"
  height="480"
  label="开始游戏"
/>

## 游乐场

在线体验：[Playground](https://taiyuuki.github.io/nes-vue)