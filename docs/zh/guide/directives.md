# 指令

## v-gamepad

`nes-vue` 提供了 `v-gamepad` 指令，可以给HTML元素绑定游戏控制器。例如：

```vue
<script setup>
import { NesVue, vGamepad } from 'nes-vue'
</script>

<template>
  <nes-vue
    url="https://taiyuuki.github.io/nes-vue/Super Mario Bros (JU).nes"
  />
  <button v-gamepad="'B'">B</button>
</template>
```

这样，点击`button`元素即可触发游戏控制器的`B`按钮。

属性值可以是`'UP'`、`'DOWN'`、`'LEFT'`、`'RIGHT'`、`'A'`、`'B'`、`'C'`、`'D'`、`'SELECT'`或`'START'`。**注意，如果使用的是字面值，必须添加引号**。

你也可以在同一个元素上绑定多个按键，典型的例子就是在`button`元素上绑定`A`和`B`按钮：

```vue
<script setup>
import { NesVue, vGamepad } from 'nes-vue'
</script>

<template>
  <nes-vue
    url="https://taiyuuki.github.io/nes-vue/Super Mario Bros (JU).nes"
  />
  <button v-gamepad="['A', 'B']">AB</button>
</template>
```

### 参数和修饰符

默认情况下，`v-gamepad` 绑定的是鼠标点击事件（`mousedown` 和 `mouseup`），控制玩家P1。

如果要绑定移动端的触摸事件，需要添加`touch`参数（默认是`mouse`）：

```vue
<script setup>
import { NesVue, vGamepad } from 'nes-vue'
</script>

<template>
  <nes-vue
    url="https://taiyuuki.github.io/nes-vue/Super Mario Bros (JU).nes"
  />
  <button v-gamepad:touch="'A'">A</button>
</template>
```

如果要控制P2，需要添加`p2`修饰符（默认是`p1`）：

```vue
<script setup>
import { NesVue, vGamepad } from 'nes-vue'
</script>

<template>
  <nes-vue
    url="https://taiyuuki.github.io/nes-vue/Super Mario Bros (JU).nes"
  />
  <button v-gamepad:touch.p2="'A'">A</button>
</template>
```