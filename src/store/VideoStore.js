import { defineStore } from 'pinia'
import { setCookie, getCookie, removeCookie } from '@/utils/cookies'
import { postUploadVideo, postChunkUploadVideo, postInitChunkUpload } from '@/api/video'
export const useVideoStore = defineStore('video', {
    state: () => ({
        uploadKey: null,
    }),
    actions: {
        uploadVideo(video) {
            const data = new FormData()
            data.append('video', video)
            return postUploadVideo(data)
        },
        chunkUploadVideo(video) {
            return postChunkUploadVideo(video)
        },
        async initChunkUpload(data) {
            try {
                const res = await postInitChunkUpload(data)
                // 显式校验后端返回
                if (!res?.data?.uploadKey) {
                    throw new Error('后端响应缺少 uploadKey');
                }
                this.uploadKey = res.data.uploadKey
            }
            catch (error) {
                console.log("上传失败" + error)
                throw new Error('上传初始化失败', { cause: error });
            }
        }
    },
    getters: {
    },
})