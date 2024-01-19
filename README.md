<h1 align="center">nes-vue</h1>

<p align="center">
A NES (FC)🎮 emulator component for Vue 3.
</p>


<p align="center">
<a href="https://www.npmjs.com/package/nes-vue"><img alt="GitHub package.json version" src="https://img.shields.io/npm/v/nes-vue?color=green&logo=npm"></a>
</p>

:cn:[中文](./README_zh.md)

## 🚀Playground

[Vue SFC Playgournd](https://play.vuejs.org/#eNqtVttO20gYfpXZ3CRIiQ2llaos7UJX7WoraBGH3mAuHHscD9gzXs84JEJ59/3m5DghHFUuguc/fv9x5r53VFXBrKG9ce9AJjWrFJFUNdXniLOyErUi96Sm2ZAkoqwaRVOyJFktStKHUr8j9IPKXw1tuZzKkZWIeCK4VGQal/SY4eMTuYo4IVEvV6qS4zBUMVs0zS0LpkzlzSRgInTq4XlT0ZqcxDUT5EstJBl8v9wJwI16w7cb2X+thRM2zdWCfGM8LvCLAxlcnh+9GskJU7IpKXJBLoSoG4QTVzF3diJ+7ZOVle+6uTI/L/SRx1W1KCgdSR12qaOeIOjhXVxXNA1g2SEmZFf/uzaH13goRJ0qUQ5huxnio4pHspzsj7QHueZgtPc2D3NWidn+qDRpz3TWM/35O8DfLIYx+48tRAPzphrTWOlabDHeKYju3suzYxQE0zDwvXy1e73jJeDAcXlTFC1ZFrqKD8gpk/GkoI6l6oa2LCZP40Zi0iwviwu5YlaadRxPaAG2n8nBYId8+twqBrO4wCj+RfqnRbzokzE+NKMPKxHPGp4oJjjJqEryb+U7KN/rcNvOg2XXf1c+0IDxlM5/ZgOEY83b3x0kiOjQHRF6yNIgCPQX3OlcBiqn3EE0jvSfi99BhUMdpWYuobVcw1lTbKR/AMQDXbkzrIHxsxF8x6KKpc4D49NN3rofqUS13Y3mWC+bsHXhHtihBU3UmSi9Idc7rdJGDh+3+yx2W7KV0EbLtJAqsC+Ozh9GhippVRvcFmdb40M2HjN23mbqzfXowtYWvB+WkcG6UcfoQtCBWv9LQmFzi4S1aUS24vxjnWJQHYT2bsStiIOiJfwoihMhBymbkaSIpfwU9SZiHvUMGQy3cXzHozCQcIveksZNXYDm+qNDv2OpysH5sIeV1FJzqpcgyO8/7q7Ih7JJEmrc+4n2zNAiDAFxC1bFAcWDtU27jhV9unLDARI0XO4rmje1JniY5DGfatl2EDzTOYM7UekC+yMhs1EmamueMN6+FVZWEb4pxyYE0G/pYpPaOiLkHu8XUWJToGQJHfT1Vdsfkn5/hyxNAxg8oQXksxFa6P44aZRCOx4mBUtutS+/kdr8EXKmaV7dKjym7hdNR1vPzcuUTf9GPUwhLnmcTauM31NET8ZujaSgu8+OD2Sic3v44J/1Z1fHs9b1SBMIkl8speLlibC2ZyOZizuQVsthIztP2vYtfhB2ZhNHkyR8BhhMuwoqIZmu9Bg9Djk2o3+6/asDHaP5CsbpaFKI5BYcs5ECPSpWHU+eKeMj4BmTD9XcSuDlwS2YoVv+Q9jBzbymU+vhNVrerH4aGAlbQ7K3u+tNogMd9N6wZ9/YozKughspOJ7qRityDEzx2O85s2DM1gFt9R5KUg7VlBZsVmMAVMir0r+IDveCj8EeEihBtqQA2/LG7SmAWQKDkrhr8AjbQKBfIKyg9U8zPutI4qIQd98NTV8j7mUFnZwmt1voNxLLU6M+1fNVzxBDy1PIIcbLsL+e/6BzfLfMUqSN7sUnmJhOUTRm5xixLw1PAbsjZ9D+axKK5ruQX+eKcumD8vfx0r31kaS/nwh9BXc/2G+zuPwfn0R3+g==)

[NES Vue Playground](https://taiyuuki.github.io/nes-vue)

## Features

- [x] Support for multiplayer.
- [x] Support for gamepad.
- [x] Support for turbo button.
- [x] Support for saving and loading.
- [x] Support for playing TAS recordings. (`*.fm2`)
- [x] Support for cheat codes.

## Usage

### install

```shell
npm install nes-vue --save
```

And then

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
Refer to [documentations](https://nes-vue-docs.netlify.app/) for more details.