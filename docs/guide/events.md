# events

| events                                       | Description                                   |
| -------------------------------------------- | --------------------------------------------- |
| `@fps -> function(fps: number)`              | Emitted per second while the game is running. |
| `@success -> function()`                     | Emitted when the ROM is loaded successfully.  |
| `@error -> funciont({code, message})`        | Emitted when error occurs.                    |
| `@saved ->  function({id, message, target})` | Emitted when the state has been saved         |
| `@loaded -> function({id, message, target})` | Emitted when the state has been loaded        |
| `@removed -> function(id)`                   | Emitted when the saved state has been removed |

```vue
<template>
  <nes-vue url="example.com/xxx.nes" @fps="getFPS" />
</template>
<script setup>
function getFPS(fps){
  console.log(fps.toFixed(2))
}
</script>
```