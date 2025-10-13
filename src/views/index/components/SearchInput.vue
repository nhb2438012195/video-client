<template>
  <!-- 
    🔍 SearchInput.vue - 带下拉面板的搜索框组件
    ✅ 支持 dropdown 插槽
    ✅ 点击输入框或下拉内容 → 展开（emit true）
    ✅ 点击外部 → 收起（emit false）
    ✅ 父组件通过 @dropdown-toggle 接收状态
    ✅ 完全独立，无需父组件管理状态
  -->
  <div
    ref="rootRef"
    class="relative inline-block"
    :class="[
      // 默认尺寸（可被父组件 class 覆盖）
      'w-full',
      // 允许父组件传入 class
      $attrs.class || ''
    ]"
    v-bind="$attrs"
    style="contain: layout "
  >
    <!-- 搜索输入框（复用原有结构） -->
    <div class="relative flex items-center">
      <input
        ref="inputRef"
        v-model="localValue"
        type="text"
        placeholder="请输入搜索内容"
        class="w-full px-4 py-2 text-gray-700 placeholder-gray-400 bg-gray-50 border-none rounded-lg focus:outline-none  transition-shadow duration-150"
        @keyup.enter="handleSearch"
        @focus="handleInputFocus"
        @click="handleInputClick"
      />

      <button
        class="absolute right-2 p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
        @click="handleSearch"
        aria-label="搜索"
      >
        <el-icon size="16"><Search /></el-icon>
      </button>
    </div>

    <!-- 下拉面板（通过插槽插入） -->
    <div
      v-show="isDropdownVisible"
      ref="dropdownRef"
      class="absolute  z-50 w-full bg-white rounded-md shadow-lg"
    >
      <slot name="dropdown" />
    </div>

    <!-- 错误提示 -->
    <div
      v-if="error"
      class="mt-1 text-xs text-red-500 text-center"
    >
      {{ error }}
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue'

export default {
  name: 'SearchInput',
  inheritAttrs: false,
  emits: ['search', 'update:modelValue', 'dropdown-toggle'],

  setup(props, { emit }) {
    const rootRef = ref(null)
    const inputRef = ref(null)
    const dropdownRef = ref(null)
    const localValue = ref('')
    const error = ref(null)
    const isDropdownVisible = ref(false) // 仅用于本地控制显隐，不暴露给父组件

    // 🔁 全局点击监听
    const handleClickOutside = (event) => {
      const clickedInside =
        rootRef.value?.contains(event.target) ||
        dropdownRef.value?.contains(event.target)

      const shouldExpand = clickedInside
      isDropdownVisible.value = shouldExpand
      emit('dropdown-toggle', shouldExpand)
    }

    // 📌 输入框点击/聚焦时展开
    const handleInputClick = () => {
      isDropdownVisible.value = true
      emit('dropdown-toggle', true)
    }

    const handleInputFocus = () => {
      isDropdownVisible.value = true
      emit('dropdown-toggle', true)
    }

    // 🔍 搜索逻辑（校验 + emit）
    const handleSearch = () => {
      const value = localValue.value.trim()
      if (!value) {
        error.value = '请输入搜索内容'
        return
      }
      if (value.length > 100) {
        error.value = '搜索内容不能超过 100 字符'
        return
      }
      error.value = null
      emit('search', value)
      // 搜索后可选择收起下拉（按需）
      // isDropdownVisible.value = false
      // emit('dropdown-toggle', false)
    }

    // 🧩 监听本地值变化（支持 v-model）
    const updateModel = () => {
      emit('update:modelValue', localValue.value)
    }

    // 🔄 生命周期
    onMounted(() => {
      document.addEventListener('click', handleClickOutside)
    })

    onBeforeUnmount(() => {
      document.removeEventListener('click', handleClickOutside)
    })

    return {
      rootRef,
      inputRef,
      dropdownRef,
      localValue,
      error,
      isDropdownVisible,
      handleInputClick,
      handleInputFocus,
      handleSearch,
      updateModel
    }
  },

  watch: {
    localValue: {
      handler(newVal) {
        this.updateModel()
      },
      immediate: true
    }
  }
}
</script>