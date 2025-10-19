import request from '@/utils/request'
//登录
export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}
export function register(data){
    return request({
        url:'/register',
        method:'post',
        data
    })
}
export function getUserInfo(){
  return request({
    url:'/userInfo',
    method:'get'
  })
}