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
| `width`     | Game screen width                                 | number  | 256          |
| `height`    | Game screen height                                | number  | 240          |
| `label`     | Text of the game screen, show only before running | string  | ‘Game Start’ |
| `autoStart` | Auto start when the component on mounted          | boolean | false        |
| `p1`        | player 1 controller                               | object  | see below    |
| `p2`        | player 2 controller                               | object  | see below    |
| `storage`   | Use `localStorage `to save the game state         | boolean | false        |

About save game state, see[Methods](#Methods).

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

| events                                       | Description                                  |
| -------------------------------------------- | -------------------------------------------- |
| `@fps -> function(fps: number)`              | Emitted per second when the game is running. |
| `@success -> function()`                     | Emitted when the ROM is loaded successfully. |
| `@error -> funciont(message: string)`        | Emitted when ROM load error occurs.          |
| `@saved ->  function({id, message, target})` | Emitted when the state has been saved        |
| `@loaded -> function({id, message, target})` | Emitted when the state has been loaded       |

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

| Methods                           |
| --------------------------------- |
| `gameStart(url?: string) => void` |
| `gameReset() => void`             |
| `gameStop() => void`              |
| `save(id: string) => void`        |
| `load(id: string) => void`        |

**WARNING**: Can only be loaded while the game is running. and ensure that the running game is consistent with the saved game.

> By default, game state is saved in indexedDB, you can also save it in localStorage via storage property. 
>
> The localStorage can store from **2 MB** to **10 MB** size of data depending upon the browser use, each game state archive requires about **0.5MB** to **2MB**.
>
>  If you need to save more data, it’s recommended to use indexedDB.

```vue
<template>
    <nes-vue ref="nes" url="example.com/xxx.nes" />
	<div @click="save">Save</div>
	<div @click="load">Load</div>
</template>
<script setup>
import { ref } from 'vue'
    
cosnt nes = ref(null)
const id = 'example'

// save game state
function save(){
	if(nes.value){
		nes.value.save(id)
	}
}
    
// load game state
function load(){
	if(nes.value){
        nes.value.load(id)
    }
}
</script>
```

