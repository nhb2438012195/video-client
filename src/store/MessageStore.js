import { defineStore } from 'pinia'
import { setCookie, getCookie, removeCookie } from '@/utils/cookies'
import { Client } from '@stomp/stompjs'
import { ref, computed, nextTick } from 'vue'
import { getConversationList } from '@/api/message'
import { useUserStore } from './UserStore'
import { useRoute } from 'vue-router'

export const useMessageStore = defineStore('message',
    () => {
        const route = useRoute()
        const userStore = useUserStore();
        //会话列表
        const chatConversationList = ref( []);
        //用户选中的会话(保存聊天对象id)
        const chatConversation = ref("-1");
        //获取用户选中的会话对象
        const selectedConversation = computed(() => 
            chatConversationList.value.find(u => u.conversationId === chatConversation.value)
        );
        //会话分页大小
        const conversationPageSize = ref(10);
        //下次要获取的会话列表的页数
        const conversationPageNum = ref(1);


        let stompClient = null;
        //获取会话列表
        function conversationList() {
            getConversationList({
                page: conversationPageNum.value,
                pageSize: conversationPageSize.value
            }).then(res => {
                if (!res.data) {
                    ElMessage.error("获取会话列表失败");
                    // 重新获取会话列表，等待几秒
                    setTimeout(() => {
                        conversationList()
                    }, 10000);
                    conversationList()
                    return;
                }
                chatConversationList.value = res.data;
                conversationPageNum.value = conversationPageNum.value + 1;
                console.log("获取会话列表成功：", res.data);
                setChatConversation(route.params.conversationId)
            })
                .catch(err => {
                    console.log(err);
                })
        }
        //用户选择指定会话
        function setChatConversation(id) {
            chatConversation.value = id;
        }
        //获取更多的会话聊天消息
        function ConversationMessages(data) {

        }
        //收到消息
        function handleMessage(message) {
            console.log('收到消息:', message);
            // 查找接收消息的会话
            const targetConversation = chatConversationList.value.find(u => u.conversationId === message.conversationId)
            //插入新消息(插到列表末尾)
            insertNewMessage(message, targetConversation)
            //对会话重新排列
            sortConversationList()
            //如果不是选中的会话,就加上未读提示
            if (message.conversationId != chatConversation.value) {
                conversationAddUnread(targetConversation)
            }
            else {
                //否则就告诉后端已读
            }
        }
        //修改指定会话为已读
        function conversationMarkAsRead(conversation) {
            //这里要修改数据库
        }
        //给指定会话加上未读标识
        function conversationAddUnread(conversation) {

        }
        //对会话重新排序
        function sortConversationList() {
        }
        //将新消息列表插入指定消息列表头部
        function insertNewMessageList(newMessageList, messageList) {
        }
        //将新消息插入指定消息列表末尾
        function insertNewMessage(newMessage, messageList) {
        }
        //进行连接
        function connect() {
            if (stompClient?.connected || userStore.userInfo.userId === "-1") {
                return Promise.resolve();
            }

            return new Promise((resolve, reject) => {
                stompClient = new Client({
                    brokerURL: process.env.VUE_APP_WS_URL,
                    connectHeaders: {
                        Authorization: 'Bearer ' + getCookie(process.env.VUE_APP_TOKEN_NAME),
                    },

                    onConnect: () => {
                        console.log(' STOMP 连接成功');

                        // 订阅路径修正（重要！）
                        stompClient.subscribe('/user/queue/private', (message) => {
                            handleMessage(message);
                        });
                        resolve();
                    },

                    onStompError: (frame) => {
                        const msg = frame.headers['message'] || 'STOMP error';
                        console.error('STOMP 错误:', msg);
                        reject(new Error(msg));
                    },

                    // 监听 WebSocket 关闭
                    onWebSocketClose: (event) => {
                        console.log(' WebSocket 已关闭', event.code, event.reason);
                        stompClient = null;
                    },

                    // 可选：监听 WebSocket 底层错误
                    onWebSocketError: (error) => {
                        console.error(' WebSocket 底层错误:', error);
                    },

                    reconnectDelay: 10000, // 自动重连间隔（毫秒）
                });

                // 启动连接
                stompClient.activate();
            });
        }

        // 发送消息示例
        function sendMessage(content) {
            if (stompClient && stompClient.connected) {
                stompClient.publish({
                    destination: '/app/chat/private',
                    body: JSON.stringify({ toUserId: selectedConversation.value.conversationUserInfoVO.userId, content })
                });
            }
        }
        // 2. 在任意地方发消息（比如按钮点击）
        function sendPrivateMessage(toUserName, content) {
            if (!stompClient || !stompClient.connected) {
                console.warn('STOMP 未连接，无法发送消息');
                return;
            }

            stompClient.send('/app/chat/private', {}, JSON.stringify({
                toUserName: toUserName,
                content: content
            }));
        }

        return {
            sendMessage,
            connect,
            sendPrivateMessage,
            conversationList,
            setChatConversation,
            selectedConversation,
            ConversationMessages,
            chatConversation,
            chatConversationList
        }
    }
)