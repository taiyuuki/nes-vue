# Props

Except for the `url`, all other properties are optional.

```vue
<template>
  <nes-vue
    url="https://taiyuuki.github.io/nes-vue/Super Mario Bros (JU).nes"
  />
</template>
```

## All properties

### url

* Type `string`

URL of the nes ROM. **Required!**

If you want to switch to another game, just bind the `url` with a reactive value, and change it：

```vue
<script setup>
import { ref } from 'vue'
import { NesVue } from 'nes-vue'
const url = ref('https://taiyuuki.github.io/nes-vue/Super Mario Bros (JU).nes')

function switch() {
  url.value = 'https://taiyuuki.github.io/nes-vue/Super Mario Bros 3.nes'
}
</script>

<template>
  <nes-vue :url="url" />
  <button @click="switch">Switch</button>
</template>
```

### width

* Type `string | number`
* Default `256`

Game screen width, units can be included, default is px.

### height

* Type `string | number`
* Default `240`

Game screen height, units can be included, default is px.

::: tip
Maintain a ratio of 256×240 for width and height.
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
* Default  `"Game Start"`

Text of the game screen，click on it to start the game。

### gain

* Type `number`
* Default  `100`

The game volume between [0, 100].

### no-clip

* Type `boolean`
* Default  `false`

Background clipping, false=BG invisible in left 8-pixel column, true=No clipping.

Clip mode can solve the problem that the edges of some game BG are not fully displayed, and the background will not have black edges, but it will also cause the edge materials of most game BG to flicker. Please use it as appropriate.

### auto-start

* Type `boolean`
* Default  `false`

Auto start when the component on mounted.

### turbo

* Type `number`
* Default `16`

Mashing speed per second, between [5, 20].

### storage

* Type `boolean`
* Default `false`

Use `localStorage` to save the game state, default is indexedDB, see [Methods - save](/guide/methods#save).

### p1

* Type `object`
* Default  see[Controller](#controller)

Player 1 controller.

### p2

* Type `object`
* Default  见[Controller](#controller)

Player 2 controller.

### debugger

* Type boolean
* Default  false

The error message is output in the console.

## Controller

The values of the controller keys are [KeyboardEvent.code](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code), default:

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

Each field is optional, and if a field is missing, the default value will be used.

### Gamepad

The component has built-in support for the gamepad, which does not require additional configuration.

### Control the game in other ways

If you need to control the game in other ways, such as triggering the direction key UP through the touch event of the button element.

```vue
<script setup>
function upstart() {
  document.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyW' }))
}
function upend() {
  document.dispatchEvent(new KeyboardEvent('keyup', { code: 'KeyW' }))
}
</script>

<template>
  <nes-vue
    url="https://taiyuuki.github.io/nes-vue/Super Mario Bros (JU).nes"
  />
  <button @touchstart="upstart" @touchend="upend">UP</button>
</template>
```