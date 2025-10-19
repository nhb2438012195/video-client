<template>
    <!-- 用户面板容器 -->
    <div class="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden transition-all duration-300"
        :class="[customClass]" @click.stop>
        <!-- 头部区域：用户ID和等级 -->
        <div class="px-4 py-3 text-center ">
            <div class="text-xl font-bold text-gray-900">{{ name }}</div>
            <div class="text-sm text-red-600 font-semibold mt-1">LV{{ lv }}</div>
            <div class="text-xs text-gray-500 mt-1 flex justify-center gap-4">
                <span>硬币: {{coin }}</span>
            </div>
        </div>

        <!-- 关注/粉丝/动态统计 -->
        <div class="flex justify-around px-4 py-3  border-b border-gray-200">
            <div class="text-center">
                <div class="text-lg font-semibold text-gray-800">{{ follow_quantity }}</div>
                <div class="text-xs text-gray-500">关注</div>
            </div>
            <div class="text-center">
                <div class="text-lg font-semibold text-gray-800">{{ fans_quantity }}</div>
                <div class="text-xs text-gray-500">粉丝</div>
            </div>
            <div class="text-center">
                <div class="text-lg font-semibold text-gray-800">{{ dynamic_quantity }}</div>
                <div class="text-xs text-gray-500">动态</div>
            </div>
        </div>


        <!-- 功能菜单列表 -->
        <div class="px-4 py-2 space-y-2">
            <router-link v-for="(item, index) in menuItems" :key="index" :to="item.path"
                class="flex items-center justify-between p-3 text-gray-700 hover:bg-gray-100 rounded-md transition-colors cursor-pointer group"
                @click="onMenuItemClick(item)">
                <div class="flex items-center gap-3">
                    <component :is="item.icon" class="text-gray-500 group-hover:text-blue-600 w-5 h-5 flex-shrink-0" />
                    <span class="font-medium truncate">{{ item.label }}</span>
                </div>
                <el-icon class="text-gray-400 group-hover:text-blue-600 w-5 h-5"><arrow-right /></el-icon>
            </router-link>
        </div>

        <!-- 主题设置 -->
        <div class="px-4 py-2 border-t border-gray-200">
            <div class="flex items-center justify-between p-3 text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer"
                @click="onThemeChange">
                <div class="flex items-center gap-3">
                    <el-icon>
                    </el-icon>
                    <span>主题： {{ themeName }}</span>
                </div>
                <el-icon><arrow-right /></el-icon>
            </div>
        </div>

        <!-- 退出登录 -->
        <div class="px-4 py-3 border-t border-gray-200">
            <div class="flex items-center justify-between p-3 text-gray-600 hover:bg-red-50 rounded-md cursor-pointer"
                @click="onLogout">
                <div class="flex items-center gap-3">
                    <el-icon>
                    </el-icon>
                    <span>退出登录</span>
                </div>
                <el-icon><arrow-right /></el-icon>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, defineExpose, watch } from 'vue';
import { useRouter } from 'vue-router';
const props = defineProps({
  userData: {
    type: Object,
    required: true,
    default: () => ({})
  },
  menuItems: {
    type: Array,
    default: () => [
    {
        label: '个人中心',
        path: '',
        icon: 'User'
    },
    {
        label: '投稿管理',
        path: '',
        icon: 'Document'
    },
    {
        label: '推荐服务',
        path: '',
        icon: 'Star'
    }
]
  },
  customClass: {
    type: String,
    default: ''
  }
});

const name = ref('');
const lv = ref(0);
const coin = ref(0);
const follow_quantity = ref(0);
const fans_quantity = ref(0);
const dynamic_quantity = ref(0);

// ======================
// 内部状态与数据
// ======================


watch(() => props.userData, (newValue) => {
    name.value = newValue.name;
    lv.value = newValue.lv;
    coin.value = newValue.coin;
    follow_quantity.value = newValue.followQuantity;
    fans_quantity.value = newValue.fansQuantity;
    dynamic_quantity.value = newValue.dynamicQuantity;
})
// 主题名称（浅色/深色）
const themeName = ref('浅色');


// ======================
// 方法区
// ======================

// 模拟点击菜单项
const onMenuItemClick = (item) => {
    console.log(`点击菜单项: ${item.label}`);
};

// 切换主题
const onThemeChange = () => {
    const newTheme = themeName.value === '浅色' ? '深色' : '浅色';
    themeName.value = newTheme;
    console.log('主题切换为:', newTheme);
};

// 退出登录
const onLogout = () => {
    console.log('执行退出登录');
    // 可以调用 logout API 或清空 token
};

// ======================
// 暴露数据给父组件
// ======================

</script>

<style scoped>
/* 响应式设计 */
@media (max-width: 640px) {
    .bg-gray-50 {
        padding: 1rem;
    }

    .flex.items-center.justify-between {
        flex-direction: column;
        align-items: flex-start;
    }
}
</style>