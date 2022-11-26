<h1 align="center">nes-vue</h1>

<p align="center">
A NES (FC)🎮 emulator component for Vue 3.
</p>


<p align="center">
<a href="https://www.npmjs.com/package/nes-vue"><img alt="GitHub package.json version" src="https://img.shields.io/npm/v/nes-vue?color=green&logo=npm"></a>
</p>

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
import nes from "nes-vue";

createApp(App).use(nes).mount("#app");
```

Then:

```vue
<template>
    <nes-vue url="example.com/xxx.nes" auto-start :width="512" :height="480" />
</template>
```

### local component

```vue
<template>
  <nes-vue url="example.com/xxx.nes" auto-start :width="512" :height="480" />
</template>
<script setup>
  import { NesVue } from 'nes-vue';
</script>
```

## API

### props

| Property    | Description                                       | Type    | Default      |
| ----------- | ------------------------------------------------- | ------- | ------------ |
| `url`       | URL of the nes ROM. Required!!!                   | string  |              |
| `width`     | Game screen width                                 | string  | ‘256px’      |
| `height`    | Game screen height                                | string  | ‘240px’      |
| `label`     | Text of the game screen, show only before running | string  | ‘Game Start’ |
| `autoStart` | Auto start when the component on mounted          | boolean | false        |
| `storage`   | Use `localStorage `to save the game state         | boolean | false        |
| `p1`        | player 1 controller                               | object  | see below    |
| `p2`        | player 2 controller                               | object  | see below    |

About save game state, see[Methods - save](#save).

The values of the controller keys are [KeyboardEvent.code](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code), default values: 

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

| events                                       | Description                                   |
| -------------------------------------------- | --------------------------------------------- |
| `@fps -> function(fps: number)`              | Emitted per second while the game is running. |
| `@success -> function()`                     | Emitted when the ROM is loaded successfully.  |
| `@error -> funciont({code, message})`        | Emitted when ROM load error occurs.           |
| `@saved ->  function({id, message, target})` | Emitted when the state has been saved         |
| `@loaded -> function({id, message, target})` | Emitted when the state has been loaded        |

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

| Methods                                              |
| ---------------------------------------------------- |
| `gameStart(url?: string) => void`                    |
| `gameReset() => void`                                |
| `gameStop() => void`                                 |
| `save(id: string) => void`                           |
| `load(id: string) => void`                           |
| `screenshot(download?: boolean) => HTMLImageElement` |

#### gameStart
```ts
gameStart(url?: string) => void
```
Normally, **url is not required**, gameStart method is used to start the game in the stopped state.

If you want to switch games, you just need to bind the url property with a reactive value, and then modify the value.

**WARNING**: If you have to switch the game via gameStart methord, you must use the **v-model **directive to bind the url, so that nes-vue can update it:

```vue
<template>
  <nes-vue ref="nes" v-model:url="gameURL" auto-start :width="512" :height="480" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { NesVueInstance } from 'nes-vue'
import { NesVue } from 'nes-vue'
const gameURL = ref('example.com/aaa.nes')
const nes = ref<NesVueInstance | null>(null)

function switch() {
  if (nes.value) {
    // this will be update the gameURL to 'example.com/bbb.nes'
    nes.value.gameStart('example.com/bbb.nes')
  }
}
</script>
```

#### gameReset

```ts
gameReset() => void
```

Restart the current game.

#### gameStop

```ts
gameStop() => void
```

#### save

```ts
save(id: string) => void
```

By default, game state is saved in indexedDB, you can also save it in localStorage via [storage](#props) property. 

The localStorage can store from **2 MB** to **10 MB** size of data depending upon the browser use, each game state archive requires about **0.5MB** to **2MB**.

If you need to save more data, it’s recommended to use indexedDB.

#### load

```ts
load(id: string) => void
```

**WARNING**: Can only be loaded while the game is running, and ensure that the running game is consistent with the saved game.

```vue
<template>
  <nes-vue ref="nes" v-model:url="example.com/xxx.nes" auto-start :width="512" :height="480" />
  <button @click="save">Save</button>
  <button @click="load">Load</button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { NesVueInstance } from 'nes-vue'
import { NesVue } from 'nes-vue'

const gameURL = ref('example.com/aaa.nes')
const nes = ref<NesVueInstance | null>(null)
const id = 'example'

function save() {
  if (nes.value) {
    // Save state
    nes.value.save(id)
  }
}

function load() {
  if (nes.value) {
    // Load state
    nes.value.load(id)
  }
}
</script>
```

#### screenshot

```ts
screenshot(download?: boolean) => HTMLImageElement
```

`screenshot(true)` will start downloading the  screenshot inside the browser.

The return value is a image element of the screenshot.

