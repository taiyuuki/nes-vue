<h1 align="center">nes-vue</h1>

<p align="center">
用于 Vue 3 的 NES (FC)🎮 游戏模拟器组件。
</p>


<p align="center">
<a href="https://www.npmjs.com/package/nes-vue"><img alt="GitHub package.json version" src="https://img.shields.io/npm/v/nes-vue?color=green&logo=npm"></a>
</p>

## Demo

🚀[Demo](https://taiyuuki.github.io/nes-vue)

Demo 就在本项目的 `example/` 目录下

## 使用

### 安装

```shell
npm install nes-vue --save
```

### 全局引入

```js
import { createApp } from "vue";
import App from "./App.vue";
import nes from "nes-vue";

createApp(App).use(nes).mount("#app");
```

然后:

```vue
<template>
    <nes-vue url="example.com/xxx.nes" auto-start :width="512" :height="480" />
</template>
```

### 局部引入

```vue
<template>
  <nes-vue url="example.com/xxx.nes" auto-start :width="512" :height="480" />
</template>
<script setup>
  import { NesVue } from 'nes-vue';
</script>
```

## API

### 属性

| Property    | Description                  | Type    | Default      |
| ----------- | ---------------------------- | ------- | ------------ |
| `url`       | nes游戏的rom地址，必须！！！ | string  |              |
| `width`     | 游戏画面宽度                 | number  | 256          |
| `height`    | 游戏画面高度                 | number  | 240          |
| `label`     | 游戏运行前画面上的显示文字   | string  | ‘Game Start’ |
| `autoStart` | 组件挂载后自动开始游戏       | boolean | false        |
| `p1`        | 玩家 1 控制器                | object  | 见下文       |
| `p2`        | 玩家 2 控制器                | object  | 见下文       |
| `storage`   | 游戏保存时使用localStorage   | boolean | false        |

关于保存游戏，详细说明在[方法](#方法).

控制器各属性值是 [KeyboardEvent.code](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code), 默认值: 

```js
p1 = {
    UP: 'KeyW',
    DOWN: 'KeyS',
    LEFT: 'KeyA',
    RIGHT: 'KeyD',
    A: 'KeyK',
    B: 'KeyJ',
    SELECT: 'Digit2',
    START: 'Digit1'
}
p2 = {
    UP: 'ArrowUp',
    DOWN: 'ArrowDown',
    LEFT: 'ArrowLeft',
    RIGHT: 'ArrowRight',
    A: 'Numpad2',
    B: 'Numpad1'
}
```

### 事件

| events                                       | Description        |
| -------------------------------------------- | ------------------ |
| `@fps -> function(fps: number)`              | 每秒触发一次       |
| `@success -> function()`                     | rom加载成功时触发  |
| `@error -> funciont({code, message})`   | rom读取错误时触发  |
| `@saved ->  function({id, message, target})` | 游戏保存后触发     |
| `@loaded -> function({id, message, target})` | 读取游戏存档后触发 |

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

### 方法

| Methods                           |
| --------------------------------- |
| `gameStart(url?: string) => void` |
| `gameReset() => void`             |
| `gameStop() => void`              |
| `save(id: string) => void`        |
| `load(id: string) => void`        |

**注意**：只有在游戏运行时才能进行保存、读取操作，读取游戏还需要确保运行的游戏与读取的游戏是一致的。

> 默认情况下，存档是保存在 indexedDB，你可以设置storage属性让其保存在localStorage。
>
> 根据不同的浏览器localStorage能保存**2 MB**至**10 MB** 的数据，每个游戏的保存数据大约在**0.5MB** 至 **2MB**不等。
>
> 如果你需要保存较多的数据，建议你使用默认的 indexedDB。

```vue
<template>
    <nes-vue ref="nes" url="example.com/xxx.nes" />
	<div @click="save">Save</div>
	<div @click="load">Load</div>
</template>
<script setup>
import { ref } from 'vue'
    
cosnt nes = ref(null)
const id = 'example'

// 保存游戏
function save(){
	if(nes.value){
		nes.value.save(id)
	}
}
    
// 读取游戏
function load(){
	if(nes.value){
        nes.value.load(id)
    }
}
</script>
```

