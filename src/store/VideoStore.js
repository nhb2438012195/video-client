import { defineStore } from 'pinia'
import { setCookie, getCookie, removeCookie } from '@/utils/cookies'
import { postUploadVideo, postChunkUploadVideo, postInitChunkUpload, getVideoPlay } from '@/api/video'

export const useVideoStore = defineStore('video', {
    state: () => ({
        uploadKey: null,
        videoPlay: {},
        VideoDetails: {},
    }),
    actions: {

        async loadVideoPlayData(id) {
            if (!id) {
                this.videoPlay = null; // 无 ID 时清空，避免残留旧数据
                return;
            }
            
            this.isLoading = true;
            try {
                console.log(`正在加载视频 ${id}...`);
                // ✅ 等待异步请求完成，拿到实际数据
                const videoData = await getVideoPlay({videoPlayId: id});
                // ✅ 校验数据有效性，避免赋值 undefined/null
                this.videoPlay = videoData?.data || null;
            } catch (error) {
                // ✅ 错误处理，避免页面崩溃
                console.error(`加载视频 ${id} 失败：`, error);
                this.videoPlay = null; // 失败时清空
                throw error; // 抛出错误，让组件层可以捕获并提示用户
            } finally {
                this.isLoading = false; // 无论成败，结束加载状态
            }
        },
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