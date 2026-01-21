<template>
    <!-- 消息通知组件 -->
    <div class="w-full h-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col"
        :class="{ 'hover:shadow-md transition-shadow duration-200': true }">
        <!-- 消息列表容器 -->
        <div class="flex-1 overflow-y-auto">
            <!-- 单个消息项：回复我的 -->
            <div class="px-4 py-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors duration-150 flex items-center justify-between group"
                @click="handleClick('reply')">
                <div class="flex items-center">
                    <!-- 图标区域 -->
                    <div class="w-6 h-6 mr-3 text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                        </svg>
                    </div>
                    <!-- 文本内容 -->
                    <span class="text-gray-800 font-medium text-sm">回复我的</span>
                </div>
                <!-- 数字徽章 -->
                <div v-if="replyCount > 0" class="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {{ replyCount }}
                </div>
            </div>

            <!-- 单个消息项：@我的 -->
            <div class="px-4 py-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors duration-150 flex items-center justify-between group"
                @click="handleClick('@')">
                <div class="flex items-center">
                    <div class="w-6 h-6 mr-3 text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="M12 16v-4M12 8h.01"></path>
                        </svg>
                    </div>
                    <span class="text-gray-800 font-medium text-sm">@我的</span>
                </div>
            </div>

            <!-- 单个消息项：收到的赞 -->
            <div class="px-4 py-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors duration-150 flex items-center justify-between group"
                @click="handleClick('like')">
                <div class="flex items-center">
                    <div class="w-6 h-6 mr-3 text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path
                                d="M14 9V5a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v4m0 0v4a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-4m0 0v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-4m0 0v4a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-4m0 0v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-4">
                            </path>
                        </svg>
                    </div>
                    <span class="text-gray-800 font-medium text-sm">收到的赞</span>
                </div>
                <!-- 数字徽章（99+） -->
                <div v-if="likeCount > 0" class="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {{ likeCount > 99 ? '99+' : likeCount }}
                </div>
            </div>

            <!-- 单个消息项：系统消息 -->
            <div class="px-4 py-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors duration-150 flex items-center justify-between group"
                @click="handleClick('system')">
                <div class="flex items-center">
                    <div class="w-6 h-6 mr-3 text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                        </svg>
                    </div>
                    <span class="text-gray-800 font-medium text-sm">系统消息</span>
                </div>
            </div>

            <!-- 单个消息项：我的消息 -->
            <div class="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors duration-150 flex items-center justify-between group"
                @click="handleClick('personal')">
                <div class="flex items-center">
                    <div class="w-6 h-6 mr-3 text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                        </svg>
                    </div>
                    <span class="text-gray-800 font-medium text-sm">我的消息</span>
                </div>
                <!-- 数字徽章 -->
                <div v-if="personalCount > 0" class="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {{ personalCount }}
                </div>
            </div>
        </div>

    </div>
</template>

<script>
/**
 * 消息通知组件 - MessageNotification
 * 
 * 功能描述：
 * 一个独立的、响应式的消息通知组件，展示不同类型的用户消息
 * 包含回复、@提及、点赞、系统通知和个人消息等类型
 * 支持数字徽章显示未读数量，支持点击事件和清空功能
 * 
 * 特性：
 * - 完全独立，不依赖父组件逻辑
 * - 使用 Tailwind CSS 进行样式设计
 * - 响应式布局，自适应容器大小
 * - 美观的 UI 设计，包含悬停效果和交互反馈
 * - 支持全局导入的 Element Plus（虽未使用，但兼容）
 */
export default {
    name: 'MessageNotification',

    /**
     * 组件数据属性
     * 所有状态都定义在组件内部，保证完全独立
     */
    data() {
        return {
            // 回复我的消息数量
            replyCount: 26,

            // @我的消息数量
            atCount: 0,

            // 收到的赞数量
            likeCount: 99 + Math.floor(Math.random() * 10), // 模拟超过99的数量

            // 系统消息数量
            systemCount: 0,

            // 我的消息数量
            personalCount: 35
        }
    },

    /**
     * 计算属性
     * 可以添加需要计算的属性，目前不需要
     */
    computed: {
        // 如果需要动态计算某些值可以在这里添加
    },

    /**
     * 方法集合
     * 处理组件内部的所有交互逻辑
     */
    methods: {
        /**
         * 处理点击消息项事件
         * @param {string} type - 消息类型 ('reply', '@', 'like', 'system', 'personal')
         */
        handleClick(type) {
            // 在实际项目中，这里可以触发事件或执行特定逻辑
            console.log(`Clicked on message type: ${type}`);

            // 跳转到消息页面，携带 type 作为 query 参数
           this.$router.push(`/message/MyMessage`)
        },

        /**
         * 处理清空所有消息事件
         */
        handleClearAll() {
            // 清空所有消息计数
            this.replyCount = 0;
            this.atCount = 0;
            this.likeCount = 0;
            this.systemCount = 0;
            this.personalCount = 0;

            // 触发清空完成事件（可选）
            this.$emit('clear-all');
        }
    },

    /**
     * 生命周期钩子
     * 组件挂载时的初始化逻辑
     */
    mounted() {
        // 组件挂载完成后可以执行一些初始化操作
        console.log('MessageNotification component mounted');
    },

    /**
     * 组件销毁前的清理工作
     */
    beforeUnmount() {
        // 组件销毁前可以清理资源
        console.log('MessageNotification component unmounted');
    },

    /**
     * 组件事件
     * 定义组件向外暴露的事件
     */
    emits: [
        'clear-all' // 当用户点击清空按钮时触发
    ]
}
</script>

<style scoped>
/* 自定义样式（如果需要覆盖默认样式） */
/* 在此组件中主要使用Tailwind CSS，所以不需要额外的CSS */
</style>