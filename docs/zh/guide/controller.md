# 控制器

[`p1`](/zh/guide/props#p1)和[`p1`](/zh/guide/props#p2)属性可以自定义控制器对应的键盘按键，默认值如下: 

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

属性值是 [KeyboardEvent.code](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code)，每个字段都是可选的，如果缺省会使用默认值。

## 用其他方式操作游戏

强烈推荐使用 [v-gamepad](/zh/guide/directives#v-gamepad) 指令，它可以给任意HTML元素绑定游戏控制器。

除此之外，你还可以手动触发document上的`keydown`和`keyup`事件来操作游戏，但建议只在`v-gamepad`无法满足你的需求时这么做，这里提供一个示例：

```vue
<script setup>
function move() {
  document.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyD' }))
}
function stop() {
  document.dispatchEvent(new KeyboardEvent('keyup', { code: 'KeyD' }))
}
</script>

<template>
  <nes-vue
    url="https://taiyuuki.github.io/nes-vue/Super Mario Bros (JU).nes"
  />
  <button @touchstart="move" @touchend="stop">RIGHT</button>
</template>
```

触摸`button`元素即可触发游戏控制器的`RIGHT`按钮。

使用`v-gamepad`指令可以达到和上面同样的效果，且性能相对会更好：

```vue
<script setup>
import { NesVue, vGamepad } from 'nes-vue'
</script>

<template>
  <nes-vue
    url="https://taiyuuki.github.io/nes-vue/Super Mario Bros (JU).nes"
  />
  <button v-gamepad:touch="'RIGHT'">RIGHT</button>
</template>
```

详细用法请查看[v-gamepad](/zh/guide/directives#v-gamepad)。

## 手柄

组件内置了对手柄的支持，无需额外配置，即插即用。