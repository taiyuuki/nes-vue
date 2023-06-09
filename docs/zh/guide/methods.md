# 方法

下述所有方法都挂载于组件实例上。

## start

开始游戏

```ts
start(url?: string) => void
```

`start`主要作用是开始处于停止状态的游戏，一般**不需要url参数** 。

如果携带参数，且参数与当前游戏的URL不一致，就会切换游戏，但强烈建议不要这么做，切换游戏建议使用[props](/zh/guide/props#url)。

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
只有在游戏运行时才能存档、读档，读档还需要确保存档与游戏的一致性。
:::

```ts
save(id: string) => void
```

默认情况下，存档是保存在 indexedDB，你可以设置[storage](/zh/guide/props#属性)属性让其保存在localStorage。

每个存档大约需要200kB，如果你需要保存较多的数据，建议你使用默认的 indexedDB。

## load

读档

```ts
load(id: string) => void
```

存档、读档示例：

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
    // 存档
    nes.value.save(id)
  }
}

function load() {
  if (nes.value) {
    // 读档
    nes.value.load(id)
  }
}
</script>
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

```ts
screenshot(download?: boolean, imageName?: string) => HTMLImageElement
```

调用`screenshot(true)` 会在浏览器中开始下载游戏截图。

返回值是截图的image元素。