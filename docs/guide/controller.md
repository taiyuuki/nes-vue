# Controller

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

## Control the game in other ways

If you need to control the game through click or touch events of HTML elements, The [v-gamepad](/guide/directives#v-gamepad) directive is highly recommended.

You can also control the game by dispatching `keydown` and `keyup` events to the document, But you should only do this when the `v-gamepad` doesn't meet your needs.

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

Touching the `button` element will triggers the game controller's `RIGHT` button.

Using `v-gamepad` directive can achieve the same effect, and the performance is relatively better:

```vue
<script setup>
import { NesVue, vGamepad } from 'nes-vue'
</script>

<template>
  <nes-vue
    url="https://taiyuuki.github.io/nes-vue/Super Mario Bros (JU).nes"
  />
  <button v-gamepad="'RIGHT'">RIGHT</button>
</template>
```

Detailed usage please refer to [v-gamepad](/guide/directives#v-gamepad).

## Gamepad

The component has built-in support for the gamepad, which does not require additional configuration.
