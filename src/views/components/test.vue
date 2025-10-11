<template>
  <!-- 
    可扩展的卡片式标签组件，支持四向插槽插入图片
    使用 Tailwind CSS 和 Element Plus（已全局导入）
    支持自定义大小、位置和样式，通过 class 控制外观
    默认显示文字内容，可选在上下左右插入图片
  -->
  <div
    :class="[
      'relative',
      'inline-flex',
      'items-center',
      'justify-center',
      'rounded-lg',
      'shadow-sm',
      'transition-all',
      'duration-200',
      'ease-in-out',
      'cursor-default',
      'bg-gray-100',
      'text-gray-800',
      'font-medium',
      'text-sm',
      'px-4',
      'py-2',
      'border',
      'border-gray-200',
      'hover:bg-gray-200',
      'hover:shadow-md',
      'focus:outline-none',
      'focus:ring-2',
      'focus:ring-blue-500',
      'focus:ring-opacity-50',
      // 允许外部通过 class 调整大小、位置等
      ...$attrs.class ? $attrs.class.split(' ') : []
    ]"
    v-bind="$attrs"
  >
    <!-- 左侧插槽：用于插入左侧图片 -->
    <div
      v-if="$slots.left"
      class="absolute left-0 flex-shrink-0 h-full flex items-center justify-center px-1"
    >
      <slot name="left" />
    </div>

    <!-- 上方插槽：用于插入上方图片 -->
    <div
      v-if="$slots.top"
      class="absolute top-0 left-1/2 transform -translate-x-1/2 flex-shrink-0 w-full flex items-center justify-center py-1"
    >
      <slot name="top" />
    </div>

    <!-- 下方插槽：用于插入下方图片 -->
    <div
      v-if="$slots.bottom"
      class="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex-shrink-0 w-full flex items-center justify-center py-1"
    >
      <slot name="bottom" />
    </div>

    <!-- 右侧插槽：用于插入右侧图片 -->
    <div
      v-if="$slots.right"
      class="absolute right-0 flex-shrink-0 h-full flex items-center justify-center px-1"
    >
      <slot name="right" />
    </div>

    <!-- 中心文本内容 -->
    <span
      class="flex items-center justify-center relative z-10"
      :class="{ 'mr-2': $slots.right, 'ml-2': $slots.left }"
    >
      <slot />
    </span>
  </div>
</template>

<script>
/**
 * @description 可扩展的卡片式标签组件
 * @author Qwen (Alibaba Cloud)
 * @version 1.0.0
 * @note 组件完全独立，不依赖父组件逻辑
 * @note 支持 Tailwind CSS 和 Element Plus（已全局导入）
 * @note 所有自定义行为通过 class 或插槽实现，无需修改内部代码
 */
export default {
  name: 'CardTag',
  /**
   * @description 组件属性说明
   * @type {Object}
   */
  props: {
    /**
     * 文本内容（可通过默认插槽传入）
     * 注意：不直接使用 prop，而是通过 slot 实现更灵活的内容插入
     */
    text: {
      type: String,
      default: ''
    },
    /**
     * 是否禁用交互效果（如 hover、focus）
     */
    disabled: {
      type: Boolean,
      default: false
    }
  },
  /**
   * @description 组件方法说明
   * @type {Object}
   */
  methods: {
    /**
     * @description 触发点击事件（如果需要）
     * @param {Event} event 点击事件对象
     */
    handleClick(event) {
      if (!this.disabled) {
        this.$emit('click', event);
      }
    }
  },
  /**
   * @description 组件生命周期钩子
   * @type {Object}
   */
  mounted() {
    // 初始化逻辑（如有需要）
    // 当前组件无需额外初始化
  },
  /**
   * @description 组件销毁时的清理逻辑
   */
  beforeUnmount() {
    // 清理逻辑（如有需要）
    // 当前组件无需额外清理
  },
  /**
   * @description 组件提供给子组件的依赖（如需）
   */
  provide() {
    return {
      cardTag: this
    };
  },
  /**
   * @description 组件监听的事件
   */
  emits: [
    'click'
  ],
  /**
   * @description 组件样式说明
   * @note 使用 Tailwind CSS 类名构建样式
   * @note 外部可通过 class 修改大小、位置、颜色等
   * @example
   * <CardTag class="w-32 h-10 text-lg bg-blue-100 text-blue-800">
   *   番剧
   * </CardTag>
   */
  setup() {
    // 组件设置逻辑（如需）
    // 当前组件无需复杂设置
    return {};
  }
};
</script>

<style scoped>
/* 
  仅在必要时添加内联样式
  当前组件主要依赖 Tailwind CSS，因此不需要额外样式
*/
</style>

<!-- 
  使用示例：

  <CardTag class="w-24 h-10 text-base bg-indigo-100 text-indigo-800">
    <template #left>
      <img src="/icons/series.svg" alt="番剧图标" class="w-4 h-4 opacity-80" />
    </template>
    番剧
    <template #right>
      <img src="/icons/arrow-right.svg" alt="箭头图标" class="w-3 h-3" />
    </template>
  </CardTag>

  或者纯文字版本：

  <CardTag class="w-16">番剧</CardTag>
-->