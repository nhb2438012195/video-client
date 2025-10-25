<template>
  <!-- 弹幕列表标题组件：响应式、自适应父容器 -->
  <div
    class="flex items-center w-full min-h-[44px] px-3 py-2 bg-gray-100 border border-gray-200 rounded-lg shadow-sm text-sm font-medium text-gray-800 box-border"
  >
    <!-- 左侧文字：弹幕列表（可截断，防溢出） -->
    <span class="truncate flex-1 text-left">弹幕列表</span>


    <!-- 右侧：向下箭头（固定宽度） -->
    <div class="flex items-center justify-center w-6 h-6 text-gray-500 flex-shrink-0">
      <ArrowDown class="w-4 h-4" />
    </div>
  </div>
</template>

<script setup>
import { More, ArrowDown } from '@element-plus/icons-vue'
</script>

<style scoped>
/* 确保 SVG 图标继承颜色 */
:deep(svg) {
  fill: currentColor;
}
</style>