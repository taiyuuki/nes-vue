# 指令

## v-gamepad

`nes-vue` 提供了一个 `v-gamepad` 指令，可以给HTML元素绑定游戏控制器。例如：

```vue
<script setup>
import { NesVue, vGamepad } from 'nes-vue'
<script>

<template>
  <nes-vue
    url="https://taiyuuki.github.io/nes-vue/Super Mario Bros (JU).nes"
  />
  <button v-gamepad="'B'">B</button>
</template>
```

这样，鼠标点击`button`元素即可触发游戏控制器的`B`按钮。

属性值可以是`'UP'`、`'DOWN'`、`'LEFT'`、`'RIGHT'`、`'A'`、`'B'`、`'C'`、`'D'`、`'SELECT'`或`'START'`。**注意必须有引号**。

指令默认绑定的是鼠标点击事件，控制玩家P1。

如果要绑定移动端的触摸事件，需要添加`touch`参数（默认是`mouse`）：

```vue
<script setup>
import { NesVue, vGamepad } from 'nes-vue'
<script>

<template>
  <nes-vue
    url="https://taiyuuki.github.io/nes-vue/Super Mario Bros (JU).nes"
  />
  <button v-gamepad:touch="'B'">B</button>
</template>
```


如果要控制P2，需要添加`p2`修饰符（默认是`p1`）：

```vue
<script setup>
import { NesVue, vGamepad } from 'nes-vue'
<script>

<template>
  <nes-vue
    url="https://taiyuuki.github.io/nes-vue/Super Mario Bros (JU).nes"
  />
  <button v-gamepad:touch.p2="'B'">B</button>
</template>
```