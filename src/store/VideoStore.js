import { defineStore } from 'pinia'
import { setCookie, getCookie, removeCookie } from '@/utils/cookies'
import { postUploadVideo } from '@/api/video'
export const useVideoStore = defineStore('video', {
    state: () => ({

    }),
    actions: {
       uploadVideo(video) {
            const data = new FormData()
            data.append('video', video)
            return postUploadVideo(data)
        }
    },
    getters: {
    },
})