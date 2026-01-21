<template>
    <!-- 消息输入组件：完全自包含，适配任意父容器尺寸 -->
    <div class="w-full h-full flex flex-col bg-gray-50 border-t border-gray-200 p-4 rounded-b-lg">
        <!-- 头部图标区域：两个功能图标 -->
        <div class="flex items-center space-x-3 mb-2">
            <!-- 附件图标按钮 -->
     <el-icon><Picture /></el-icon>
            <!-- 表情图标按钮 -->
          <el-icon><ChatRound /></el-icon>
        </div>

        <!-- 输入框区域 -->
        <div class="relative flex-1 overflow-y-auto">
            <!-- 文本输入框 -->
            <textarea v-model="messageContent" ref="textareaRef" placeholder="请输入消息内容"
                class="w-full h-full resize-none border-none outline-none bg-transparent text-gray-700 placeholder-gray-400 focus:ring-0"
                :rows="1" @input="handleInput" @keydown.enter.prevent="handleEnter"></textarea>

           
        </div>
        <!-- 发送按钮区域 -->
        <div class="flex justify-end mt-3 space-x-2">
             <!-- 限制字数提示 -->
            <div class=" bottom-2 right-2 text-xs text-gray-500">
                {{ messageContent.length }}/500
            </div>
            <!-- 发送按钮 -->
            <el-button :disabled="!messageContent.trim() || messageContent.length > 500" type="primary" size="small"
                @click="onSend" class="px-4 py-1.5">
                发送
            </el-button>
        </div>

        <!-- 表情选择器（弹出） -->
        <transition name="fade">
            <div v-if="showEmojiPicker"
                class="absolute bottom-20 left-4 z-10 bg-white border rounded-lg shadow-lg p-2 max-w-xs" >
                <div class="grid grid-cols-6 gap-1">
                    <!-- 示例表情（可替换为真实 emoji 库） -->
                    <span v-for="(emoji, index) in emojis" :key="index"
                        class="text-sm cursor-pointer hover:bg-gray-100 rounded p-1" @click="addEmoji(emoji)">
                        {{ emoji }}
                    </span>
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { useMessageStore } from '@/store'
// ========================
// 🔧 组件状态与数据
// ========================
const messageStore = useMessageStore()
// 消息内容（双向绑定）
const messageContent = ref('')

// 是否显示表情面板
const showEmojiPicker = ref(false)

// 用户头像（默认占位图）
const userAvatar = 'https://via.placeholder.com/32x32'

// 表情列表（示例）
const emojis = ['😀', '😂', '😍', '😎', '🤔', '🚀', '🎉', '🔥', '👍', '❤️']

const textareaRef = ref(null)

// ========================
// 🧩 方法定义
// ========================

// 处理输入事件：自动调整 textarea 高度
const handleInput = () => {
    const textarea = textareaRef.value
    if (!textarea) return

    // 清除默认样式高度
    textarea.style.height = 'auto'
    // 设置新高度
    textarea.style.height = `${textarea.scrollHeight}px`
}

// 处理回车键（支持 Shift+Enter 换行）
const handleEnter = (e) => {
    if (e.shiftKey) {
        // Shift + Enter：插入换行
        e.preventDefault()
        const textarea = textareaRef.value
        if (textarea) {
            const start = textarea.selectionStart
            const end = textarea.selectionEnd
            const value = textarea.value
            textarea.value = value.substring(0, start) + '\n' + value.substring(end)
            textarea.selectionStart = textarea.selectionEnd = start + 1
            textarea.focus()
        }
    } else {
        // 只按 Enter：发送消息
        onSend()
    }
}

// 添加表情到输入框
const addEmoji = (emoji) => {
    messageContent.value += emoji
    // 自动聚焦并滚动到底部
    setTimeout(() => {
        textareaRef.value?.focus()
        textareaRef.value?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }, 10)
}

// 发送消息（模拟）
const onSend = () => {
    if (!messageContent.value.trim()) {
        ElMessage.warning('请先输入消息内容')
        return
    }

    if (messageContent.value.length > 500) {
        ElMessage.error('消息长度不能超过 500 字')
        return
    }

    // 👉 这里可以触发自定义事件或调用父组件方法
    // emit('send', messageContent.value)
    //发送消息
    messageStore.sendMessage(messageContent.value)
    messageContent.value = ''
    showEmojiPicker.value = false
    ElMessage.success('消息已发送')
}

// 头像加载失败处理
const onAvatarError = () => {
    console.warn('头像加载失败，使用默认头像')
}

// ========================
// 🔄 响应式逻辑
// ========================

// 监听消息内容变化，控制发送按钮状态
watch(messageContent, (newVal) => {
    // 自动调整文本框高度
    handleInput()
})

// ========================
// 🚀 生命周期钩子
// ========================

// 页面挂载后，设置初始高度
onMounted(() => {
    handleInput() // 初始化高度
})
</script>

<style scoped>
/* 淡入淡出动画 */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

/* 禁止 textarea 默认选中时的蓝色边框 */
textarea:focus {
    outline: none;
    box-shadow: none;
}
</style>

<!-- 
⚠️ 注意事项：
- 本组件使用 Element Plus 的 ElButton 和 ElAvatar，确保已全局注册
- 若需更复杂的表情库，可集成如 `emoji-picker-element` 或 `tui-emoji-picker`
- 通过 emit('send') 可暴露事件给父组件，但此处为了独立性未启用
- 支持响应式：无论父容器多大，都会自动适配
-->