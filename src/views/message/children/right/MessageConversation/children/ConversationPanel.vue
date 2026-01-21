<template>
    <div class="h-full w-full bg-slate-200 flex flex-col">
        <div class="h-[40px]">
            <div v-if="chatTarget != 'null'" class="h-full w-full flex items-center justify-center  bg-gray-100">
                {{ messageStore.selectedConversation?.conversationUserInfoVO.name }}
            </div>
        </div>
        <div class="flex-1 overflow-y-auto p-2" ref="container">
            <div v-for="messageData in messageStore.selectedConversation?.messageVOList" :key="messageData.messageId">
                <ChatMessage :messageData="messageData"></ChatMessage>
            </div>
        </div>
        <div class=" h-[162px]">
            <MessageInput></MessageInput>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount,watch,nextTick,computed } from 'vue'
import { usePublicStore ,useMessageStore} from '@/store';
import ChatMessage from './ChatMessage.vue';
import MessageInput from './MessageInput.vue';
// 组件导入
import { useRoute } from 'vue-router'

const route = useRoute()
//Store
const publicStore = usePublicStore();
const messageStore = useMessageStore();
//计算属性
const container = ref(null)
//方法
watch(
    () => messageStore.chatConversation,
    async (newVal) => {
        if (newVal && newVal !== 'null') {
            await nextTick() // 等待 v-show 生效
            scrollToBottom()
        }
    },
    { immediate: true }
)
const scrollToBottom = () => {
    container.value.scrollTop = container.value.scrollHeight
}

const messageList = computed(() => {
  return messageStore.selectedConversation?.messageVOList || []
})
//生命周期
onMounted(() => {
    messageStore.setChatConversation(route.params.conversationId)
})
onBeforeUnmount(() => {

})
</script>