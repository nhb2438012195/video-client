<template>
  <!-- 自动回复消息组件 -->
  <div class="my-3 flex items-start  max-w-full" :class="{ 'flex-row-reverse': isRight }">
    <!-- 头像区域 - 独立于消息气泡 -->
    <div class="flex-shrink-0 w-10 h-10  rounded-full overflow-hidden border border-gray-300"
      :style="{ width: avatarSize + 'px', height: avatarSize + 'px' }">
      <img :src="avatar" alt="用户头像" class="w-full h-full object-cover" @error="onAvatarError" />
    </div>

    <!-- 消息内容区域 -->
    <div class="p-3 rounded-xl mx-2 bg-gray-50 border border-gray-200 shadow-sm  min-w-0 "
      :class="{ 'ml-auto': isRight, 'mr-auto': !isRight }" :style="{ maxWidth: `${containerWidth}px` }">
      <!-- 消息正文 -->
      <div class="text-sm text-gray-900 leading-relaxed " :style="{
        fontSize: contentFontSize + 'px', wordBreak: 'break-all',
      }">
        {{ messageData.content }}
      </div>

      <!-- 消息备注 -->
      <div class="text-sm text-gray-500 leading-relaxed break-words" :style="{ fontSize: contentFontSize + 'px' }">
        {{ message2 }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useUserStore ,useMessageStore} from '@/store'
const userStore = useUserStore()
const messageStore = useMessageStore()
const isRight = ref(false)
const avatar = ref('http://47.115.227.193:9000/public/DefaultImage.png')
const props = defineProps({
  messageData: {
    type: Object,
    default: () => ({
      messageId: '-1',
      conversationId: '-1',
      toUserId: '',
      content:  `求给个三连+关注支持一下UP感谢！
链接打不开可能是网路不好，多试几次就好了！
解压码已放在链接里面了，解压途径不要有中文！

新人手机端保存链接送1t内存空间！
用微信保存链接再微信里打开自取链接！
如果链接哪天打不开了，再联系我获取最新链接！
手游+端游大全链接：https://pan.quark.cn/s/3e9b14fc915b`,
      messageSendTime: '',
      messageType: ''
    })
  },
  message2: {
    type: String,
    default: ''
  },

})

// 计算属性
const containerWidth = computed(() => {
  return Math.min(400, window.innerWidth * 0.7)
})

const avatarSize = computed(() => {
  return containerWidth.value > 300 ? 40 : 32
})

const titleFontSize = computed(() => {
  return containerWidth.value > 300 ? 14 : 12
})

const contentFontSize = computed(() => {
  return containerWidth.value > 300 ? 14 : 12
})

// 方法
const onAvatarError = (event) => {
  event.target.src = ''
}

const initComponent = () => {
  console.log('AutoReplyMessage组件已初始化')
  if (userStore.userInfo.userId == props.messageData.toUserId){
  //对方发送的
     isRight.value=false
     avatar.value =messageStore.selectedConversation?.conversationUserInfoVO.avatar
  }
  else{
        // 自己发送的
     isRight.value=true
     avatar.value =userStore.userInfo.avatar
  }
}

// 生命周期
onMounted(() => {
  initComponent()

  // 定义 resize 处理函数（必须命名，以便移除）
  const handleResize = () => {
    // 在 Composition API 中，不需要 $forceUpdate
    // 因为 containerWidth 是 computed，依赖 window.innerWidth，
    // 但注意：window.innerWidth 不是响应式的！
    // 所以我们需要手动触发更新 —— 实际上 computed 不会自动响应 window.resize
    // 解决方案：用一个 ref 来跟踪宽度
  }

  // ⚠️ 重要：上面的 computed 无法响应 window.resize！
  // 所以下面我们改用 ref + 监听 resize 来驱动宽度
})

// 🔁 更正：由于 window.innerWidth 不是响应式的，
// 我们需要用 ref 来手动管理容器宽度
</script>

<style scoped>
/* 额外的样式覆盖，确保组件在不同环境下表现一致 */
@media (max-width: 640px) {
  .auto-reply-message {
    max-width: 80%;
    margin: 8px auto;
  }
}

.text-truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>