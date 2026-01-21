<!-- 泛用按钮组件 TagLabel -->
<template>
  <!-- 
    TagLabel 组件：一个美观的标签组件，用于展示分类/标签类信息。
    可以自由组合 Tailwind 类名来控制尺寸、位置和样式。
    示例用法：
      <TagLabel text="番剧" />
      <TagLabel text="动画" class="text-xs mx-1 bg-blue-100 text-blue-800" />
  -->
  <div
    :class="[
      // 基础样式：背景色、文字颜色、边框、圆角、内边距
      'flex items-center justify-center relative',
      'inline-flex items-center justify-center px-0 py-1',
      'font-medium text-sm', // 默认字体大小和粗细
      'rounded-full',        // 圆角
      'transition-all duration-200 ease-in-out', // 悬停动画
      'cursor-default',       // 鼠标样式
      'select-none' ,           // 禁止文本选择
      // 可自定义的类名（由父组件传入）
      customClass,
      // 背景色和文字色可通过 props 控制，也可覆盖
      bgColor,
      borderColor,
      // 悬停效果
      hoverEffect,
      // 鼠标悬停效果
      cursorEffect,
    ]"
    v-bind="$attrs"
  >

    <!-- 文本内容 -->
    <span>{{ text }}</span>
  </div>
</template>

<script setup>
/**
 * TagLabel - 独立标签组件
 * 用途：显示分类标签，如“番剧”、“电影”、“综艺”等
 * 特点：完全独立、可扩展、支持 Tailwind 自定义
 *
 * @props
 * - text (String): 显示的文本，默认 "番剧"
 * - bgColor (String): 背景色类名（如 'bg-gray-100'），默认 'bg-gray-200'
 * - textColor (String): 文字颜色类名（如 'text-gray-700'），默认 'text-gray-800'
 * - borderColor (String): 边框颜色类名（如 'border-gray-300'），默认 'border-gray-300'
 * - customClass (String): 允许父组件传入额外的 Tailwind 类名（如 'text-lg', 'mx-2'）
 * - hoverEffect (String): 自定义悬停效果，如 'hover:bg-gray-300'，默认'hover:opacity-90 hover:shadow-md'
 */

// 定义 Props
const props = defineProps({
  /**
   * 标签显示的文字
   */
  text: {
    type: String,
    default: '番剧'
  },
  /**
   * 背景颜色类名（Tailwind）
   * 示例：'bg-blue-100', 'bg-green-50'
   */
  bgColor: {
    type: String,
    default: 'bg-gray-200'
  },

  /**
   * 边框颜色类名（Tailwind）
   * 示例：'border-gray-300', 'border-transparent'
   */
  borderColor: {
    type: String,
    default: 'border-gray-300'
  },
  /**
   * 自定义类名（允许父组件调整大小、位置等）
   * 示例：'text-xs', 'mx-1', 'mb-2', 'w-16'
   */
  customClass: {
    type: String,
    default: ''
  },
  /**
   * 悬停效果类名（Tailwind）
   * 示例：'hover:bg-gray-300', 'hover:shadow-md'
   */
  hoverEffect: {
    type: String,
    default: ''
  },
  /**
   * 鼠标悬停效果类名（Tailwind）
   * 示例：'cursor-pointer', 'cursor-not-allowed'
   */
  cursorEffect: {
    type: String,
    default: 'cursor-pointer'
  }
})

// 注意：所有 class 都是 Tailwind 的原生类名，无需引入 Element Plus
// 若需使用 Element Plus 的组件（如 ElBadge），可在 future 扩展中加入
</script>

<style scoped>
/* 
  scoped 样式避免污染全局，但本组件主要依赖 Tailwind，所以这里基本不需要
  如果需要特殊样式（如伪元素），可以在这里补充
*/
</style>