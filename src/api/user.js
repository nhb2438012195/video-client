import request from '@/utils/request'
//登录
export function postLogin(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data,
    headers: {
      'Content-Type': undefined // 👈 关键！让浏览器自动设置 multipart/form-data + boundary
    }
  })
}
export function postRegister(data){
    return request({
        url:'/user/register',
        method:'post',
        data
    })
}
export function getUserInfo(){
  return request({
    url:'/user/userInfo',
    method:'get'
  })
}