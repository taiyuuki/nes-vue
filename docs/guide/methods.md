# Methods

All methods are mounted on component instances.

## TypeScript

If you use TypeScript, you can obtain the instance type of the component by `InstanceType`.

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { NesVue } from 'nes-vue'

const nes = ref<InstanceType<typeof NesVue>>()
</script>

<template>
  <nes-vue
    ref="nes"
    url="https://taiyuuki.github.io/nes-vue/Super Mario Bros (JU).nes"
  />
</template>
```

Alternatively, you can directly use the `NesVueInstance` type from `nes-vue`.

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { NesVue } from 'nes-vue'
import type { NesVueInstance } from 'nes-vue'

const nes = ref<NesVueInstance>()
</script>

<template>
  <nes-vue
    ref="nes"
    url="https://taiyuuki.github.io/nes-vue/Super Mario Bros (JU).nes"
  />
</template>
```

## start

Start NES game.

```ts
start(url?: string) => void
```


::: tip
In most cases, clicking on the text ([label](/guide/props#label)) in the middle of the screen will start the game without the `start` method.
:::

::: warning
If you have to switch the game via the `start` method, you must use the **v-model** directive to bind the url, so that nes-vue can update it.
:::

## reset

Restart the game.

```ts
reset() => void
```

## stop

Stop the game.

```ts
stop() => void
```

## pause

The game is paused and can be resumed.

```ts
pause() => void
```

## play

Resume the game.

```ts
play() => void
```

## save

Save game state.

::: warning
Can only be loaded while the game is running, and ensure that the running game is consistent with the saved game.
:::

```ts
save(id: string) => void
```

By default, the game state is saved in indexedDB, you can also save it in localStorage via [storage](/guide/props#storage) property. 

Each game state archive requires about 200KB, if you need to save more data, it’s recommended to use indexedDB.

## load

Load game state.

```ts
load(id: string) => void
```

example：

```vue
<script setup>
import { ref } from 'vue'
import { NesVue } from 'nes-vue'

const nes = ref()
const id = 'example'

function save() {
  // save state
  nes.value.save(id)
}

function load() {
  // load state
  nes.value.load(id)
}
</script>

<template>
  <nes-vue
    ref="nes"
    url="https://taiyuuki.github.io/nes-vue/Super Mario Bros (JU).nes"
    auto-start
    width="512"
    height="480"
  />
  <button @click="save">Save</button>
  <button @click="load">Load</button>
</template>
```

## remove

Remove game state.

```ts
remove(id: string) => void
```

## clear

Clear all saved state.

```ts
clear() => void
```

## screenshot

```ts
screenshot(download?: boolean, imageName?: string) => HTMLImageElement
```

`screenshot(true)` will start downloading the  screenshot inside the browser.

The return value is an image element of the screenshot.

## fm2URL

```ts
fm2URL(url: string) => Promise<fm2Play>
```

Fetch the `*.fm2` file, refer to [Replay](/guide/replay)。

## fm2Text

```ts
fm2Text(text: string) => Promise<fm2Play>
```

Read the `*.fm2` file's text content, refer to [Replay](/guide/replay)。

## fm2Play

```ts
fm2Play() => void
```

Play fm2 video， refer to [Replay](/guide/replay)。

## fm2Stop

```ts
fm2Stop() => void
```

Stop fm2 video， refer to [Replay](/guide/replay)。