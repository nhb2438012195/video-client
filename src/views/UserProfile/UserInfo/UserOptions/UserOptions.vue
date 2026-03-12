<template>
  <!-- 外层根容器：自动占满父容器宽高，水平两端布局，垂直居中，防止内容溢出 -->
  <div class="w-full h-full flex items-center justify-between bg-white px-3 md:px-6 gap-2 overflow-hidden">
    <!-- 左侧导航菜单区域 - 添加relative作为选中条的定位容器 -->
    <ul 
      ref="menuRef"
      class="flex items-center gap-1 sm:gap-3 md:gap-6 list-none m-0 p-0 flex-shrink-0 relative"
    >
      <!-- 循环渲染菜单项 -->
      <li
        v-for="item in menuList"
        :key="item.key"
        :data-key="item.key" 
        @click="handleMenuClick(item)"
        class="
          relative flex items-center gap-1 cursor-pointer py-4
          transition-all duration-200 hover:text-[#00a1d6]
          whitespace-nowrap
        "
        :class="{
          'text-[#00a1d6] font-medium': activeKey === item.key
        }"
      >
        <!-- 菜单图标：自定义颜色，修复组件引用方式 -->
        <el-icon :color="item.iconColor" size="20">
          <component :is="getIconComponent(item.icon)" />
        </el-icon>

        <!-- 菜单文字：小屏幕下隐藏，只保留图标，适配窄容器 -->
        <span class="hidden sm:inline text-base">{{ item.label }}</span>

        <!-- 菜单角标：比如收藏的数字，仅当有值时显示 -->
        <span v-if="item.badge" class="text-sm text-gray-500">{{ item.badge }}</span>
      </li>

      <!-- 独立的选中条 - 实现移动动画 -->
      <div 
        class="absolute bottom-0 h-[3px] bg-[#00a1d6] rounded-t-sm transition-all duration-200 ease-in-out"
        :style="{ left: activeBarLeft + 'px', width: activeBarWidth + 'px' }"
      ></div>
    </ul>

    <!-- 中间搜索框区域 -->
    <div class="flex-1 max-w-[240px] md:max-w-[300px] hidden sm:block">
      <el-input
        class="nav-search-input"
        placeholder="搜索视频、动态"
        clearable
        size="default"
      >
        <!-- 搜索框后缀图标 -->
        <template #suffix>
          <el-icon><Search /></el-icon>
        </template>
      </el-input>
    </div>

    <!-- 右侧数据统计区域 -->
    <div class="flex items-center gap-3 sm:gap-5 md:gap-8 flex-shrink-0">
      <!-- 循环渲染统计项 -->
      <div
        v-for="item in statData"
        :key="item.label"
        class="flex flex-col items-center text-center"
      >
        <!-- 统计标题：小屏幕下隐藏 -->
        <span class="text-sm text-gray-500 whitespace-nowrap hidden md:block">{{ item.label }}</span>
        <!-- 统计数值 -->
        <span class="text-base md:text-lg font-medium text-gray-800">{{ item.value }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
// 导入Vue3核心API
import { ref, onMounted, nextTick } from 'vue'
// 显式导入Element Plus图标组件（核心修复点）
import { 
  House, TrendCharts, VideoCamera, Collection, 
  Star, Heart, Setting, Search 
} from '@element-plus/icons-vue'

// ===================== 组件配置项（可选，父组件不传则使用默认值，保证组件完全独立） =====================
const props = defineProps({
  // 导航菜单列表配置
  menuList: {
    type: Array,
    default: () => [
      {
        key: 'home',
        label: '主页',
        icon: 'House', // 保留字符串标识，后续映射为实际组件
        iconColor: '#00b857',
        badge: ''
      },
      {
        key: 'dynamic',
        label: '动态',
        icon: 'TrendCharts',
        iconColor: '#ff7997',
        badge: ''
      },
      {
        key: 'publish',
        label: '投稿',
        icon: 'VideoCamera',
        iconColor: '#00a1d6',
        badge: ''
      },
      {
        key: 'collection',
        label: '合集和系列',
        icon: 'Collection',
        iconColor: '#54bfff',
        badge: ''
      },
      {
        key: 'favorite',
        label: '收藏',
        icon: 'Star',
        iconColor: '#ffb800',
        badge: '19'
      },
      {
        key: 'follow',
        label: '追番追剧',
        icon: 'Heart',
        iconColor: '#f84c57',
        badge: ''
      },
      {
        key: 'setting',
        label: '设置',
        icon: 'Setting',
        iconColor: '#00a1d6',
        badge: ''
      }
    ]
  },
  // 默认选中的菜单key
  defaultActive: {
    type: String,
    default: 'home'
  },
  // 右侧统计数据配置
  statData: {
    type: Array,
    default: () => [
      { label: '关注数', value: '1624' },
      { label: '粉丝数', value: '159' },
      { label: '获赞数', value: '12' },
      { label: '播放数', value: '0' }
    ]
  }
})

// ===================== 事件抛出：父组件监听该事件实现页面切换逻辑 =====================
const emit = defineEmits(['menu-change'])

// ===================== 内部响应式状态 =====================
// 当前选中的菜单key
const activeKey = ref(props.defaultActive)
// 菜单容器ref
const menuRef = ref(null)
// 选中条的位置和宽度（用于动画）
const activeBarLeft = ref(0)
const activeBarWidth = ref(0)

// ===================== 核心方法 =====================
// 图标映射表：将字符串标识映射为实际导入的组件（核心修复点）
const iconMap = {
  House,
  TrendCharts,
  VideoCamera,
  Collection,
  Star,
  Heart,
  Setting,
  Search
}

/**
 * 获取图标组件（避免直接使用字符串作为component的is值）
 * @param {string} iconName 图标名称字符串
 * @returns {Component} 实际的图标组件
 */
const getIconComponent = (iconName) => {
  return iconMap[iconName] || House // 兜底返回默认图标
}

/**
 * 更新选中条的位置和宽度
 */
const updateActiveBar = () => {
  // 等待DOM更新完成后再获取元素位置
  nextTick(() => {
    if (!menuRef.value) return
    
    // 找到当前选中的菜单项DOM元素
    const activeLi = menuRef.value.querySelector(`li[data-key="${activeKey.value}"]`)
    if (activeLi) {
      // 更新选中条的位置和宽度
      activeBarLeft.value = activeLi.offsetLeft
      activeBarWidth.value = activeLi.offsetWidth
    }
  })
}

/**
 * 菜单项点击事件
 * @param {Object} item 当前点击的菜单项配置
 */
const handleMenuClick = (item) => {
  // 更新内部选中状态
  activeKey.value = item.key
  // 更新选中条位置（带动画）
  updateActiveBar()
  // 抛出事件给父组件，父组件自行实现页面切换逻辑
  emit('menu-change', item)
}

// 组件挂载时初始化选中条位置
onMounted(() => {
  updateActiveBar()
})
</script>

<style scoped>
/* 搜索框样式覆盖：还原截图的浅灰色边框、圆角样式 */
:deep(.nav-search-input .el-input__wrapper) {
  border-radius: 6px;
  border: 1px solid #e5e7eb;
  background-color: #fff;
  box-shadow: none;
  transition: all 0.2s;
}

/* 搜索框聚焦样式 */
:deep(.nav-search-input .el-input__wrapper.is-focus) {
  border-color: #00a1d6;
  box-shadow: 0 0 0 2px rgba(0, 161, 214, 0.1);
}

/* 搜索框hover样式 */
:deep(.nav-search-input .el-input__wrapper:hover) {
  border-color: #d1d5db;
}
</style>