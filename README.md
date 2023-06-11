<h1 align="center">nes-vue</h1>

<p align="center">
A NES (FC)🎮 emulator component for Vue 3.
</p>


<p align="center">
<a href="https://www.npmjs.com/package/nes-vue"><img alt="GitHub package.json version" src="https://img.shields.io/npm/v/nes-vue?color=green&logo=npm"></a>
</p>

:cn:[中文](./README_zh.md)

## Playground

🚀[Playground](https://taiyuuki.github.io/nes-vue)

## Features

- [x] Support for multiplayer.
- [x] Support for gamepad.
- [x] Support for turbo button.
- [x] Support for saving and loading.
- [x] Support for playing TAS recordings. (`*.fm2`)

## Usage

### install

```shell
npm install nes-vue --save
```

And then

```vue
<template>
  <nes-vue url="example.com/xxx.nes" auto-start :width="512" :height="480" />
</template>
<script setup>
import { NesVue } from 'nes-vue';
</script>
```
Refer to [documentations](https://nes-vue-docs.netlify.app/) for more details.