import { defineStore } from 'pinia'
import { setCookie, getCookie, removeCookie } from '@/utils/cookies'
export const useVideoCardStore = defineStore('videoCard', {
    state: () => ({
        isGenerateNewVideoCard: false,
        // 存放动态组件实例的数据（每个元素代表一个组件实例）
        DynamicVideoCard: []
    }),
    actions: {
        resetGenerateFlag() {
            this.isGenerateNewVideoCard = false
        },
    }
})