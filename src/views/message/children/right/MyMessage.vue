<template>
  <div class="flex-1 flex flex-col p-4">
    <div class="h-[48px]">
      <div
        class="w-full h-full bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-md"
        :style="{ width: '100%', height: '100%' }">
        <!-- 头部区域：包含标题和辅助信息 -->
        <div
          class="h-full flex items-center justify-between px-4  bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
          <!-- 左侧标题 -->
          <div class="text-gray-800 font-medium text-sm md:text-base">
            我的消息
          </div>
        </div>
      </div>
    </div>
    <div class="flex-1 mt-2 overflow-y-auto">
      <MessageConversation />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import MessageConversation from './MessageConversation/MessageConversation.vue'

// 定义 props（带类型和默认值）
const props = defineProps({
  /**
   * 消息数据列表（可选）
   * @type {Object[]}
   */
  messages: {
    type: Array,
    default: () => []
  },
  /**
   * 加载状态（可选）
   * @type {Boolean}
   */
  loading: {
    type: Boolean,
    default: false
  },
  /**
   * 标题文字（可选）
   * @type {String}
   */
  title: {
    type: String,
    default: '我的消息'
  }
})

// 计算属性：判断是否有消息
const hasMessages = computed(() => {
  return props.messages && props.messages.length > 0
})

// 生命周期钩子：组件挂载完成
onMounted(() => {
  console.log('MessageComponent mounted')
})

// 方法：刷新消息列表
function refreshMessages() {
  console.log('Refreshing messages...')
}
</script>

<style scoped>
/* 自定义样式 - 全局样式已通过TailwindCSS处理 */
.message-container {
  /* 添加额外的过渡效果 */
  transition: all 0.3s ease;
}

/* 响应式断点调整 */
@media (max-width: 768px) {
  .message-container {
    padding: 12px;
  }

  .el-icon {
    font-size: 10px;
  }
}

@media (min-width: 1024px) {
  .message-container {
    border-radius: 8px;
  }
}
</style>