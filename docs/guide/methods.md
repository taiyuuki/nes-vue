# Methods

All of the following methods are mounted on the component instance.

## start

Start running.

```ts
start(url?: string) => void
```
Normally, **url is not required**, the `start` method is used to start the game in the stopped state.

If you want to switch games, you just need to bind the url property with a reactive value, and then change the value.

```vue
<template>
  <nes-vue :url="gameURL" auto-start :width="512" :height="480" />
  <button @click="switch">Switch</button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { NesVue } from 'nes-vue'
const gameURL = ref('example.com/aaa.nes')

function switch() {
  gameURL.value = 'example.com/bbb.nes'
}
</script>
```

**WARNING**: If you have to switch the game via the `start` method, you must use the **v-model** directive to bind the url, so that nes-vue can update it.

```vue
<template>
  <nes-vue ref="nes" v-model:url="gameURL" auto-start :width="512" :height="480" />
  <button @click="switch">Switch</button>
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
    nes.value.start('example.com/bbb.nes')
  }
}
</script>
```

## reset

Restart the current game.

```ts
reset() => void
```

## stop

Game stop.

```ts
stop() => void
```

## pause

Game pause.

```ts
pause() => void
```

## play

Paused game continues.

```ts
play() => void
```

## save

::: warning
Can only be loaded while the game is running, and ensure that the running game is consistent with the saved game.
:::

```ts
save(id: string) => void
```

By default, the game state is saved in indexedDB, you can also save it in localStorage via [storage](/guide/props#props) property. 

The localStorage can store from **2 MB** to **10 MB** size of data depending upon the browser used, each game state archive requires about 200KB.

If you need to save more data, it’s recommended to use indexedDB.

## load

```ts
load(id: string) => void
```

```vue
<template>
  <nes-vue ref="nes" url="example.com/xxx.nes" auto-start :width="512" :height="480" />
  <button @click="save">Save</button>
  <button @click="load">Load</button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { NesVueInstance } from 'nes-vue'
import { NesVue } from 'nes-vue'

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

## remove

Remove saved data.

```ts
remove(id: string) => void
```

## clear

Clear all saved data.

```ts
clear() => void
```

## screenshot

```ts
screenshot(download?: boolean, imageName?: string) => HTMLImageElement
```

`screenshot(true)` will start downloading the  screenshot inside the browser.

The return value is an image element of the screenshot.