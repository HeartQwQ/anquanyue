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
  <div class="container">
    <div class="top">
      <h1>安全生产月</h1>
    </div>
    <div class="content">
      <button @click="clickRequest" ref="btn">刷新二维码</button>
      <div class="img">
        <img v-if="loading" style="width: 100%; height: 100%;" src="./img/loading.jfif" alt="">
        <p v-if="!loading && !isQRCode">点击按钮获取最新二维码</p>
        <img v-if="isQRCode" :src="QRCode" alt="">
      </div>
      <p style="margin: 10px 0;font-size: 20px;">扫码登录</p>
      <h2>扫码时请勿关闭本页面</h2>
    </div>
    <div class="footer">
      <p style="color: #38bdf8;font-size: 24px;">免去答题搜题的烦恼</p>
      <p style="margin: 12px 0;">每天定时帮您完成答题，让您宝贵的时间效率最大化</p>
      <p>客服：770550590</p>
    </div>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  font-size: 18px;
}

button {
  width: 150px;
  height: 60px;
  background: #38bdf8;
  border: 0;
  color: #fff;
  border-radius: 8px;
  font-size: 20px;
  font-weight: 800;
  cursor: pointer;
}

button:hover {
  background: #7dd3fc;
}

h1 {
  font-size: 58px;
  color: #0ea5e9;
}

h2 {
  font-size: 24px;
}

.img {
  margin: 30px auto 0;
  width: 300px;
  height: 300px;
  border: #000 solid 1px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

img {
  width: 100%;
  height: 100%;
}

.container {
  height: calc(100vh - 60px);
  width: 70vw;
  margin: 0 auto;
  padding: 30px 0;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
