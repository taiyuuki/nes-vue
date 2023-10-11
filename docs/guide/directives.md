# Directives

## v-gamepad

`nes-vue` provides a `v-gamepad` directive that binds HTML elements to game controllers. For example, click on the `button` element to trigger `B`.

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

Attribute value can be `'UP'`、`'DOWN'`、`'LEFT'`、`'RIGHT'`、`'A'`、`'B'`、`'C'`、`'D'`、`'SELECT'` or `'START'`. **Note that there must be quotation marks when using literal values.**

You can also bind multiple buttons on the same element. A typical example is to bind `A` and `B` buttons on the `button` element:

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

### Arguments and modifiers

By default, `v-gamepad` is bound to the mouse event (`mousedown` and `mouseup`), which controls player 1.

To bind the touch event, you can add the `touch` modifier (default is `mouse`):

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

To bind the player 2, you can add the `p2` modifier (default is `p1`):

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
