<script>
import service from "./utils/request"

export default {
  data() {
    return {
      QRCode: null,
      isOne: false,
      loading: false,
      timeoutID: null
    }
  },
  methods: {
    async getData() {
      return await service.get("https://mock.apifox.cn/m1/2812188-0-default/getQRCode?agents=test")
    },
    async clickRequest() {
      this.isOne = true
      this.QRCode = null
      this.loading = true
      setTimeout(async () => {
        clearTimeout(this.timeoutID);
        const { data } = await this.getData()
        this.QRCode = "data:image/jpeg;base64," + data.QRCode
        console.log('刷新二维码', data);
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
  <div
    class="container h-screen flex flex-col justify-around text-center p-10 text-xl max-sm:text-base antialiased tracking-widest align-middle font-sans">
    <h1 class="font-black text-7xl max-sm:text-4xl text-rose-400">安全生产月</h1>
    <div class="space-y-2">
      <button
        class="mb-8 max-sm:mb-4 bg-rose-400 text-white font-black rounded-md hover:bg-rose-300 py-3 px-5 shadow-lg shadow-rose-500/50"
        @click="clickRequest">刷新二维码</button>
      <div v-if="isOne" class="space-y-2">
        <div class="flex flex-col justify-center w-80 h-80 max-sm:w-52 max-sm:h-52 m-auto border-2 rounded border-black">
          <img v-if="loading" src="./img/loading.jfif" alt="">
          <img v-if="QRCode" :src="QRCode" alt="">
        </div>
        <p>扫码登录</p>
        <p class="font-black text-xl">扫码时请勿关闭本页面</p>
      </div>
    </div>
    <div class="space-y-2">
      <p class="text-rose-400 font-black text-lg">免去答题搜题的烦恼</p>
      <p>每天定时帮您完成答题</p>
      <p>客服：770550590</p>
    </div>
  </div>
</template>

<style>
.container {
  background-image: linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%);
  text-shadow: 0px 0px 2px #000;
}

.text-rose-400 {
  text-shadow: 0px 0px 2px #f6798b;
}

img {
  width: 100%;
  height: 100%;
}
</style>
