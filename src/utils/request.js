import axios from 'axios'

// 创建一个 axios 实例
const service = axios.create({
  baseURL: "/api",
  timeout: 5000, // 请求超时时间毫秒
})

// 添加请求拦截器
service.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    // console.log("请求成功", config)
    return config
  },
  function (error) {
    // 对请求错误做些什么
    console.log(error)
    return Promise.reject(error)
  }
)

// 添加响应拦截器
service.interceptors.response.use(
  function (response) {
    // console.log("响应成功", response)
    return response.data
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    console.log(error)
    return Promise.reject(error)
  }
)

export default service