<template>
  <!-- 视频互动操作栏组件 -->
  <div class="flex items-center justify-between px-4 py-2 bg-white border-b border-gray-200">
    <!-- 左侧：点赞、硬币、收藏、分享 -->
    <div class="flex items-center gap-6 text-sm text-gray-700">
      <!-- 点赞 -->
      <div class="flex items-center gap-2 cursor-pointer hover:text-blue-500 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M14 9V5a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v4m0 0v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9"></path>
          <polyline points="14 9 9 4 4 9"></polyline>
        </svg>
        <span>{{ likeCount }}万</span>
      </div>

      <!-- 硬币 -->
      <div class="flex items-center gap-2 cursor-pointer hover:text-green-500 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 8v4M12 16h.01"></path>
        </svg>
        <span>{{ coinCount }}万</span>
      </div>

      <!-- 收藏 -->
      <div class="flex items-center gap-2 cursor-pointer hover:text-yellow-500 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
        <span>{{ favoriteCount }}万</span>
      </div>

      <!-- 分享 -->
      <div class="flex items-center gap-2 cursor-pointer hover:text-blue-500 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
          <polyline points="16 6 12 2 8 6"></polyline>
          <line x1="12" y1="2" x2="12" y2="15"></line>
        </svg>
        <span>{{ shareCount }}</span>
      </div>
    </div>

    <!-- 右侧：举报、笔记、更多 -->
    <div class="flex items-center gap-4 text-sm">
      <!-- 举报 -->
      <div class="flex items-center gap-1 text-gray-500 cursor-pointer hover:text-red-500 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        </svg>
        <span>稿件举报</span>
      </div>

      <!-- 笔记 -->
      <div class="flex items-center gap-1 text-gray-500 cursor-pointer hover:text-purple-500 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16h2"></path>
          <rect x="14" y="2" width="8" height="8" rx="2" ry="2"></rect>
          <path d="M14 14h8"></path>
          <path d="M14 18h8"></path>
        </svg>
        <span>1篇笔记</span>
      </div>

      <!-- 更多操作（三点菜单） -->
      <el-dropdown trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="1"></circle>
            <circle cx="19" cy="12" r="1"></circle>
            <circle cx="5" cy="12" r="1"></circle>
          </svg>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="report">举报</el-dropdown-item>
            <el-dropdown-item command="save">收藏</el-dropdown-item>
            <el-dropdown-item command="share">分享</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
// 定义 props，接收外部传入的数据
const props = defineProps({
  // 点赞数（单位：万）
  likeCount: {
    type: Number,
    required: true,
    default: 0
  },
  // 硬币数（单位：万）
  coinCount: {
    type: Number,
    required: true,
    default: 0
  },
  // 收藏数（单位：万）
  favoriteCount: {
    type: Number,
    required: true,
    default: 0
  },
  // 分享数
  shareCount: {
    type: Number,
    required: true,
    default: 0
  }
})

// 处理更多操作的点击事件
const handleCommand = (command) => {
  console.log('点击了:', command)
  // 可以触发对应的操作逻辑
}
</script>

<style scoped>
/* 自定义样式：确保图标和文字对齐 */
.el-dropdown-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  cursor: pointer;
}
</style>