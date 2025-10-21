<!-- 提供一个可配置的容器组件，用于实现上下左右环绕内容，并添加一些默认样式和间距，除了中间的内容其他插槽是命名插槽 -->
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
        class="flex items-center justify-center  font-medium text-sm   min-w-0"
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