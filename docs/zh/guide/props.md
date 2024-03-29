# 属性

除`url`外，其他属性都是可选属性。

```vue
<template>
  <nes-vue
    url="https://taiyuuki.github.io/nes-vue/Super Mario Bros (JU).nes"
  />
</template>
```

## 全部属性

### url

* Type `string`

NES游戏的ROM地址，**必须！**

如果要切换游戏，只需用响应式数据绑定url，然后修改url的值即可：

```vue
<script setup>
import { ref } from 'vue'
import { NesVue } from 'nes-vue'
const url = ref('https://taiyuuki.github.io/nes-vue/Super Mario Bros (JU).nes')

function toggle() {
  url.value = 'https://taiyuuki.github.io/nes-vue/Super Mario Bros 3.nes'
}
</script>

<template>
  <nes-vue :url="url" />
  <button @click="toggle">Switch</button>
</template>
```

### width

* Type `string | number`
* 默认值 `256`

游戏画面宽度，可以有单位，默认是px。

### height

* Type `string | number`
* 默认值 `240`

游戏画面高度，可以有单位，默认是px。

::: tip
注意保持width和height的比例为256×240。
:::

```vue
<template>
  <nes-vue
    url="https://taiyuuki.github.io/nes-vue/Super Mario Bros (JU).nes"
    width="512"
    height="480"
  />
</template>
```

### label

* Type `string`
* 默认值  `"Game Start"`

游戏运行前画面上的显示文字，点击文字开始游戏。

### gain

* Type `number`
* 默认值  `100`

游戏音量，介于[0, 100]之间。

### no-clip

* Type `boolean`
* 默认值  `false`

是否剪切画面边缘，false=游戏画面的边缘将剪切8像素，true=不剪切。

设置此属性可以解决部分游戏画面边缘显示不全的问题，且画面紧凑没有黑边，但也会造成很多游戏画面边缘材质闪烁，请酌情使用。

### auto-start

* Type `boolean`
* 默认值  `false`

组件挂载后自动开始游戏。

:::warning
nes-vue使用AudioContext API实现音频播放，由于浏览器的安全策略，游戏只会在用户发生交互（例如鼠标点击）后才会运行，所以请谨慎使用这个属性。
如果要使用这个属性，请将nes-vue置于用户点击后才会加载的组件中。
:::

### turbo

* Type `number`
* 默认值 `16`

连发键每秒频率 介于[5, 25]之间。

### storage

* Type `boolean`
* 默认值 `false`

设置此属性，游戏存档会使用localStorage保存，默认是indexedDB， 详情见[方法 - save](/zh/guide/methods#save)。

### db-name

* Type `string`
* 默认值  `"nes-vue"`

indexedDB数据库名称

### p1

* Type `object`
* 默认值  见[控制器](/zh/guide/controller)

玩家1控制器

### p2

* Type `object`
* 默认值  见[控制器](/zh/guide/controller)

玩家2控制器

### debugger

* Type boolean
* 默认值  false

错误信息输出到控制台。

