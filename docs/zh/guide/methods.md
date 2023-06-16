# 方法

所有方法都挂载于组件实例上。

## TypeScript类型提示

如果你使用TS，可以用`InstanceType`获取组件的实例类型。

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

或者也可以直接使用`nes-vue`提供的`NesVueInstance`类型。

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

开始游戏

```ts
start(url?: string) => void
```

`start`的主要作用是让停止的游戏开始运行，一般**不需要url参数** 。

如果携带参数，且参数与当前游戏的URL不一致，就会切换游戏，但强烈建议不要这么做，切换游戏建议用[props](/zh/guide/props#url)，重启游戏建议用[reset](#reset)

::: tip
在大多数情况下，点击屏幕中间的文字（也就是[label](/zh/guide/props#label)）即可开始游戏，不需要用`start`这个方法。
:::

::: warning
如果你一定要用`start`来切换游戏, 那就必须使用 **v-model** 指令绑定url属性，这样在切换游戏后，nes-vue组件才会更新url的值。
:::

## reset

重新开始游戏。

```ts
reset() => void
```

## stop

停止游戏。

```ts
stop() => void
```

## pause

游戏暂停，可恢复。

```ts
pause() => void
```

## play

恢复游戏。

```ts
play() => void
```

## save

存档

::: warning
只有在游戏运行时才能存档、读档，读档还需要保证存档与游戏的一致性。
:::

```ts
save(id: string) => void
```

默认情况下，存档是保存在 indexedDB，你可以设置[storage](/zh/guide/props#storage)属性让其保存在localStorage。

每个存档大约需要200kB，如果需要保存较多的数据，建议使用默认的 indexedDB。

## load

读档

```ts
load(id: string) => void
```

存档、读档示例：

```vue
<script setup>
import { ref } from 'vue'
import { NesVue } from 'nes-vue'

const nes = ref()
const id = 'example'

function save() {
  // 存档
  nes.value.save(id)
}

function load() {
  // 读档
  nes.value.load(id)
}
</script>

<template>
  <nes-vue
    ref="nes"
    url="https://taiyuuki.github.io/nes-vue/Super Mario Bros (JU).nes"
    width="512"
    height="480"
  />
  <button @click="save">Save</button>
  <button @click="load">Load</button>
</template>
```

## remove

删除存档。

```ts
remove(id: string) => void
```

## clear

清空所有存档。

```ts
clear() => void
```

## screenshot

截图

```ts
screenshot(download?: boolean, imageName?: string) => HTMLImageElement
```

调用`screenshot(true)` 会在浏览器中开始下载游戏截图。

返回值是截图的image元素。

## fm2URL

```ts
fm2URL(url: string) => Promise<fm2Play>
```

读取`*.fm2`录像文件，见[播放录像](/zh/guide/replay)。

## fm2Text

```ts
fm2Text(text: string) => Promise<fm2Play>
```

读取`*.fm2`录像文件文本，见[播放录像](/zh/guide/replay)。

## fm2Play

```ts
fm2Play() => void
```

开始播放录像，见[播放录像](/zh/guide/replay)。

## fm2Stop

```ts
fm2Stop() => void
```

停止播放录像，见[播放录像](/zh/guide/replay)。