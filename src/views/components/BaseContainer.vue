<template>
  <!-- 
    ✅ 修正版：使用 Flex 布局实现上下左右环绕，默认内容居中
    - 上/下：垂直方向排列
    - 左/右：在默认内容同行水平排列
    - 所有间距可通过父组件 class 自定义（如 gap-2、p-2 等）
    - 默认有合理宽高，但可被父组件 class 覆盖
  -->
  <div
    class="flex flex-col items-center justify-center select-none"
    :class="[
      // 默认尺寸（可被父组件 class 覆盖）
      ,
      // 默认内边距和间距（美观且可覆盖）
      'p-0 gap-0',
      // 允许父组件传入 class 控制大小、位置、间距等
      $attrs.class || ''
    ]"
    v-bind="$attrs"
  >
    <!-- 上插槽 -->
    <div v-if="$slots.top" class="flex items-center justify-center">
      <slot name="top" />
    </div>

    <!-- 中间行：左 + 默认 + 右 -->
    <div class="inline-flex items-center justify-center">
      <!-- 左插槽 -->
      <div v-if="$slots.left" class="flex items-center justify-center">
        <slot name="left" />
      </div>

      <!-- 默认内容（主内容） -->
      <div
        class="flex items-center justify-center text-gray-800 font-medium text-sm   min-w-0"
        :class="[
          // hover 反馈（可选）
        ]"
      >
        <slot />
      </div>

      <!-- 右插槽 -->
      <div v-if="$slots.right" class="flex items-center justify-center">
        <slot name="right" />
      </div>
    </div>

    <!-- 下插槽 -->
    <div v-if="$slots.bottom" class="flex items-center justify-center">
      <slot name="bottom" />
    </div>
  </div>
</template>

<script>
/**
 * @component FlexibleContentBox
 * @description 使用 Flex 布局实现上下左右环绕内容的独立组件
 * @author Qwen
 *
 * ✅ 优势：
 * - 无绝对定位，无 z-index 遮挡问题
 * - 内容自然流式布局，语义清晰
 * - 间距通过 gap 控制，默认 0.25rem（gap-1），父组件可用 class 覆盖（如 class="gap-2 p-3"）
 * - 默认宽高：w-40 h-16（可被父组件任意覆盖）
 * - 主内容有默认 UI 样式（背景、边框、圆角），也可通过父组件 class 或插槽内容样式覆盖
 *
 * 📌 使用示例：
 *
 * <FlexibleContentBox class="w-32 h-20 gap-2 p-3 bg-blue-50 rounded-xl">
 *   <template #top><el-icon size="14"><Top /></el-icon></template>
 *   主内容
 *   <template #right><img src="/icon.svg" class="w-4 h-4" /></template>
 * </FlexibleContentBox>
 */
export default {
  name: 'FlexibleContentBox',
  inheritAttrs: false
}
</script>