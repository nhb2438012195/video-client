<template>
    <div class="h-full w-full bg-slate-100 flex ">
        <!-- 左侧聊天对象列表 -->
        <div class=" h-full w-[240px] ">
            <div class="h-full overflow-y-auto">
                <div v-for="recipient in messageStore.chatConversationList" :key="recipient.conversationId">
                    <ChatRecipient :recipient-data="recipient" />
                </div>
            </div>

        </div>
        <!-- 聊天内容 -->
        <div class="h-full w-full">

            <router-view></router-view>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, provide, watch, nextTick } from 'vue'
import { usePublicStore, useMessageStore } from '@/store';


// 组件导入
import ChatRecipient from './children/ChatRecipient.vue';
import MessageInput from './children/MessageInput.vue';
import ChatMessage from './children/ChatMessage.vue';
import ConversationPanel from './children/ConversationPanel.vue';
//Store
import { useRoute } from 'vue-router'

const route = useRoute()
const publicStore = usePublicStore();
const messageStore = useMessageStore();
//计算属性
const chatTarget = ref('null');
//方法
const container = ref(null)
// 监听 chatConversation 变化

//让滚动条滚动到最底部
const scrollToBottom = () => {
    container.value.scrollTop = container.value.scrollHeight
}
provide('scrollToBottom', scrollToBottom);
//生命周期
onMounted(() => {
    messageStore.connect()
        .then(() => {
            console.log('连接成功，可以发消息了');
        })
        .catch(err => {
            console.error('连接失败:', err.message);
            // 可提示用户“网络异常”，但 STOMP 仍在后台重连！
        });
     //获取会话列表
     messageStore.conversationList()
    messageStore.setChatConversation(route.params.conversationId)
     console.log("messageStore.chatConversation"+messageStore.chatConversation)
})
onBeforeUnmount(() => {

})
</script>