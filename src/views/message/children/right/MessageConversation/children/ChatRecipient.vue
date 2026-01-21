<template>
  <div class="w-full h-[78px] min-w-[240px]">
    <div
      class="w-full h-full  shadow-sm border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-md cursor-pointer"
      @click="handleClick"
      :class="messageStore.chatConversation == recipientData.conversationId ? 'bg-blue-100' : 'bg-white'">
      <div class="flex items-center p-3 space-x-3">
        <!-- 头像区域 -->
        <div class="relative flex-shrink-0">
          <img :src="recipientData.conversationUserInfoVO.avatar" alt="用户头像"
            class="w-10 h-10 rounded-full object-cover border-2 border-gray-100"
            :class="{ 'border-blue-500': isHighlighted }" />
          <div v-if="isOnline"
            class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
        </div>

        <!-- 内容区域 -->
        <div class="flex-1 min-w-0">
          <div class="flex items-center space-x-1">
            <span class="text-sm font-medium text-gray-800 truncate">{{ recipientData.conversationUserInfoVO.name
              }}</span>
            <span v-if="isVip" class="text-xs text-yellow-500 font-bold">VIP</span>
          </div>
          <div class="text-sm text-gray-600 mt-1 truncate">
            {{ recipientData.lastMessageContent }}
          </div>
        </div>

        <!-- 时间戳 -->
        <div v-if="showTime" class="text-xs text-gray-400 whitespace-nowrap">
          {{}}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useMessageStore } from '@/store';
import { computed, onMounted, inject } from 'vue';
import { useRouter } from 'vue-router'

const router = useRouter()
const scrollToBottom = inject('scrollToBottom');
// ✅ 在 setup 中正确获取 Pinia store
const messageStore = useMessageStore();

// 定义 props（与原组件一致）
const props = defineProps({
  recipientData: {
    type: Object,
    default: () => ({
      conversationId: '-1',
      recipientUserId: '-1',
      lastMessageContent: "[自动回复]求给个三连+关ddddddddddddddddddd",
      lastMessageTime: "",
      isUnread: "",
      messageVOList: [],
      conversationUserInfoVO: {
        name: "123456",
        avatar: 'http://120.26.137.2:9000/public/DefaultImage.png'
      },
    })
  },

  isOnline: {
    type: Boolean,
    default: true
  },
  isVip: {
    type: Boolean,
    default: false
  },
  isHighlighted: {
    type: Boolean,
    default: false
  },
  time: {
    type: String,
    default: () => new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
  },
  showTime: {
    type: Boolean,
    default: true
  },
  onClick: {
    type: Function,
    default: null
  }
});

// 计算属性：displayName（虽然模板没用，但保留逻辑）
const displayName = computed(() => {
  return props.isVip ? `${props.username} VIP` : props.username;
});

// 挂载钩子
onMounted(() => {
  console.log('GameBenefitMessage component mounted');
});

// 方法：点击处理
const handleClick = (event) => {
  //  正确更新 store
  messageStore.setChatConversation(props.recipientData.conversationId)
  router.push({
    name: 'conversation',
    params: {
      conversationId: props.recipientData.conversationId
    }
  })
  //scrollToBottom()
};

// 工具方法（如果其他地方要用，可导出；否则可删）
const formatTime = (timestamp) => {
  if (!timestamp) return '';
  const date = new Date(timestamp);
  return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
};
</script>

<style scoped>
/* 自定义样式 - 全局样式已通过TailwindCSS处理 */
.game-benefit-message {
  /* 添加额外的过渡效果 */
  transition: all 0.3s ease;
}

/* 响应式断点调整 */
@media (max-width: 768px) {
  .game-benefit-message {
    padding: 0.75rem;
  }

  .game-benefit-message .el-icon {
    font-size: 0.8rem;
  }
}

@media (min-width: 1024px) {
  .game-benefit-message {
    padding: 1rem;
  }
}

/* 悬停状态样式 */
.game-benefit-message:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* 高亮状态样式 */
.game-benefit-message[data-highlighted="true"] {
  border-color: #3b82f6 !important;
  background-color: #f8fafc;
}

/* VIP用户特殊样式 */
.game-benefit-message .vip-badge {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.05);
  }

  100% {
    transform: scale(1);
  }
}
</style>