<template>
  <!-- 弹幕操作栏组件：严格单行响应式布局 -->
  <div class="flex items-center px-4 py-2 border-t border-b border-gray-200 w-full">
    <!-- 左侧信息区：禁止换行，允许收缩但保持单行 -->
    <div class="flex items-center gap-4 text-sm text-gray-600 whitespace-nowrap overflow-hidden flex-shrink min-w-0">
      <span>{{ onlineCount }}人正在看</span>
      <span>已装填 {{ barrageCount }} 条弹幕</span>
    </div>

    <!-- 中间弹幕图标区：固定宽度，不收缩 -->
    <div class="flex items-center gap-2 flex-shrink-0 mx-4">
      <div class="relative flex items-center">
        <span class="text-gray-700 font-bold">弹</span>
        <div class="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500"></div>
      </div>
      <div class="relative flex items-center">
        <span class="text-gray-700 font-bold">弹</span>
        <div class="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500"></div>
      </div>
    </div>

    <!-- 右侧输入框：占据剩余空间，有最小宽度 -->
    <div
      class="flex items-center flex-1 min-w-[240px] max-w-2xl px-4 py-2.5 bg-white border border-gray-300 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      <div class="flex items-center text-sm text-gray-600 flex-1 min-w-0">
        <span class="mr-1.5">请先</span>
        <a
          href="#"
          class="font-medium text-blue-600 hover:text-blue-700 hover:underline cursor-pointer transition-colors"
          @click.prevent="handleLogin"
        >
          登录
        </a>
        <span class="mx-1.5 text-gray-400">/</span>
        <a
          href="#"
          class="font-medium text-blue-600 hover:text-blue-700 hover:underline cursor-pointer transition-colors"
          @click.prevent="handleRegister"
        >
          注册
        </a>
        <span class="ml-1.5 text-gray-500">后发送弹幕</span>
      </div>

      <div class="flex items-center gap-3 flex-shrink-0 ml-4">
        <a
          href="#"
          class="text-xs text-gray-500 hover:text-gray-700 whitespace-nowrap cursor-pointer transition-colors"
          @click.prevent="openBarrageGuide"
        >
          弹幕礼仪&nbsp;>
        </a>
        <span class="text-xs font-medium text-gray-400 select-none cursor-not-allowed">
          发送
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  onlineCount: { type: Number, required: true, default: 1000000 },
  barrageCount: { type: Number, required: true, default: 1000000 }
})

const handleLogin = () => console.log('login')
const handleRegister = () => console.log('register')
const openBarrageGuide = () => console.log('guide')
</script>

<style scoped>
.relative > span {
  position: relative;
}
</style>