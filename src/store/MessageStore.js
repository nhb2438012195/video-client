import { defineStore } from 'pinia'
import { setCookie, getCookie, removeCookie } from '@/utils/cookies'
import { Client } from '@stomp/stompjs'
import { ref, computed, nextTick } from 'vue'
import { getConversationList } from '@/api/message'
import { useUserStore } from './UserStore'
import { useRoute } from 'vue-router'
import { v4 as uuidv4 } from 'uuid';
export const useMessageStore = defineStore('message',
    () => {
        const route = useRoute()
        const userStore = useUserStore();
        //会话列表
        const chatConversationList = ref([]);
        //用户选中的会话(保存聊天对象id)
        const chatConversation = ref("-1");
        //获取用户选中的会话对象
        const selectedConversation = computed(() =>
            chatConversationList.value?.find(u => u.conversationId === chatConversation.value)
        );
        //会话分页大小
        const conversationPageSize = ref(10);
        //下次要获取的会话列表的页数
        const conversationPageNum = ref(1);

        // STOMP 客户端
        let stompClient = null;
        //是否正在等待登录检查
        let isWaitingForLoginCheck = false;
        //待处理消息id列表
        const pendingMessageIdList = ref([]);
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
                chatConversationList.value = res.data.userConversationListVO;
                conversationPageNum.value = conversationPageNum.value + 1;
                console.log("获取会话列表成功：", chatConversationList.value);
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

        //进行连接
        async function connect() {
            if (stompClient?.connected) {
                console.log('已连接，无需再次连接');
                return Promise.resolve();
            }
            // 2. 登录验证未完成（userId=-1）：等待状态变化
            if (userStore.userInfo.userId === "-1") {
                // 如果已有等待中的请求，直接复用（避免重复轮询）
                if (isWaitingForLoginCheck) {
                    console.log('已有请求等待登录验证完成，复用等待结果...');
                } else {
                    isWaitingForLoginCheck = true;
                    console.log('登录验证未完成，等待状态更新...');
                }

                // 等待直到userId != -1
                await waitForLoginStatus()
                    .then(() => {
                        console.log('登录验证成功，开始连接...');
                        isWaitingForLoginCheck = false;
                    }
                    )
                    .catch(err => {
                        console.log('登录验证失败：', err);
                        return Promise.reject(err);
                    })
                    ;
                // 状态更新后，递归调用connect（此时userId已不是-1）
                return connect();
            }

            // 3. 验证完成但未登录（userId=-2）：返回失败
            if (userStore.userInfo.userId === "-2") {
                console.log('用户未登录');
                return Promise.reject(new Error('请先登录'));
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
                console.log('正在尝试连接...');
                // 启动连接
                stompClient.activate();

            });
        }
        //将新消息插入指定消息列表末尾
        function insertNewMessage(newMessage, Conversation) {
            console.log("插入新消息：", newMessage, "到", Conversation);
            Conversation.messageVOList.push(newMessage);
            Conversation.lastMessageContent=newMessage.content;
        }
        //收到消息
        function handleMessage(message) {
            let messageData
            try {
                messageData = JSON.parse(message.body);
            } catch (parseErr) {
                console.error('消息体解析失败：', parseErr, message.body);
                return;
            }
            console.log('收到消息:', messageData);
            // 查找接收消息的会话
            const targetConversation = chatConversationList.value.find(u => u.conversationId === messageData.conversationId)
            if (!targetConversation) {
                console.error('找不到接收消息的会话：', messageData.conversationId);
                return;
            }
            //处理确认消息
            if (messageData.messageType === "0") {
                //删除临时消息
                // 1. 找到目标值的索引（找不到返回 -1）
                const index = pendingMessageIdList.value.findIndex(item => item === messageData.messageId);
                // 2. 找到则删除（splice 会修改原数组，且保留响应式）
                if (index > -1) {
                    pendingMessageIdList.value.splice(index, 1); // 从index位置删除1个元素
                    console.log("删除临时消息：", messageData.messageId);
                }
                return
            }
            //处理收到的文本聊天消息
            if (messageData.messageType === "1") { 
                //插入新消息
                insertNewMessage(messageData, targetConversation)
            }
            console.log("更新会话列表：", chatConversationList.value);
            //如果不是选中的会话,就加上未读提示
            if (message.conversationId != chatConversation.value) {
                conversationAddUnread(targetConversation)
            }
            else {
                //否则就告诉后端已读
            }
        }
        // 发送消息示例
        function sendMessage(content) {
            // 1. 打印连接状态和要发送的数据（关键排查日志）
            console.log('STOMP连接状态:', stompClient ? stompClient.connected : 'stompClient不存在');
            console.log('要发送的消息数据:', {
                toUserId: selectedConversation.value?.conversationUserInfoVO?.userId,
                content: content
            });
            //临时消息id
            const messageId = uuidv4();
            const messageData = {
                messageId: messageId,
                toUserId: selectedConversation.value.conversationUserInfoVO.userId,
                content: content,
                conversationId: selectedConversation.value.conversationId,
                messageType: 1
            }
            if (stompClient && stompClient.connected) {
                stompClient.publish({
                    destination: '/app/chat/private',
                    body: JSON.stringify(messageData)
                });
                pendingMessageIdList.value.push(messageId);
                console.error('临时消息id需要定时器10s内没有确认就修改消息类型为错误消息:', pendingMessageIdList);
                insertNewMessage(messageData, selectedConversation.value)
            }
            else {
                console.warn('STOMP 未连接，无法发送消息');
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
        /**
         * 等待登录状态更新（userId从-1变为-2或有效ID）
         * @returns {Promise} 状态更新后resolve，超时则reject
         */
        function waitForLoginStatus() {
            return new Promise((resolve, reject) => {
                const checkInterval = 500; // 每500ms检查一次状态
                const maxWaitTime = 10000; // 最大等待10秒
                let elapsedTime = 0;

                const checkStatus = setInterval(() => {
                    const userId = userStore.userInfo.userId;
                    elapsedTime += checkInterval;

                    // 状态更新：脱离-1，结束等待
                    if (userId !== "-1") {
                        clearInterval(checkStatus);
                        isWaitingForLoginCheck = false;
                        resolve();
                        return;
                    }

                    // 超时：登录验证超过10秒未完成，结束等待并报错
                    if (elapsedTime >= maxWaitTime) {
                        clearInterval(checkStatus);
                        isWaitingForLoginCheck = false;
                        reject(new Error('登录验证超时，请刷新页面重试'));
                    }
                }, checkInterval);
            });
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