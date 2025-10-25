<template>
  <!-- 用户信息卡片：头像在左，其余内容纵向堆叠在右 -->
  <div class="flex items-center w-full p-3 bg-white    gap-3">
    <!-- 头像区域：固定尺寸，不收缩 -->
    <div class="relative flex-shrink-0 w-[71px] h-[71px] p-2">
      <img
        src=""
        alt="用户头像"
        class=" rounded-full w-full h-full object-cover border border-gray-300"
      />
      <div class="absolute -bottom-0.5 -right-0.5 w-4 h-4 flex items-center justify-center rounded-full bg-yellow-400 text-yellow-800 text-[10px] font-bold">
        ⚡
      </div>
    </div>

    <!-- 右侧：纵向堆叠的一列 -->
    <div class="flex flex-col gap-1.5 flex-1 min-w-0">
      <!-- 第一行：昵称 + 发消息（水平） -->
      <div class="flex items-center gap-2 overflow-hidden">
        <span class="text-base font-semibold text-pink-600 truncate">敖小丙1688</span>
        <button
          class="flex items-center gap-1 flex-shrink-0 text-sm text-gray-600 hover:text-gray-800 transition-colors whitespace-nowrap"
          @click="handleSendMessage"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.338-3.127A8.003 8.003 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          发消息
        </button>
      </div>

      <!-- 第二行：商务信息（单行截断） -->
      <p class="text-xs text-gray-500 truncate">
        商务V: aoxiaobing1688（请注明来意）科普区...
      </p>

      <!-- 第三行：关注按钮（全宽，但有最大宽度限制） -->
      <el-button
        type="primary"
        size="small"
        class="!px-3 !py-1 !text-xs !font-medium bg-blue-600 hover:bg-blue-700 text-white w-full max-w-[160px] self-start"
        @click="handleFollow"
      >
        <i class="el-icon-plus"></i>
        关注
        <span class="ml-1">82.1万</span>
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { ElButton } from 'element-plus'
import { Lightning, Plus } from '@element-plus/icons-vue'

// 如果图标未全局注册，可在此局部注册（或确保 main.js 已注册）
// 本例假设已全局注册，故不重复注册

const handleSendMessage = () => console.log('发消息')
const handleCharge = () => console.log('充电')
const handleFollow = () => console.log('关注')
</script>

<style scoped>
/* 强制 Element Plus 按钮使用指定 padding/字体（覆盖默认） */
:deep(.el-button--small) {
  height: auto;
  line-height: 1.2;
}
</style>