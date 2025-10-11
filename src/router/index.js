import { createRouter, createWebHistory } from 'vue-router'
const index = () => import('@/views/index/index.vue')
const routes = [
    {
      path: '/',
      name: 'index',
      component: index,
    },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
