# Replay recording video

Starting from v1.5.0, the function of playing TAS videos (`*.fm2` files) has been added, which can be downloaded from [TASVideos](https://tasvideos.org/) .

There are two ways to play the `*.fm2` here.

## Fetch fm2 file

The first is to fetch `*.fm2` files through a URL.

::: code-group
```vue [vue-js]
<script setup>
import { ref } from 'vue'
import { NesVue } from 'nes-vue'

const nes = ref()

function playVideo() {
  const url = 'https://taiyuuki.github.io/nes-vue/happylee-supermariobros,warped.fm2'
  nes.value.fm2URL(url) // return a Promise.
  .then(fm2Play => {
      fm2Play() // Playing the recording.
  })
}
</script>

<template>
  <nes-vue
    ref="nes"
    url="https://taiyuuki.github.io/nes-vue/Super Mario Bros (JU).nes"
    width="512"
    height="480"
  />
  <button @click="playVideo">Play TAS Video</button>
</template>
```

```vue [vue-ts]
<script setup lang="ts">
import type { Ref } from 'vue'
import type { NesVueInstance } from 'nes-vue'
import { ref } from 'vue'
import { NesVue } from 'nes-vue'

const nes = ref() as Ref<NesVueInstance>

function playVideo() {
  const url = 'https://taiyuuki.github.io/nes-vue/happylee-supermariobros,warped.fm2'
  nes.value.fm2URL(url) // return a Promise.
  .then(fm2Play => {
      fm2Play() // Playing the recording.
  })
}
</script>

<template>
  <nes-vue
    ref="nes"
    url="https://taiyuuki.github.io/nes-vue/Super Mario Bros (JU).nes"
    width="512"
    height="480"
  />
  <button @click="playVideo">Play TAS Video</button>
</template>
```
:::

## Read the plain text string

The second is to directly read the plain text string of the `*.fm2` file.

::: code-group
```vue [vue-js]
<script setup>
import { ref } from 'vue'
import { NesVue } from 'nes-vue'

const nes = ref()

function playVideo() {
  const text = `...` // The text here is the plain text string of fm2 file.
  nes.value.fm2Text(text)
  nes.value.fm2Play() // Playing the recording.
}
</script>

<template>
  <nes-vue
    ref="nes"
    url="https://taiyuuki.github.io/nes-vue/Super Mario Bros (JU).nes"
    width="512"
    height="480"
  />
  <button @click="playVideo">Play TAS Video</button>
</template>
```

```vue [vue-ts]
<script setup>
import type { Ref } from 'vue'
import type { NesVueInstance } from 'nes-vue'
import { ref } from 'vue'
import { NesVue } from 'nes-vue'

const nes = ref() as Ref<NesVueInstance>

function playVideo() {
  const text = `...` // The text here is the plain text string of fm2 file.
  nes.value.fm2Text(text)
  nes.value.fm2Play() // Playing the recording.
}
</script>

<template>
  <nes-vue
    ref="nes"
    url="https://taiyuuki.github.io/nes-vue/Super Mario Bros (JU).nes"
    width="512"
    height="480"
  />
  <button @click="playVideo">Play TAS Video</button>
</template>
```

:::

## Note

There are several points to note:

* Please ensure that the game version used in the `*.fm2` is completely consistent with the game ROM version, including Japanese, American, European, modified, and translated versions.

* Due to differences in the start frame, some game recording videos may require manual adjustment. A second parameter is provided to fine-tune the frame count.

  ```ts
  nes.value.fm2Text(text, -1) // 1 frame in advance
  nes.value.fm2URL(text, 2) // Delay by 2 frames
  ```

  The specific number of frames that need to be adjusted can only be tested by yourself.

* Even with identical game versions, the start frame is completely aligned, and as the game progresses, errors may occur due to differences in the implementation of the emulator. In this case, manual adjustment of the `*.fm2` file is the only way to correct it.
