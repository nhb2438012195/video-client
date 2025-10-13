<template>
  <!-- 视频卡片组件 -->
  <div
    class="h-full w-full relative flex gap-2 flex-col bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-colors duration-150"
    :class="customClass"
  >
    <!-- 封面区域：包含视频缩略图、播放按钮、播放量、时长、功能图标 -->
    <div class="relative aspect-video bg-gray-800 flex items-center justify-center overflow-hidden">
      <!-- 插槽：封面图片 -->
        <slot name="cover">
            <!-- 默认占位图 -->
            <img
            src="https://via.placeholder.com/400x225?text=Video+Cover"
            alt="视频封面"
            class="w-full h-full object-cover"
            />
        </slot>
      <!-- 播放按钮图标（左下角） -->
      <!-- <div class="absolute bottom-4 left-4 flex items-center justify-center w-8 h-8 bg-black bg-opacity-70 rounded-full text-white">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" class="w-5 h-5">
          <path d="M8 5v14l11-7z"
        </svg>
      </div> -->
      <!-- 封面底部 -->
      <div class=" absolute bottom-0 flex  justify-between items-center bg-black w-full">
            <!-- 播放次数（左下角） -->
            <div class=" bottom-4 left-4 bg-opacity-70 text-white px-2 py-1 rounded text-sm font-medium">
                <slot name="view-count">622</slot>
            </div>

            <!-- 时长（右下角） -->
            <div class=" top-4 right-4 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs font-medium">
                <slot name="duration">01:20:26</slot>
            </div>
      </div>
      <!-- 功能图标占位（收藏、分享） -->
      <div class="absolute top-4 left-4 flex space-x-1">
      </div>
    </div>

    <!-- 标题与作者区域 -->
    <div class="">
      <!-- 标题 -->
      <h3
        class="text-xs font-semibold text-gray-900 mb-2 leading-tight max-h-[40px]"
        @mouseenter="handleTitleMouseEnter"
        @mouseleave="handleTitleMouseLeave"
      >
        <slot name="title">
            <h3 class=" text-sm">
                当你发现《大东北我的家乡》和Alan Walker的适配度是100%……addawdaddddddddddddddddd
            </h3>
        </slot>
      </h3>

      <!-- 作者信息 -->
      <div class="flex items-center mt-1 text-sm text-gray-600">
        <!-- UP主图标 -->
        <div class="w-5 h-5 mr-1.5 text-blue-500">
          <slot name="up-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" class="w-5 h-5">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </slot>
        </div>
        <span class="font-medium text-gray-800">
          <slot name="author">hiAgent</slot>
        </span>
        <span class="mx-1.5 text-gray-400">·</span>
        <span class="text-gray-500">
          <slot name="date">10-9</slot>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * 视频卡片组件（静态还原截图样式）
 * 用于展示视频缩略图、标题、作者、播放次数、时长等信息
 * 严格按截图布局设计，无额外动态效果
 */

// ========================
// === Props 接收外部数据 ===
// ========================

const props = defineProps({
  /**
   * 自定义类名，允许父组件调整大小、位置、边距等
   * 示例：class="w-80 h-64" 或 "max-w-md"
   */
  customClass: {
    type: String,
    default: ''
  }
})

// ========================
// === Events 暴露给父组件 ===
// ========================

const emit = defineEmits([
  'hover-cover',           // 鼠标在封面移动时触发，参数：x坐标
  'hover-title',           // 鼠标进入标题
  'hover-author',          // 鼠标进入作者
  'mouse-enter-cover',     // 鼠标进入封面
  'mouse-leave-cover',     // 鼠标离开封面
  'mouse-enter-title',     // 鼠标进入标题
  'mouse-leave-title',     // 鼠标离开标题
  'mouse-enter-author',    // 鼠标进入作者
  'mouse-leave-author'    // 鼠标离开作者
])

// ========================
// === 事件处理函数 ===
// ========================

// 鼠标在封面移动时触发（暴露 x 坐标）
function handleCoverMouseMove(e) {
  const x = e.clientX
  emit('hover-cover', x)
}

// 鼠标进入封面
function handleCoverMouseEnter() {
  emit('mouse-enter-cover')
}

// 鼠标离开封面
function handleCoverMouseLeave() {
  emit('mouse-leave-cover')
}

// 鼠标进入标题
function handleTitleMouseEnter() {
  emit('hover-title')
}

// 鼠标离开标题
function handleTitleMouseLeave() {
  emit('mouse-leave-title')
}

// 鼠标进入作者
function handleAuthorMouseEnter() {
  emit('hover-author')
}

// 鼠标离开作者
function handleAuthorMouseLeave() {
  emit('mouse-leave-author')
}

// 模拟收藏操作
function handleFavorite() {
  console.log('收藏')
}

// 模拟分享操作
function handleShare() {
  console.log('分享')
}
</script>

<style scoped>
/* 控制宽高比为 16:9 */
:deep(.aspect-video) {
  aspect-ratio: 16 / 9;
}

/* 确保文本不会溢出 */
::v-deep(slot) {
  display: block;
}

/* 强制保持布局稳定 */
.container {
  width: 100%;
}
</style>