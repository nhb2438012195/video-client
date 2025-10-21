import { defineStore } from 'pinia'
import { setCookie, getCookie, removeCookie } from '@/utils/cookies'

export const usePublicStore = defineStore('public', {
    state: () => ({
    }),
    actions: {
    },
    getters: {},
})