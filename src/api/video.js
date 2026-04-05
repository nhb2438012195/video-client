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

export function getVideoPlay(params) {
  return request({
    url: '/video/play',
    method: 'get',
    params 
  })
}
// 获取用户投稿视频信息
export function getUserVideoInfoPage(params){
  return request({
    url: '/video/user/video/info/page',
    method: 'get',
    params 
  })
}
// 获取用户投稿视频数量
export function getUserVideoNum(params){
  return request({
    url: '/video/user/video/num',
    method: 'get',
    params 
  })
}
// 给视频点赞或者取消点赞
export function likeVideo(params) {
  return request({
    url: '/video/video/like',
    method: 'post',
    data: params
  })
}

// 发送视频评论或者回复评论
export function commentVideo(params) {
  return request({
    url: '/video/video/comment',
    method: 'post',
    data: params
  })
}

// 给评论点赞或者取消点赞
export function likeComment(params) {
  return request({
    url: '/video/video/comment/action',
    method: 'post',
    data: params
  })
}

// 按照时间顺序分页获取视频评论
export function getVideoCommentByTime(params) {
  return request({
    url: '/video/video/comment/page/byTime',
    method: 'get',
    params
  })
}

//按照点赞数顺序分页获取视频评论
export function getVideoCommentByLike(params) {
  return request({
    url: '/video/video/comment/page/byLike',
    method: 'get',
    params
  })
}

// 删除视频评论
export function deleteVideoComment(commentId) {
  return request({
    url: `/video/video/comment/${commentId}`,
    method: 'delete'
  })
}

// 投稿，上传视频详情，并开始审核
export function submitVideoDetails(data) {
  return request({
    url: '/video/upload/video/details',
    method: 'post',
    data
  })
}
// 获取视频详情
export function getVideoDetailsByVideoPlayId(params) {
  return request({
    url: '/video/details/byVideoPlayId',
    method: 'get',
    params
  })
}