<!-- 登录提示卡片 -->
<template>
  <!-- 外层容器，允许父组件通过 class 控制位置和大小 -->
  <div
    :class="customClass"
    class="relative w-[359px] h-[235px] bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden flex flex-col justify-between p-[20px] transition-all duration-200 ease-in-out"
  >
    <!-- 标题区域 -->
    <div class="text-sm font-medium text-gray-800 mb-4">
      登录后你可以：
    </div>

    <!-- 功能列表 -->
    <div class="grid grid-cols-2 gap-4 mb-5">
      <!-- HD 免费看高清视频 -->
      <div class="flex items-center space-x-2 text-sm text-gray-700">
        <span class=" flex items-center justify-center bg-blue-100 text-blue-600 rounded text-xs font-bold">HD</span>
        <span>免费看高清视频</span>
      </div>

      <!-- 多端同步播放记录 -->
      <div class="flex items-center space-x-2 text-sm text-gray-700">
        <span class=" flex items-center justify-center bg-blue-10:0 text-blue-600 rounded">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </span>
        <span>多端同步播放记录</span>
      </div>

      <!-- 发表弹幕/评论 -->
      <div class="flex items-center space-x-2 text-sm text-gray-700">
        <span class=" flex items-center justify-center bg-blue-100 text-blue-600 rounded">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
            <path d="M14 3H6v2h8V3zm0 4H6v2h8V7zm0 4H6v2h8v-2zm0 4H6v2h8v-2zm0 4H6v2h8v-2zm-4 0h2v2h-2v-2zm-4-12v2h2V7H6zm0 4v2h2v-2H6zm0 4v2h2v-2H6zm0 4v2h2v-2H6zm0 4v2h2v-2H6z"/>
          </svg>
        </span>
        <span>发表弹幕/评论</span>
      </div>

      <!-- 热门番剧影视看不停 -->
      <div class="flex items-center space-x-2 text-sm text-gray-700">
        <span class=" flex items-center justify-center bg-blue-100 text-blue-600 rounded">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </span>
        <span>热门番剧影视看不停</span>
      </div>
    </div>

    <!-- 立即登录按钮 -->
    <button
      @click="$emit('login')"
      class="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
    >
      立即登录
    </button>

    <!-- 注册提示 -->
    <div class="mt-3 text-center text-sm text-gray-600">
      首次使用？
      <button
        @click="$emit('register')"
        class="text-blue-500 hover:text-blue-700 font-medium ml-1 focus:outline-none"
      >
        点我注册
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginPromptCard",
  emits: ['login', 'register'], // 暴露两个事件给父组件
  props: {
    /**
     * 允许父组件通过 class 自定义样式（如位置、大小）
     * 示例：class="absolute top-10 right-10" 或 "w-96 h-60"
     */
    customClass: {
      type: String,
      default: ''
    }
  },
  setup() {
    // 无状态逻辑，所有交互通过 emit 传递
  }
}
</script>

<style scoped>
/* 可选：防止图标在某些浏览器中显示异常 */
svg {
  display: block;
}
</style>