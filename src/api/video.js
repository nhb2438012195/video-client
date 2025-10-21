import request from '@/utils/request'
export function getRecommendedVideoInfo(params) {
  return request({
    url: '/video/recommendedVideoInfo',
    method: 'get',
    params
  })
}