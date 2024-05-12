<h1 align="center">nes-vue</h1>

<p align="center">
用于 Vue 3 的 NES (FC)🎮 游戏模拟器组件。
</p>


<p align="center">
<a href="https://www.npmjs.com/package/nes-vue"><img alt="GitHub package.json version" src="https://img.shields.io/npm/v/nes-vue?color=green&logo=npm"></a>
</p>

## 🚀游乐场

[Vue SFC Playgournd](https://play.vuejs.org/#eNqtV9lu2zgU/RWOX+wAtpw0LVB40k7SQTuYImmDLH2J8iBLlMVEIjUi5dgI/O9zuEmy46xoH1zxrueuZO57R2UZzGvam/QOZFyxUhFJVV1+DjkrSlEpck8qmg5JLIqyVjQhK5JWoiB9KPU7Qj+o/FXThsupHFmJkMeCS0VmUUGPGT4+kauQExL2MqVKORmPVcSWdX3LghlTWT0NmBg79fF5XdKKnEQVE+RLJSQZfL/cCcANe8O3G9l/rYUTNsvUknxjPMrxiwMZXJ4fvRrJCVOyLihyQS6EqGqEE5URd3ZCfu2TlRbvurkyPy/0kUVlucwpHUkddqGjniLo4V1UlTQJYNkhJmRX/3dtDq/xkIsqUaIYwnY9xEcZjWQx3R9pD3LNwWjvbR4WrBTz/VFh0p7qrKf683eAv1kOI/YfW4oa5k01ZpHStdhivFMQ3b2XZ8coCKZh4Hv5avd6x0vAgePyOs8bssx1FR+QEyajaU4dS1U1bVhMnka1xKRZXhrlsmWWmnUcTWkOtp/JwWCHfPrcKAbzKMco/kX6p3m07JMJPjSjDyshT2seKyY4SamKs2/FOyjf63CbzoNl139XPtCA8YQufqYDhGPN298dJIjo0B0ResjSIAj0F9zpXAYqo9xBNI70Pxe/gwqHOkrNXEFrtYazothI/wCIB9q6M6yB8bMRfMeiiqTOA+OzTd66H6lEud2N5lgvm7B14R7YoTmN1ZkovCHXO43SRg4ft/ssdluyVmijZRpIJdgXR+cPI0OVtKoNbouzrfEhG48ZO28y9eZ6dGFrC94PS8lg3ahjdCHoQK3/FaGwuUXC2jQiW3H+sU4xqA7G9m7ErYiDogX8KIoTIQcJm5M4j6T8FPamYhH2DBkMt3F8x6MwkHCL3pImdZWD5vqjQ79jicrA+bCHldRQM6qXIMjvP+625ENZxzE17v1Ee+bYIhwD4hasigOKB2ubdh0r+rR1wwESNFzuLc2bWhM8jLOIz7RsMwie6ZzBnSh1gf2RkPkoFZU1Txhv3gqtVYRvyrEJAfRbutykNo4Iucf7RRTYFChZTAd9fdX2h6Tf32lpL7g2rApZmZ4xIYxtDD6BYxutP05rpdDBh3HO4lsNzy+xJuWEnGmaV7cKj6n73dTR1qP2MmXT8mEPg4t3Ac6muybvKRJGJm7zJKC7z44PJK9z4fjgn/Vnt82z1vUWIBAkv1hCxcsTYW3PRzITdyC1+2QjO0/a9lNxMO6MM44mSfgMMMt2e5RCMl3pCcYCcmxO/3QrWwc6Qb/mjNPRNBfxLThmiQV6uqw6XkkzxkfAMyEfyoWVwGOFWzBDd18MYQeX+ZpOpefdaHmz+jVhJGwNyd7urjeJDnTQe8OefZaPiqgMbqTgeN0brdAxMPgTvxrNTjKLCrT2CRUnHKoJzdm8wsyoMS8LPw2He8HHYA8JlCBbUoAFe+NWG8CsgEFJXE94t20g0I8WltPqpxmfdSRRnou774ambx73GINORuPbLfQbiX2rUZ/q+armiKHhKeQQ42XYX89/0AW+G2Yhklr34hNMTKfIa7OmjNiXmieA3ZEzaP81CUXzXcivC0W59EH5K3zl/jxAkv5+IvQW7n6w32Rx9T8laIlV)

[NES Vue Playground](https://taiyuuki.github.io/nes-vue)

## 功能

- [x] 支持双人
- [x] 支持手柄
- [x] 支持连发键
- [x] 支持保存、读取
- [x] 支持回放TAS录像（*.fm2文件）
- [x] 支持金手指（作弊码）

## 使用

### 安装

```shell
npm install nes-vue --save
```

然后:

```vue
<script setup>
  import { NesVue } from 'nes-vue';
</script>
<template>
  <nes-vue
    url="https://taiyuuki.github.io/nes-vue/Super Mario Bros (JU).nes"
  />
</template>
```

更多组件API请查看 [文档](https://nes-vue-docs.netlify.app/zh/)