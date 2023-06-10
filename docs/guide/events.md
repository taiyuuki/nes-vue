# events

### @fps

```ts
@fps -> function(fps: number)
```

Emitted per second while the game is running.

```vue
<script setup>
function getFPS(fps){
  console.log(fps.toFixed(2))
}
</script>

<template>
  <nes-vue
    url="https://taiyuuki.github.io/nes-vue/Super Mario Bros (JU).nes"
    @fps="getFPS"
  />
</template>
```

### @success

```ts
@success -> function()
```

Emitted when the ROM is loaded successfully.

### @saved

```ts
@saved ->  function({id, message, target})
```

Emitted when the state has been saved.

### @loaded

```ts
@loaded -> function({id, message, target})
```

Emitted when the state has been loaded.

### @removed

```ts
@removed -> function(id)
```

Emitted when the saved state has been removed.

### @error

```ts
@error -> funciont({code, message})
```

Emitted when error occurs, the code is a`number`：

* 0：ROM load error.
* 1：Save state error.
* 2：Load state error.
* 3：Play fm2 video error.