<template>
  <!-- 消息通知组件 - 完全独立的Vue3组件 -->
  <div 
    class="text-base flex justify-center items-center space-x-2 cursor-pointer transition-all duration-200 hover:bg-gray-50 rounded-lg p-2"
    @click="handleClick"
    :class="{ 'opacity-80': disabled }"
  >
    <!-- 点状指示器 -->
     <slot name="icon">
    <div 
      class="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0"
      :class="{ 'bg-gray-400': disabled }"
    ></div>
    </slot>
    <!-- 主要文本内容  -->
    <span 
      class=" font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200"
      :class="{ 'text-gray-400': disabled }"
    >
      {{ text }}
    </span>
    
    <!-- 消息数量徽章 -->
    <div 
      v-if="messageCount > 0" 
      class="ml-1 flex items-center justify-center text-xs font-bold text-white bg-pink-500 rounded-full w-6 h-6"
      :class="{ 'bg-red-500': messageCount > 99 }"
    >
      {{ messageCount > 99 ? '99+' : messageCount }}
    </div>
  </div>
</template>

<script>
/**
 * 消息通知组件 - 显示消息提醒和数量
 * 功能：展示消息标题和未读数量，支持点击事件
 * 特性：
 * - 完全独立，不依赖父组件逻辑
 * - 使用TailwindCSS和Element Plus
 * - 自适应布局，响应式设计
 * - 美观的UI设计，包含悬停效果
 */
export default {
  name: 'MessageNotification',
  /**
   * 组件属性说明
   * @prop {Number} messageCount - 消息数量，默认为0
   * @prop {Boolean} disabled - 是否禁用状态，默认false
   * @prop {String} title - 标题文字，默认"我的消息"
   * @prop {Function} onClick - 点击事件回调函数
   */
  props: {
    text: {
      type: String,
      default: '我的消息'
    },
    messageCount: {
      type: Number,
      default: 0
    },
    disabled: {
      type: Boolean,
      default: false
    },
    onClick: {
      type: Function,
      default: null
    }
  },
  /**
   * 计算属性
   * @computed displayCount - 显示的数字，超过99显示99+
   */
  computed: {
    displayCount() {
      return this.messageCount > 99 ? '99+' : this.messageCount;
    }
  },
  /**
   * 生命周期钩子
   * mounted: 组件挂载完成后执行
   */
  mounted() {
    // 初始化时可以添加一些额外逻辑
    console.log('MessageNotification component mounted');
  },
  /**
   * 方法集合
   * @method handleClick - 处理点击事件
   */
  methods: {
    /**
     * 处理点击事件
     * @param {Event} event - 点击事件对象
     */
    handleClick(event) {
      // 如果组件被禁用，则阻止点击事件
      if (this.disabled) {
        return;
      }
      
      // 触发父组件的点击事件（如果定义了）
      if (typeof this.onClick === 'function') {
        this.onClick(event);
      }
      
      // 可以在这里添加其他逻辑，比如标记消息已读等
      console.log('Message notification clicked:', this.messageCount);
    }
  }
}
</script>

<style scoped>
/* 自定义样式 - 全局样式已通过TailwindCSS处理 */
.message-notification {
  /* 添加额外的过渡效果 */
  transition: all 0.2s ease;
}

/* 响应式断点调整 */
@media (max-width: 768px) {
  .message-notification {
    font-size: 0.8rem;
    padding: 0.5rem;
  }
  
  .message-notification .el-icon {
    font-size: 0.8rem;
  }
}

@media (min-width: 1024px) {
  .message-notification {
    padding: 0.75rem;
  }
}

/* 悬停状态样式 */
.message-notification:hover {
  transform: translateY(-1px);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
</style>