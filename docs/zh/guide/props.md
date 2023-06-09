# 属性

nes-vue组件只有url是必须属性，其他都是可选属性。

```vue
<template>
  <nes-vue url="example.com/xxx.nes" />
</template>
```

## 全部属性

### url

* Type `string`

NES游戏的ROM地址，**必须！**

如果要切换游戏，只需用响应式数据绑定url，然后修改url的值即可：

```vue
<template>
  <nes-vue :url="gameURL" />
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

### width

* Type `string | number`
* Default `256`

游戏画面宽度，可以有单位，默认是px。

### height

* Type `string | number`
* Default `240`

游戏画面高度，可以有单位，默认是px。

::: tip
强烈建议width和height保持256×240的比例。
:::

```vue
<template>
  <nes-vue url="example.com/xxx.nes" width="512" height="480" />
</template>
```

### label

* Type `string`
* Default  `"Game Start"`

游戏运行前画面上的显示文字。

### gain

* Type `number`
* Default  `100`

游戏音量，介于[0, 100]之间。

### no-clip

* Type `boolean`
* Default  `false`

是否剪切画面边缘，false=游戏画面的边缘将剪切8像素，true=不剪切。

设置此属性可以解决部分游戏画面边缘显示不全的问题，且画面紧凑没有黑边，但也会造成很多游戏画面边缘材质闪烁，请酌情使用。

### auto-start

* Type `boolean`
* Default  `false`

组件挂载后自动开始游戏。

### turbo

* Type `number`
* Default `16`

连发键每秒频率 介于[5, 25]之间。

### storage

* Type `boolean`
* Default `false`

设置此属性，游戏存档会使用localStorage保存，默认是indexedDB， 详情见[方法 - save](/zh/guide/methods#save)。

### p1

* Type `object`
* Default  见[控制器](#控制器)

玩家1控制器

### p2

* Type `object`
* Default  见[控制器](#控制器)

玩家2控制器

### debugger

* Type boolean
* Default  false

错误信息输出到控制台。

## 控制器

控制器各属性值是 [KeyboardEvent.code](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code), 默认值: 

```js
p1 = {
    UP: 'KeyW',
    DOWN: 'KeyS',
    LEFT: 'KeyA',
    RIGHT: 'KeyD',
    A: 'KeyK',
    B: 'KeyJ',
    C: 'KeyI',
    D: 'KeyU',
    SELECT: 'Digit2',
    START: 'Digit1'
}
p2 = {
    UP: 'ArrowUp',
    DOWN: 'ArrowDown',
    LEFT: 'ArrowLeft',
    RIGHT: 'ArrowRight',
    A: 'Numpad2',
    B: 'Numpad1',
    C: 'Numpad5',
    D: 'Numpad4'
}
```

每个字段都是可选的，如果缺省会使用默认值。

## 手柄

无需额外配置，已内置对手柄的支持，不会受控制器属性的影响。

## 其他方式操作游戏

如果你需要以其他方式操作游戏，例如，用button元素的触摸事件操作方向键“上”：

```vue
<template>
  <nes-vue url="example.com/xxx.nes" />
  <button @touchstart="upstart" @touchend="upend">UP</button>
</template>
<script setup>
function upstart() {
  document.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyW' }))
}
function upend() {
  document.dispatchEvent(new KeyboardEvent('keyup', { code: 'KeyW' }))
}
</script>
```