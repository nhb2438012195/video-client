import { defineStore } from 'pinia'
import { setCookie, getCookie, removeCookie } from '@/utils/cookies'
import { login, register, getUserInfo } from '@/api/user'
export const useUserStore = defineStore('user', {
  state: () => ({
    username: getCookie('userName') || '',
    name: '管理员',
    token: getCookie(process.env.VUE_APP_TOKEN_NAME || 'token') || '',
    showLogin: false,
    showUser: false,
    showNoLoginUser: false,
    isLogin: (getCookie(process.env.VUE_APP_TOKEN_NAME || 'token') || '') !== '',
    userInfo: {},
  }),
  actions: {
    async getUserInfo() {
      await getUserInfo()
        .then(res => {
          console.log('获取用户信息成功')
          this.userInfo = res.data
          console.log(this.userInfo)
        })
        .catch(err => {
          console.log('获取用户信息失败')
          console.log(err)
          removeCookie(process.env.VUE_APP_TOKEN_NAME || 'token')
          throw new Error(err)
        })
    },
    async login(data) {
      await login(data)
        .then(res => {
          console.log('登录成功')
          console.log(res)
          this.token = res.data.token
          setCookie('userName', res.data.username)
          setCookie(process.env.VUE_APP_TOKEN_NAME || 'token', res.data.token)
          this.isLogin = true
          return res
        })
        .catch(err => {
          console.log('登录失败')
          console.log(err)
          throw new Error(err)
        })
    }
    ,
    async register(data) {
      const response = await register(data)
        .then(res => {
          console.log('注册成功')
          console.log(res)
          return res
        })
        .catch(err => {
          console.log('注册失败')
          console.log(err)
          throw new Error(err)
        })
      console.log(response)
    },
    //   //退出登录
    //  async logout() {
    //     await logout()
    //     .then(() => {
    //       removeCookie(process.env.VUE_APP_TOKEN_NAME || 'token')
    //       removeCookie('name')
    //       removeCookie('userName')
    //     })
    //   }


    //数据修改方法


    setShowNoLoginUser(value) {
      if (this.token !== '') {
        // console.log('用户已登录，无法操作登录窗口')
        this.showNoLoginUser = false
        return
      }
      this.showNoLoginUser = value
    },
    setShowLogin(value) {
      if (this.token !== '') {
        // console.log('用户已登录，无法操作登录窗口')
        this.showLogin = false
        this.showUser = value
        return
      }
      this.showLogin = value
    },

  }
})