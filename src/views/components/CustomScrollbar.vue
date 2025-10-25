<template>
  <div
    v-show="thumbHeight > 0"
    class="custom-scrollbar"
    :style="{
      width: currentWidth + 'px',
      height: thumbHeight + 'px',
      top: thumbTop + 'px',
      background: currentColor,
      borderRadius: radius + 'px',
      opacity: showOnHover && !isHovering && !isDragging ? '0' : '1',
      transition: isDragging 
        ? 'none' 
        : 'opacity 0.2s ease, width 0.2s ease, top 0.1s, height 0.1s',
      cursor: isDragging ? 'grabbing' : 'pointer',
      pointerEvents: 'auto'
    }"
    @mouseenter="isHovering = true"
    @mouseleave="isHovering = false"
    @mousedown="onMouseDown"
  ></div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, watch, computed } from 'vue'

const props = defineProps({
  width: { type: [Number, String], default: 6 },
  hoverWidth: { type: [Number, String], default: 10 }, // 悬停/拖拽时宽度
  color: { type: String, default: 'rgba(0, 0, 0, 0.3)' },
  hoverColor: { type: String, default: 'rgba(0, 0, 0, 0.6)' }, // 悬停/拖拽时颜色
  radius: { type: [Number, String], default: 3 },
  showOnHover: { type: Boolean, default: false },
  minThumbHeight: { type: Number, default: 30 }
})

const thumbWidth = ref(Number(props.width))
const thumbHeight = ref(100)
const thumbTop = ref(0)
const isHovering = ref(false)
const isDragging = ref(false)
const startY = ref(0)
const startThumbTop = ref(0)
const lastDocumentHeight = ref(0) // 用于检测高度突变

// 当前宽度和颜色（根据状态切换）
const currentWidth = computed(() => {
  return (isHovering.value || isDragging.value) 
    ? Number(props.hoverWidth) 
    : Number(props.width)
})

const currentColor = computed(() => {
  return (isHovering.value || isDragging.value) 
    ? props.hoverColor 
    : props.color
})

// 核心：更新滚动条
const updateScrollbar = () => {
  const viewportHeight = window.innerHeight
  const documentHeight = document.documentElement.scrollHeight
  const scrollTop = window.scrollY

  // 🔥 检测文档高度是否突变（如动态加载内容）
  if (isDragging.value && documentHeight !== lastDocumentHeight.value) {
    // 页面结构变化，自动释放拖拽控制（“挣脱”）
    releaseDrag()
  }
  lastDocumentHeight.value = documentHeight

  if (documentHeight <= viewportHeight) {
    thumbHeight.value = 0
    return
  }

  let height = (viewportHeight * viewportHeight) / documentHeight
  height = Math.max(props.minThumbHeight, height)
  height = Math.min(height, viewportHeight - 10)

  const scrollableDistance = documentHeight - viewportHeight
  const trackHeight = viewportHeight - height
  const scrollPercent = scrollableDistance > 0 ? scrollTop / scrollableDistance : 0
  const top = trackHeight > 0 ? scrollPercent * trackHeight : 0

  thumbHeight.value = height
  thumbTop.value = top
}

let ticking = false
const requestTick = () => {
  if (!ticking && !isDragging.value) {
    requestAnimationFrame(() => {
      updateScrollbar()
      ticking = false
    })
    ticking = true
  }
}

// 释放拖拽（外部可调用）
const releaseDrag = () => {
  isDragging.value = false
  document.body.style.userSelect = ''
  document.body.style.cursor = ''
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('mouseup', onMouseUp)
  window.removeEventListener('mouseleave', onMouseUp)
}

const onMouseDown = (e) => {
  e.preventDefault()
  isDragging.value = true
  startY.value = e.clientY
  startThumbTop.value = thumbTop.value

  document.body.style.userSelect = 'none'
  document.body.style.cursor = 'grabbing'

  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mouseup', onMouseUp)
  window.addEventListener('mouseleave', onMouseUp)
}

const onMouseMove = (e) => {
  if (!isDragging.value) return

  const deltaY = e.clientY - startY.value
  const newThumbTop = startThumbTop.value + deltaY

  const viewportHeight = window.innerHeight
  const trackHeight = viewportHeight - thumbHeight.value
  const documentHeight = document.documentElement.scrollHeight
  const scrollableDistance = documentHeight - viewportHeight

  const clampedTop = Math.max(0, Math.min(newThumbTop, trackHeight))
  const scrollPercent = trackHeight > 0 ? clampedTop / trackHeight : 0
  const newScrollTop = scrollPercent * scrollableDistance

  thumbTop.value = clampedTop
  window.scrollTo(0, newScrollTop)
}

const onMouseUp = () => {
  releaseDrag()
}

onMounted(() => {
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

  lastDocumentHeight.value = document.documentElement.scrollHeight

  window.addEventListener('scroll', requestTick)
  window.addEventListener('resize', updateScrollbar)
  updateScrollbar()
})

onUnmounted(() => {
  window.removeEventListener('scroll', requestTick)
  window.removeEventListener('resize', updateScrollbar)
  releaseDrag() // 确保清理
})

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
}
</style>