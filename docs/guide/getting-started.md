# Getting Started

## Playground

🚀[Playground](https://taiyuuki.github.io/nes-vue)

## Installation

```shell
npm i nes-vue
```
## Impoting

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
`url` is a required property, refer to [props](/guide/props#url) for details.