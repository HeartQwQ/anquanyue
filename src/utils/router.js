import { createRouter, createWebHistory } from 'vue-router'
import app from '../App.vue'

//路由数组
const routes = [
  {
    path: "/",
    component: app,
  },
  {
    path: "/admin-test",
    component: app,
  }
]

//路由对象
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes //上面的路由数组
})

//导出路由对象，在main.js中引用
export default router