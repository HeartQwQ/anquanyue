<script>
import { getQRCode, getLogin } from './api/api'

export default {
  data() {
    return {
      QRCode: "",
      token: "",
      loading: true,
      loginData: ""
    }
  },
  async created() {
    const { data } = await getQRCode("?" + window.location.href.split('?')[1])
    console.log(data)
    this.QRCode = data.QRCode
    this.token = data.token
    if (this.QRCode) this.loading = false
    if (this.token) this.polling(5000)
  },
  methods: {
    polling(time) {
      const id = setInterval(async () => {
        if (this.token) {
          this.loginData = await getLogin(this.token)
          if (this.loginData.code === 0) {
            console.log('code = 0');
            clearInterval(id)
          } else if (this.loginData.code !== 0 && this.loginData.msg == "请扫码") {
            console.log('请扫码');
          }
          else {
            console.log('扫码超时');
            this.loading = true
            clearInterval(id)
          }
        } else {
          console.log('无参数');
        }
      }, time)
    }
  }
}
</script>

<template>
  <div
    class="container h-screen flex flex-col justify-around text-center p-10 text-xl max-sm:text-base antialiased tracking-widest align-middle font-sans">
    <h1 class="font-black text-7xl max-sm:text-4xl text-sky-400">安全生产月</h1>
    <div class="space-y-2">
      <div class="space-y-2">
        <div class="flex flex-col justify-center w-80 h-80 max-sm:w-52 max-sm:h-52 m-auto border-2 rounded border-black">
          <img v-if="loading" src="./img/loading.jfif" alt="">
          <img v-else :src="'data:image/jpeg;base64,' + QRCode" alt="">
        </div>
        <p>扫码登录</p>
        <p class="font-black text-xl">扫码时请勿关闭本页面</p>
      </div>
    </div>
    <div class="space-y-2">
      <p class="text-sky-400 font-black text-lg">免去答题搜题的烦恼</p>
      <p>每天定时帮您完成答题</p>
      <p>客服：770550590</p>
    </div>
  </div>
</template>

<style>
.container {
  background-image: linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%);
}

h1 {
  text-shadow: 2px 2px 3px #68d0fd;
}

img {
  width: 100%;
  height: 100%;
}
</style>
