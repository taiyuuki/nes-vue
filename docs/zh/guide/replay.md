# 播放录像

从 v1.5.0 开始，新增播放 `*.fm2` 录像文件的功能，录像文件可以在 [TASVideos](https://tasvideos.org/) 下载。

这里提供两种方式来播放 `*.fm2` 文件。

## 请求fm2文件

第一种：通过URL读取*.fm2文件

::: code-group
```vue [vue-js]
<script setup>
import { ref } from 'vue'
import { NesVue } from 'nes-vue'

const nes = ref()

function playVideo() {
  const url = 'https://taiyuuki.github.io/nes-vue/happylee-supermariobros,warped.fm2'
  nes.value.fm2URL(url) // 请求fm2文件，返回Promise，参数就是fm2Play方法。
  .then(fm2Play => {
      fm2Play() // 开始播放录像
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
  nes.value.fm2URL(url) // 请求fm2文件，返回Promise，参数就是fm2Play方法。
  .then(fm2Play => {
      fm2Play() // 开始播放录像
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

## 读取纯文本

第二种：直接读取 `*.fm2` 文件的纯文本形式的字符串

::: code-group
```vue [vue-js]
<script setup>
import { ref } from 'vue'
import { NesVue } from 'nes-vue'

const nes = ref()

function playVideo() {
  const text = `...` // 假设text就是fm2的纯文本字符串
  // 虽然fm2Text也返回Promise，但解析过程是同步的，所以可以用同步的方式使用。
  nes.value.fm2Text(text) // 读取文本
  nes.value.fm2Play() // 开始播放录像。
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
  const text = `...` // 假设text就是fm2的纯文本字符串
  // 虽然fm2Text也返回Promise，但解析过程是同步的，所以可以用同步的方式使用。
  nes.value.fm2Text(text) // 读取文本
  nes.value.fm2Play() // 开始播放录像。
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

## 注意事项

关于录像播放，这里有几点需要注意：

* 请确保录像使用的游戏版本与游戏ROM的版本完全一致，日版、美版、欧版、修改版、翻译版，不能混同。

* 不同的游戏录像由于开始帧的位置差异，可能需要手动调整，这里提供了第二个参数来微调帧数。

  ```ts
  nes.value.fm2Play(-1) // 提前1帧
  nes.value.fm2Play(2) // 延迟2帧
  ```

  具体需要调整多少，只能靠自己测试。

* 即便完全相同的游戏版本，开始帧也完全对齐，随着游戏的进行，也可能会出现差错，这是模拟器的实现差异造成的，在这种情况下，只能靠手动调整 `*.fm2` 文件来修正，没有其他办法。
