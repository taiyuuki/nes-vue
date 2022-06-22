# nes-vue

Vue 3 的 NES(FC) 游戏模拟器组件。

## 使用

### 安装

```shell
npm install nes-vue --save
```

### 全局引入

```js
import { createApp } from "vue";
import App from "./App.vue";
import eux from "nes-vue";

createApp(App).use(eux).mount("#app");
```

然后:

```vue
<template>
    <nes-eux url="example.com/xxx.nes" autoStart :width="512" :height="480" />
</template>
```

### 局部引入

```vue
<template>
  <nes-eux url="example.com/xxx.nes" autoStart :width="512" :height="480" />
</template>
<script setup>
  import { NesEux } from 'nes-vue';
</script>
```

## API

### props

| Property      | Description                  | Type    | Default      |
| ------------- | ---------------------------- | ------- | ------------ |
| url           | nes游戏的rom地址，必须！！！ | string  |              |
| width         | 游戏画面宽度                 | number  | 256          |
| height        | 游戏画面高度                 | number  | 240          |
| label         | 游戏运行前画面上的显示文字   | string  | ‘Game Start’ |
| autoStart     | 组件挂载后自动开始游戏       | boolean | false        |
| Controller_P1 | 玩家 1 控制器                | object  | 见下文       |
| Controller_P2 | 玩家 2 控制器                | object  | 见下文       |

控制器各属性值是 KeyboardEvent.code, 默认值: 

```js
Controller_P1 = {
    UP: 'KeyW',
    DOWN: 'KeyS',
    LEFT: 'KeyA',
    RIGHT: 'KeyD',
    A: 'KeyK',
    B: 'KeyJ',
    SELECT: 'Digit2',
    START: 'Digit1'
}
Controller_P2 = {
    UP: 'ArrowUp',
    DOWN: 'ArrowDown',
    LEFT: 'ArrowLeft',
    RIGHT: 'ArrowRight',
    A: 'Numpad2',
    B: 'Numpad1'
}
```

### 事件

只有一个事件:

| events                                 | Description            |
| -------------------------------------- | ---------------------- |
| @fpsPerSecond -> function(fps: number) | 游戏运行时每秒执行一次 |

```vue
<template>
    <nes-eux url="example.com/xxx.nes" @fpsPerSecond="getFPS" />
</template>
<script setup>
function getFPS(fps){
    console.log(fps.toFixed(2))
}
</script>
```

### 方法

| Method                         |
| ------------------------------ |
| gameStart(url: string) => void |
| gameReset() => void            |
| gameStop() => void             |

## Demo

🚀[Demo](https://taiyuuki.github.io/nes-vue)

Demo 就在本项目的 `example/` 目录下