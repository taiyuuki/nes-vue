# Directives

## v-gamepad

`nes-vue` provides a `v-gamepad` directive that binds HTML elements to game controllers. For example, click on the `button` element to trigger `B`.

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

Attribute value can be `'UP'`、`'DOWN'`、`'LEFT'`、`'RIGHT'`、`'A'`、`'B'`、`'C'`、`'D'`、`'SELECT'` or `'START'`. **Note that there must be quotation marks.**

By default, `v-gamepad` is bound to the mouse event, which controls the player 1.

To bind the touch event, you can add the `touch` modifier (default is `mouse`):

```vue
<script setup>
import { NesVue, vGamepad } from 'nes-vue'

<template>
  <nes-vue
    url="https://taiyuuki.github.io/nes-vue/Super Mario Bros (JU).nes"
  />
  <button v-gamepad:touch="'B'">B</button>
</template>
<script>
```

To bind the player 2, you can add the `p2` modifier (default is `p1`):

```vue
<script setup>
import { NesVue, vGamepad } from 'nes-vue'

<template>
  <nes-vue
    url="https://taiyuuki.github.io/nes-vue/Super Mario Bros (JU).nes"
  />
  <button v-gamepad:touch.p2="'B'">B</button>
</template>
<script>
```