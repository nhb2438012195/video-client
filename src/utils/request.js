// src/utils/request.js
import axios from 'axios'
//导入路由
import router from '@/router'
import Cookies from 'js-cookie';
// 创建 axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL, // 基础 API 地址
  timeout: 10000, // 请求超时时间
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 可以在这里添加 token、loading 等
    //从配置中获取token名称
    const token_name=process.env.VUE_APP_TOKEN_NAME
    const token = Cookies.get(token_name) || '没有token'
    if (token) {
      config.headers[token_name] = `${token}`
    }
    return config
  },
  (error) => {
    console.error('请求拦截错误:', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    // 根据后端返回的数据结构做统一处理
    const res = response.data
    // 假设后端约定 code 为 200 表示成功
    if (res.code !== 1) {
      // 处理业务错误
      console.error('业务错误:', res.msg || '请求失败')
      return Promise.reject(new Error(res.msg || '请求失败'))
    }
    return res
  },
  (error) => {
    // 处理 HTTP 错误，如 401、500 等
    if (error.response?.status === 401) {
      // 例如跳转到登录页
      localStorage.removeItem('token')
      //跳转到登录页面
      router.push({name: 'login'})
    }
    console.error('响应错误:', error.message)
    return Promise.reject(error)
  }
)

export default service