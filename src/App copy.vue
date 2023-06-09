<script>
import service from "./utils/request"

export default {
  data() {
    return {
      token: "",
      QRCode: null,
      loading: true,
      loginData: null,
      isDisabled: false
    }
  },
  async created() {
    // const { data } = await this.getQRCode()
    // console.log('刷新二维码', data);
    // this.QRCode = "data:image/jpeg;base64," + data.QRCode
    // this.token = data.token
    // this.loading = false
    const id = setInterval(async () => {
      if (this.token) {
        this.loginData = await this.login(this.token)
        if (this.loginData.code === 0) {
          console.log('code=0');
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
        console.log('请刷新验证码');
      }
    }, 5000)
  },
  // disabled
  methods: {
    async getQRCode() {
      return await service.get("/getQRCode?agents=admin-test")
    },
    async getLogin(token) {
      return await service.get("/login?token=" + token)
    },
    login() {
      return this.getLogin(this.token)
    },
    async clickRequest() {
      const { data } = await this.getQRCode()
      this.QRCode = "data:image/jpeg;base64," + data.QRCode
      this.token = data.token
      this.loading = false
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
        <button
          class="mb-8 max-sm:mb-4 bg-sky-400 text-white font-black rounded-md hover:bg-sky-300 py-3 px-5 shadow-sm shadow-sky-500/50"
          @click="clickRequest" ref="btn">刷新二维码</button>
        <div class="flex flex-col justify-center w-80 h-80 max-sm:w-52 max-sm:h-52 m-auto border-2 rounded border-black">
          <img v-if="loading" src="./img/loading.jfif" alt="">
          <img v-if="QRCode" :src="QRCode" alt="">
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
