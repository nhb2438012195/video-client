import { createRouter, createWebHistory } from 'vue-router'
const index = () => import('@/views/index/index.vue')
const videoPlay = () => import('@/views/components/videoPlay/VideoPlay.vue')
const routes = [
    {
      path: '/',
      name: 'index',
      component: index,
    },
    {
      path:'/videoPlay/:id',
      name: 'videoPlay',
      component: videoPlay,
    }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
