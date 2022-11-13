# nes-vue

A NES(FC) emulator component for Vue 3.

:cn:[中文](./README_zh.md)

## Demo

🚀[Demo](https://taiyuuki.github.io/nes-vue)

Demo is in the `example/` directory of this repository.

## How to use

### install

```shell
npm install nes-vue --save
```

### global component

```js
import { createApp } from "vue";
import App from "./App.vue";
import eux from "nes-vue";

createApp(App).use(eux).mount("#app");
```

Then:

```vue
<template>
    <nes-vue url="example.com/xxx.nes" autoStart :width="512" :height="480" />
</template>
```

### local component

```vue
<template>
  <nes-vue url="example.com/xxx.nes" autoStart :width="512" :height="480" />
</template>
<script setup>
  import { NesVue } from 'nes-vue';
</script>
```

## API

### props

| Property      | Description                                       | Type    | Default      |
| ------------- | ------------------------------------------------- | ------- | ------------ |
| url           | URL of the nes ROM. Required!!!                   | string  |              |
| width         | Game screen width                                 | number  | 256          |
| height        | Game screen height                                | number  | 240          |
| label         | Text of the game screen, show only before running | string  | ‘Game Start’ |
| autoStart     | Auto start when the component on mounted          | boolean | false        |
| p1            | player 1 controller                               | object  | see below    |
| p2            | player 2 controller                               | object  | see below    |

The values of the controller keys are KeyboardEvent.code, default values: 

```js
p1 = {
    UP: 'KeyW',
    DOWN: 'KeyS',
    LEFT: 'KeyA',
    RIGHT: 'KeyD',
    A: 'KeyK',
    B: 'KeyJ',
    SELECT: 'Digit2',
    START: 'Digit1'
}
p2 = {
    UP: 'ArrowUp',
    DOWN: 'ArrowDown',
    LEFT: 'ArrowLeft',
    RIGHT: 'ArrowRight',
    A: 'Numpad2',
    B: 'Numpad1'
}
```

### events

| events                                 | Description                                  |
| -------------------------------------- | -------------------------------------------- |
| @fps -> function(fps: number)          | Emitted per second when the game is running. |
| @success -> function()                 | Emitted when the ROM is loaded successfully. |
| @error -> funciont(message: string)    | Emitted when ROM load error occurs.          |

```vue
<template>
    <nes-vue url="example.com/xxx.nes" @fps="getFPS" />
</template>
<script setup>
function getFPS(fps){
    console.log(fps.toFixed(2))
}
</script>
```

### Methods

| Method                         |
| ------------------------------ |
| gameStart(url: string) => void |
| gameReset() => void            |
| gameStop() => void             |
