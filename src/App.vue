<script>
import service from "./utils/request"

export default {
  data() {
    return {
      QRCode: null,
      isQRCode: false,
      loading: false,
      timeoutID: null
    }
  },
  methods: {
    async getData() {
      return await service.get("https://mock.apifox.cn/m1/2812188-0-default/getQRCode?agents=test")
    },
    async clickRequest() {
      this.isQRCode = false
      this.loading = true
      setTimeout(async () => {
        clearTimeout(this.timeoutID);
        const { data } = await this.getData()
        this.QRCode = "data:image/jpeg;base64," + data.QRCode
        console.log('刷新二维码', data);
        this.isQRCode = true
        this.loading = false
        this.timeoutID = setTimeout(async () => {
          const { data } = await this.getData()
          this.QRCode = "data:image/jpeg;base64," + data.QRCode
          console.log('定时刷新', data);
        }, 3000)
      }, 1000)
    }
  }
}
</script>

<template>
  <div class="container flex flex-col justify-around text-center p-5 text-xl max-sm:text-base">
    <h1 class="font-black text-7xl max-sm:text-4xl text-sky-400">安全生产月</h1>
    <div class="space-y-2">
      <button
        class="mb-8 max-sm:mb-4 w-40 h-14 bg-sky-400 text-white text-lg rounded-md max-sm:w-28 max-sm:h-12 max-sm:text-sm font-black hover:bg-sky-300"
        @click="clickRequest">刷新二维码</button>
      <div class="flex flex-col justify-center w-80 h-80 max-sm:w-60 max-sm:h-60 m-auto border rounded border-black">
        <img v-if="loading" src="./img/loading.jfif" alt="">
        <p class="font-black text-2xl max-sm:text-lg" v-if="!loading && !isQRCode">点击按钮获取最新二维码</p>
        <img v-if="isQRCode" :src="QRCode" alt="">
      </div>
      <p>扫码登录</p>
      <p class="font-black">扫码时请勿关闭本页面</p>
    </div>
    <div class="space-y-2">
      <p class="text-sky-400 font-black">免去答题搜题的烦恼</p>
      <p>每天定时帮您完成答题，让您宝贵的时间效率最大化</p>
      <p>客服：770550590</p>
    </div>
  </div>
</template>

<style>
.container {
  height: 100dvh;
}

img {
  width: 100%;
  height: 100%;
}
</style>
