import request from '@/utils/request'
export function getRecommendedVideoInfo(params) {
  return request({
    url: '/video/recommendedVideoInfo',
    method: 'get',
    params
  })
}
export function postUploadVideo(data){
  return request({
    url: '/video/upload',
    method: 'post',
    data
  })
}
export function postChunkUploadVideo(data){
  return request({
    url: '/video/chunkUpload',
    method: 'post',
    data
  })
}
export function postInitChunkUpload(data){
  return request({
    url: '/video/initChunkUpload',
    method: 'post',
    data
  })
}