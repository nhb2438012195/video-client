<template>
  <div
    ref="containerRef"
    class="relative inline-block transition-transform duration-300 ease-out cursor-pointer"
    :style="{
      transform: shouldApplyTransform ? `scale(${props.scale})` : 'none',
      transformOrigin: `${50 + props.offsetX * 50}% ${50 + props.offsetY * 50}%`
    }"
    @mouseenter="isMouseHovering = true"
    @mouseleave="isMouseHovering = false"
  >
    <slot></slot>
  </div>
</template>

<script setup>
import { ref, computed, defineProps, defineExpose } from 'vue';

const props = defineProps({
  scale: {
    type: Number,
    default: 1.2,
    validator: (value) => value >= 1 && value <= 3
  },
  offsetX: {
    type: Number,
    default: 0,
    validator: (value) => value >= -1 && value <= 1
  },
  offsetY: {
    type: Number,
    default: 0,
    validator: (value) => value >= -1 && value <= 1
  },
  disabled: {
    type: Boolean,
    default: true
  },
  // 🔥 新增：仅当为 true 时，强行视为“鼠标悬停”
  // - true  → 强制悬停（放大）
  // - false / undefined / null → 不干预，走原鼠标逻辑
  forceHover: {
    type: Boolean,
    default: undefined
  }
});

// 真实鼠标悬停状态
const isMouseHovering = ref(false);
const containerRef = ref(null);

// 是否启用（disabled 的反向）
const isEnabled = computed(() => props.disabled);

// 🔥 核心：最终是否应视为“悬停中”
// 规则：启用状态下，只要 forceHover 为 true，或鼠标真悬停，就算悬停
const isHovering = computed(() => {
  if (!isEnabled.value) return false;

  // 只要 forceHover 明确为 true，就强制悬停
  if (props.forceHover === true) {
    return true;
  }

  // 否则，回归真实鼠标状态
  return isMouseHovering.value;
});

// 是否应用 transform
const shouldApplyTransform = computed(() => isHovering.value);

// 暴露 API
defineExpose({
  isHovering,
  isMouseHovering,
  isEnabled,
  currentScale: props.scale,
  offsetX: props.offsetX,
  offsetY: props.offsetY,
  setMouseHover: (state) => {
    isMouseHovering.value = Boolean(state);
  }
});
</script>

<style scoped>
.relative {
  display: inline-block;
  overflow: visible;
}
</style>