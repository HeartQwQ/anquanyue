<script>
import service from "./utils/request"

export default {
  data() {
    return {
      token: "",
      QRCode: null,
      loading: true,
      loginData: null
    }
  },
  async created() {
    const { data } = await this.getQRCode("123456")
    console.log('刷新二维码', data);
    this.QRCode = "data:image/jpeg;base64," + data.QRCode
    this.token = data.token
    this.loading = false
    const id = setInterval(async () => {
      if (this.token) {
        this.loginData = await this.login(this.token)
        console.log('loginData', this.loginData);
        if (this.loginData.code === 0) {
          console.log('跳出循环');
          clearInterval(id)
        } else if (this.loginData.code !== 0 && this.loginData.msg == "请扫码") {
          console.log('继续循环');
        }
        else {
          console.log('退出循环，并返回失败');
          clearInterval(id)
        }
      } else {
        alert("获取验证码失败，请刷新页面重试")
      }
    }, 5000)
  },
  methods: {
    async getQRCode() {
      const query = window.location.href.split("/")[3]
      return await service.get("/getQRCode?agents=" + query)
    },
    async getLogin(token) {
      return await service.get("/login?token=" + token)
    },
    login() {
      return this.getLogin(this.token)
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
