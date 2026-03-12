import request from '@/utils/request'
//登录
export function getConversationList(params){
  return request({
    url: '/message/conversation/list',
    method: 'get',
    params 
  })
}

export function getChatMessagePage(params){
  return request({
    url: '/message/getChatMessagePage',
    method: 'get',
    params
  })
}