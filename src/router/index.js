import { createRouter, createWebHistory } from 'vue-router'
const index = () => import('@/views/index/index.vue')
const videoPlay = () => import('@/views/videoPlay/VideoPlay.vue')
const message = () => import('@/views/message/Message.vue')
const MyMessage = () => import('@/views/message/children/right/MyMessage.vue')
const conversation = () => import('@/views/message/children/right/MessageConversation/children/ConversationPanel.vue')
const routes = [
  {
    path: '/',
    name: 'index',
    component: index,
  },
  {
    path: '/videoPlay/:id',
    name: 'videoPlay',
    component: videoPlay,
  },
  {
    path: '/message',
    name: 'message',
    component: message,
    children: [
      {
        path: "MyMessage",
        name: "MyMessage",
        component: MyMessage,
        children: [
          {
            path: ":conversationId",
            name: "conversation",
            component: conversation
          }
        ]
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
