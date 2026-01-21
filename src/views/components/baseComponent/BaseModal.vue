<!--基础弹窗组件，modelValue控制弹窗显示，默认插槽插入具体弹窗内容  -->
<template>
  <div to="body">
    <div
      v-show="modelValue"
      class="fixed inset-0 z-max flex items-center justify-center p-4 bg-black bg-opacity-50 transition-opacity duration-200"
      @click="handleClose('overlay')"
      @keyup.esc="handleClose('escape')"
      tabindex="-1"
      role="dialog"
      aria-modal="true"
      :aria-labelledby="ariaLabelledby"
    >
      <!-- 弹窗主体 -->
      <div
        ref="modalRef"
        class="relative  max-w-[90vw] max-h-[90vh] overflow-auto bg-white rounded-xl shadow-xl border border-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-opacity-75 transition-transform duration-200 ease-out"
        :class="modalClass"
        @click.stop
      >
        <!-- 关闭按钮（× 图标） -->
        <button
          type="button"
          @click="handleClose('close-button')"
          class="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full text-gray-500  transition-colors duration-150"
          aria-label="关闭"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <!-- 插槽内容（用户自定义） -->
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  /**
   * 双向绑定的显示状态（v-model）
   */
  modelValue: {
    type: Boolean,
    default: false
  },

  /**
   * 自定义弹窗主体的 Tailwind 类（用于控制宽高、圆角等）
   * 示例：class="w-96" 或 "max-w-2xl rounded-2xl"
   */
  modalClass: {
    type: String,
    default: ''
  },

  /**
   * ARIA 标题引用 ID（用于无障碍）
   */
  ariaLabelledby: {
    type: String,
    default: undefined
  },

  /**
   * 是否允许点击遮罩关闭
   */
  closeOnClickModal: {
    type: Boolean,
    default: false
  },

  /**
   * 是否允许按 ESC 键关闭
   */
  closeOnPressEscape: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue','close'])

const modalRef = ref(null)

/**
 * 统一关闭逻辑，支持来源追踪（可选扩展）
 */
const handleClose = (source) => {
  // 若来源是遮罩但配置禁止点击遮罩关闭，则不关闭
  if (source === 'overlay' && !props.closeOnClickModal) return
  // 若来源是 ESC 但配置禁止，则不关闭
  if (source === 'escape' && !props.closeOnPressEscape) return

  emit('update:modelValue', false)
  emit('close')
}

// 聚焦管理
watch(
  () => props.modelValue,
  async (isOpen) => {
    if (isOpen) {
      await nextTick()
      modalRef.value?.focus()
    }
  }
)

onMounted(() => {
  if (props.modelValue) {
    modalRef.value?.focus()
  }
})

// 全局 ESC 监听
const handleGlobalKeydown = (e) => {
  if (props.modelValue && props.closeOnPressEscape && e.key === 'Escape') {
    handleClose('escape')
  }
}

// 绑定/解绑 ESC 监听
watch(
  () => props.modelValue,
  (isOpen) => {
    if (isOpen) {
      document.addEventListener('keydown', handleGlobalKeydown)
    } else {
      document.removeEventListener('keydown', handleGlobalKeydown)
    }
  },
  { immediate: true }
)

// 组件销毁时确保监听器移除
onUnmounted(() => {
  document.removeEventListener('keydown', handleGlobalKeydown)
})
</script>

<style scoped>
/* 可选：增强淡入动画（与 Vue Transition 配合） */
/* 若你后续包裹 <Transition>，可启用以下样式 */
</style>