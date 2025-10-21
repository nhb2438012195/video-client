<template>
  <div
    class="custom-scrollbar"
    :style="{
      width: thumbWidth + 'px',
      height: thumbHeight + 'px',
      top: thumbTop + 'px',
      background: color,
      borderRadius: radius + 'px',
      opacity: showOnHover && !isHovering ? '0' : '1',
      transition: 'opacity 0.2s ease'
    }"
    @mouseenter="isHovering = true"
    @mouseleave="isHovering = false"
  ></div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'

const props = defineProps({
  width: { type: [Number, String], default: 6 },
  color: { type: String, default: 'rgba(0, 0, 0, 0.3)' },
  radius: { type: [Number, String], default: 3 },
  showOnHover: { type: Boolean, default: false },
  // 最小滚动条高度（px）
  minThumbHeight: { type: Number, default: 30 }
})

const thumbWidth = ref(Number(props.width))
const thumbHeight = ref(100)
const thumbTop = ref(0)
const isHovering = ref(false)

// 核心：计算滚动条位置和高度
const updateScrollbar = () => {
  const viewportHeight = window.innerHeight
  const documentHeight = document.documentElement.scrollHeight
  const scrollTop = window.scrollY

  // 如果文档高度 ≤ 视口高度，无需滚动条
  if (documentHeight <= viewportHeight) {
    thumbHeight.value = 0 // 隐藏
    return
  }

  // 滚动条高度算法：viewport² / documentHeight（经典比例）
  let height = (viewportHeight * viewportHeight) / documentHeight
  height = Math.max(props.minThumbHeight, height)
  height = Math.min(height, viewportHeight) // 不超过视口

  // 滚动比例
  const scrollableDistance = documentHeight - viewportHeight
  const scrollPercent = scrollableDistance > 0 ? scrollTop / scrollableDistance : 0

  // 可滚动区域 = 视口高度 - 滚动条高度
  const maxTop = viewportHeight - height
  const top = scrollPercent * maxTop

  thumbHeight.value = height
  thumbTop.value = top
}

let ticking = false
const requestTick = () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      updateScrollbar()
      ticking = false
    })
    ticking = true
  }
}

onMounted(() => {
  // 注入全局 CSS（只执行一次）
  if (!document.getElementById('custom-scrollbar-style')) {
    const style = document.createElement('style')
    style.id = 'custom-scrollbar-style'
    style.textContent = `
      html {
        scrollbar-gutter: stable;
      }
      ::-webkit-scrollbar {
        display: none !important;
      }
      html {
        -ms-overflow-style: none !important;
        scrollbar-width: none !important;
      }
    `
    document.head.appendChild(style)
  }

  window.addEventListener('scroll', requestTick)
  window.addEventListener('resize', updateScrollbar)
  updateScrollbar()
})

onUnmounted(() => {
  window.removeEventListener('scroll', requestTick)
  window.removeEventListener('resize', updateScrollbar)
})

// 响应 prop 变化
watch(() => props.width, (val) => {
  thumbWidth.value = Number(val)
})
</script>

<style scoped>
.custom-scrollbar {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 2147483647;
  pointer-events: none;
  transition: height 0.1s, top 0.1s;
}
</style>