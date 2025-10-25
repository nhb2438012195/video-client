<template>
  <!-- 视频信息组件：展示标题、播放量、评论、时间、版权 -->
  <div class="flex flex-col gap-2 p-4 bg-white border-b border-gray-200">
    <!-- 标题区域 -->
    <h1
      class="text-xl md:text-2xl font-bold text-gray-900 leading-tight truncate"
      :title="title"
    >
      {{ title }}
    </h1>

    <!-- 信息行：播放量、评论、时间、版权 -->
    <div class="flex items-center text-sm text-gray-500 gap-4">
      <!-- 播放量 -->
      <div class="flex items-center gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="7 10 12 15 17 10"></polyline>
          <line x1="12" y1="15" x2="12" y2="3"></line>
        </svg>
        <span>{{ viewCount }}万</span>
      </div>

      <!-- 评论数 -->
      <div class="flex items-center gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
        <span>{{ commentCount }}</span>
      </div>

      <!-- 发布时间 -->
      <span>{{ publishTime }}</span>

      <!-- 版权提示 -->
      <div class="flex items-center gap-1 text-red-500">
        <!-- 使用 Element Plus 的 Icon 组件（已全局导入） -->
        <el-icon><Warning /></el-icon>
        <span>未经作者授权，禁止转载</span>
      </div>
    </div>
  </div>
</template>

<script setup>
// 定义 props，接收外部传入的数据
const props = defineProps({
  // 标题
  title: {
    type: String,
    required: true,
    default: '视频标题'
  },
  // 播放量（单位：万）
  viewCount: {
    type: Number,
    required: true,
    default: 0
  },
  // 评论数
  commentCount: {
    type: Number,
    required: true,
    default: 0
  },
  // 发布时间
  publishTime: {
    type: String,
    required: true,
    default: '2025-01-01 00:00:00'
  }
})

// 可选：格式化时间（如果需要更精细控制）
// const formattedTime = computed(() => {
//   return new Date(props.publishTime).toLocaleString('zh-CN')
// })
</script>

<style scoped>
/* 可选：覆盖默认样式 */
/* .truncate { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; } */
</style>