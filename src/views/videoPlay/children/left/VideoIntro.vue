<template>
  <!-- 可展开文本组件：自带 clamp 响应式宽度 + 精准溢出检测 -->
  <div
    class="flex flex-col gap-2"
    :style="{
      minWidth: '600px',
      maxWidth: '900px'
    }"
  >
    <!-- 文本容器 -->
    <div
      ref="textContainer"
      :class="{ 'line-clamp-4': !expanded }"
      class="text-gray-800 text-sm leading-relaxed overflow-hidden break-words"
    >
      {{ content }}
    </div>

    <!-- 展开/收起按钮（仅当内容实际溢出时显示） -->
    <div v-if="shouldShowToggle" class="flex items-center justify-start">
      <button
        @click="toggleExpand"
        class="text-xs text-gray-500 hover:text-gray-700 cursor-pointer underline transition-colors"
      >
        {{ expanded ? '收起' : '展开更多' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUpdated, nextTick, watch } from 'vue'

const props = defineProps({
  content: {
    type: String,
    required: true,
    default: '111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111'
  }
})

const expanded = ref(false)
const textContainer = ref(null)
const isOverflowing = ref(false)

// 精准检测是否溢出（是否真的超过4行）
const checkOverflow = async () => {
  await nextTick() // 确保 DOM 已更新
  if (!textContainer.value) return

  // 只有在未展开时才检测
  if (!expanded.value) {
    const { scrollHeight, clientHeight } = textContainer.value
    isOverflowing.value = scrollHeight > clientHeight
  } else {
    isOverflowing.value = true // 展开状态下肯定有“收起”按钮
  }
}

// 计算属性：是否显示按钮
const shouldShowToggle = computed(() => {
  return isOverflowing.value
})

const toggleExpand = () => {
  expanded.value = !expanded.value
}

// 监听 content 变化（支持动态内容）
watch(() => props.content, checkOverflow, { immediate: true })

// 组件挂载后检测
onMounted(checkOverflow)

// 更新后（如展开/收起）重新检测
onUpdated(checkOverflow)
</script>

<style scoped>
.line-clamp-4 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-wrap: break-word;
  white-space: normal;
}
</style>