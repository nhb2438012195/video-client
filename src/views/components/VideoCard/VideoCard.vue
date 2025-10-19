<template>
  <!-- 视频卡片组件 -->
  <div class="!z-0 h-full w-full relative flex gap-2 flex-col bg-white overflow-hidden transition-colors duration-150">
    <!-- 封面区域：包含视频缩略图、播放按钮、播放量、时长、功能图标 -->
    <div ref="coverRef"  class="relative aspect-video cursor-pointer bg-gray-800 flex items-center justify-center overflow-hidden"
      @mousemove="handleCoverMouseMove" @mouseenter="handleCoverMouseEnter" @mouseleave="handleCoverMouseLeave"
      @click="handleCoverClick">
      <!-- 插槽：封面图片 -->
      <slot name="cover">
        <!-- 默认占位图 -->
        <img src="http://120.26.137.2:9000/public/DefaultImage.png" alt="视频封面" class="w-full h-full object-fill" />
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
        <div class=" bottom-4 left-4 bg-opacity-70 text-white px-2 py-1  text-sm font-medium">
          <slot name="view-count">622</slot>
        </div>

        <!-- 时长（右下角） -->
        <div class=" top-4 right-4 bg-black bg-opacity-70 text-white px-2 py-1  text-xs font-medium">
          <slot name="duration">01:20:26</slot>
        </div>
      </div>
      <!-- 功能图标占位（收藏、分享） -->
      <div class="absolute top-4 left-4 flex space-x-1">
      </div>
    </div>

    <!-- 标题与作者区域 -->
    <div class="overflow-hidden">
      <!-- 标题 -->
      <h3
        class="text-xs font-semibold text-gray-900 mb-2 leading-tight max-h-[40px] overflow-hidden cursor-pointer hover:text-blue-600">
        <slot name="title overflow-hidden">
          <h3 class=" text-sm overflow-hidden">
            当你发现《大东北我的家乡》和Alan Walker的适配度是100%……addawdaddddddddddddddddd
          </h3>
        </slot>
      </h3>

      <!-- 作者信息 -->
      <div class="flex items-center mt-1 text-sm text-gray-600">
        <!-- UP主图标 -->
        <div class="w-5 h-5 mr-1.5 text-blue-500 ">
          <slot name="up-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" class="w-5 h-5">
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </slot>
        </div>
        <div class="cursor-pointer hover:text-blue-600 text-gray-400">
          <span class="font-medium  ">
            <slot name="author">hiAgent</slot>
          </span>
          <span class="mx-1.5 ">·</span>
          <span class="">
            <slot name="date">10-9</slot>
          </span>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
// ========================
// === Props 接收外部数据 ===
// ========================
const coverRef = ref(null);
const props = defineProps({
  //id
  id: {
    type: String,
    required: true,
  },

})


// ========================
// === 事件处理函数 ===
// ========================

// 鼠标在封面移动时触发（暂时不需要）
function handleCoverMouseMove(e) {
  // const cover = coverRef.value;
  // if (!cover) return;

  // const rect = cover.getBoundingClientRect();
  // const x = e.clientX - rect.left;
  // // 计算 x 坐标在封面中的百分比,保留2位小数
  // const percent = Math.round(x / rect.width * 100);
  // // ...后续逻辑
  // console.log('percent:', percent+'%')
}

// 鼠标进入封面
function handleCoverMouseEnter() {
  console.log('进入封面')

}

// 鼠标离开封面
function handleCoverMouseLeave() {
  console.log('离开封面')

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