<template>
  <router-view></router-view>
  <div
    class="container h-screen flex flex-col justify-around text-center p-10 text-xl max-sm:text-base antialiased tracking-widest align-middle font-sans">
    <h1 class="font-black text-7xl max-sm:text-4xl text-sky-400">安全生产月</h1>
    <div class="space-y-2">
      <div class="space-y-2">
        <div class="flex flex-col justify-center w-80 h-80 max-sm:w-52 max-sm:h-52 m-auto border-2 rounded border-black">
          <img src="./img/loading.jfif" alt="">
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
