# 金手指

v1.8.0开始，nes-vue支持金手指功能。

## 使用

金手指格式为`xxxx-yz-vv`，例如`079F-01-01`：

```vue
<script setup>
import { NesVue } from 'nes-vue'
import { ref } from 'vue'

const nes = ref()

function injectCheat() {
    // 开启金手指
    nes.value.cheatCode('079F-01-01')
}

function cancelCheat() {
    // 关闭金手指
    nes.value.cancelCheatCode('079F-01-01')
}

function cancelAll() {
    // 关闭所有金手指
    nes.value.cancelCheatCodeAll()
}
</script>

<template>
  <nes-vue
    ref="nes"
    url="https://taiyuuki.github.io/nes-vue/Super Mario Bros (JU).nes"
  />
  <button @click="injectCheat">Enable cheat code</button>
  <button @click="cancelCheat">Disable Cheat Code</button>
  <button @click="cancelAll">Disable All</button>
</template>
```

## 金手指格式说明

nes-vue采用的是兼容`VirtuaNES`的金手指格式，例如`079F-01-01`，其中`079F`表示内存地址，中间`01`的`0`表示修改类型，中间`01`的`1`表示数值长度，右侧的`01`表示数值。

修改类型取值范围是：0-3，其中`0`表示始终修改，`1`表示只修改一次，`2`表示保证值不大于，`3`表示保证值不小于。

更详细的信息请自行查阅`VirtuaNES`的金手指相关内容。