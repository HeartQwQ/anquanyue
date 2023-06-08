import { createRouter, createWebHistory } from 'vue-router'
import index from '../index.vue'
// import home from '../home.vue'

//路由数组
const routes = [
  {
    path: "/",
    component: index,
  },
  // {
  //   path: "/admin-test",
  //   component: home,
  // }
]

//路由对象
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes //上面的路由数组
})

//导出路由对象，在main.js中引用
export default router