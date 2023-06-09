# props

| Property    | Description                                                  | Type             | Default                       |
| ----------- | ------------------------------------------------------------ | ---------------- | ----------------------------- |
| `url`       | URL of the NES ROM. **Required!!!**                          | string           |                               |
| `width`     | Game screen width.                                           | string \| number | 256                           |
| `height`    | Game screen height.                                          | string \| number | 240                           |
| `label`     | Text of the game screen, show only before running.           | string           | ‘Game Start’                  |
| `gain`      | The game volume between [0, 100].                            | number           | 100                           |
| `noClip`     | Background clipping, false=BG invisible in left 8-pixel column, true=No clipping.<br />Dense mode can solve the problem that the edges of some game BG are not fully displayed, and the background will not have black edges, but it will also cause the edge materials of most game BG to flicker. Please use it as appropriate. | boolean          | false                         |
| `autoStart` | Auto start when the component on mounted.                    | boolean          | false                         |
| `storage`   | Use `localStorage ` to save the game state, see [Methods - save](/guide/methods#save). | boolean          | false                         |
| `debugger`  | The error message is output in the console.                  | boolean          | false                         |
| `turbo` | Mashing speed per second, between [5, 20].                   | number           | 16                            |
| `p1`        | Player 1 controller.                                         | object           | see [Controller](#controller) |
| `p2`        | Player 2 controller.                                         | object           | see [Controller](#controller) |

## Controller

The values of the controller keys are [KeyboardEvent.code](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code), default values: 

```js
p1 = {
    UP: 'KeyW',
    DOWN: 'KeyS',
    LEFT: 'KeyA',
    RIGHT: 'KeyD',
    A: 'KeyK',
    B: 'KeyJ',
    C: 'KeyI',// Turbo(A)
    D: 'KeyU',// Turbo(B)
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

If you need to use the controller in other ways, such as the touch event of the \<button\> element.

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