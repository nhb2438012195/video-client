import { defineStore } from 'pinia'
import { ref, computed, onScopeDispose } from 'vue'
import { useRoute } from 'vue-router'
import { Client } from '@stomp/stompjs'
import { ElMessage } from 'element-plus'
import { v4 as uuidv4 } from 'uuid'
import { getCookie } from '@/utils/cookies'
import { getConversationList } from '@/api/message'
import { useUserStore } from './UserStore'

// 常量定义（抽离硬编码，便于维护）
const WS_RECONNECT_DELAY = 10000 // STOMP重连间隔
const LOGIN_CHECK_INTERVAL = 500 // 登录状态检查间隔
const LOGIN_CHECK_TIMEOUT = 10000 // 登录检查超时时间
const CONVERSATION_RETRY_MAX = 3 // 会话列表最大重试次数

export const useMessageStore = defineStore('message', () => {
  // ====== 1. 外部依赖 ======
  const route = useRoute()
  const userStore = useUserStore()

  // ====== 2. 响应式状态（所有可变状态用ref/reactive） ======
  // 会话相关
  const chatConversationList = ref([]) // 会话列表
  const chatConversation = ref('-1') // 选中的会话ID
  const conversationPageSize = ref(10) // 分页大小
  const conversationPageNum = ref(1) // 当前页码
  const conversationLoading = ref(false) // 会话列表加载状态
  const conversationRetryCount = ref(0) // 会话列表重试次数

  // STOMP连接相关（改为响应式，组件可感知）
  const stompClient = ref(null) // STOMP客户端
  const isWaitingForLoginCheck = ref(false) // 是否等待登录检查
  const isStompConnected = ref(false) // STOMP连接状态

  // 消息相关
  const pendingMessageIdList = ref([]) // 待确认消息ID列表
  const loginCheckTimer = ref(null) // 登录检查定时器（用于销毁）

  // ====== 3. 计算属性 ======
  // 获取选中的会话对象
  const selectedConversation = computed(() => {
    return chatConversationList.value?.find(
      (item) => item.conversationId === chatConversation.value
    ) || null
  })

  // ====== 4. 核心方法 ======
  /**
   * 获取会话列表（带防抖、重试、加载状态）
   */
  const conversationList = async () => {
    // 防抖：避免重复请求
    if (conversationLoading.value) return
    conversationLoading.value = true

    try {
      const res = await getConversationList({
        page: conversationPageNum.value,
        pageSize: conversationPageSize.value
      })

      // 数据校验
      if (!res?.data?.userConversationListVO) {
        throw new Error('会话列表数据格式异常')
      }

      // 更新状态
      chatConversationList.value = res.data.userConversationListVO
      conversationPageNum.value += 1
      conversationRetryCount.value = 0 // 重置重试次数
      console.log('获取会话列表成功：', chatConversationList.value)
      setChatConversation(route.params.conversationId)
    } catch (err) {
      console.error('获取会话列表失败：', err)
      ElMessage.error(`获取会话列表失败：${err.message}`)

      // 重试逻辑（最多3次）
      if (conversationRetryCount.value < CONVERSATION_RETRY_MAX) {
        conversationRetryCount.value += 1
        setTimeout(() => {
          conversationList()
        }, WS_RECONNECT_DELAY)
      } else {
        conversationRetryCount.value = 0
        ElMessage.error('获取会话列表失败，已重试3次，请刷新页面')
      }
    } finally {
      conversationLoading.value = false
    }
  }

  /**
   * 设置选中的会话
   * @param {string} id 会话ID
   */
  const setChatConversation = (id) => {
    // 校验：避免设置无效ID
    if (!id || typeof id !== 'string') return
    chatConversation.value = id
  }

  /**
   * 等待登录状态更新（userId从-1变为有效值/-2）
   * @returns {Promise<void>}
   */
  const waitForLoginStatus = () => {
    return new Promise((resolve, reject) => {
      let elapsedTime = 0
      // 清除旧定时器（避免重复）
      if (loginCheckTimer.value) clearInterval(loginCheckTimer.value)

      loginCheckTimer.value = setInterval(() => {
        const userId = userStore.userInfo?.userId
        elapsedTime += LOGIN_CHECK_INTERVAL

        // 状态更新：脱离-1
        if (userId !== '-1') {
          clearInterval(loginCheckTimer.value)
          isWaitingForLoginCheck.value = false
          resolve()
          return
        }

        // 超时处理
        if (elapsedTime >= LOGIN_CHECK_TIMEOUT) {
          clearInterval(loginCheckTimer.value)
          isWaitingForLoginCheck.value = false
          reject(new Error('登录验证超时，请刷新页面重试'))
        }
      }, LOGIN_CHECK_INTERVAL)
    })
  }

  /**
   * 初始化STOMP连接
   * @returns {Promise<void>}
   */
  const connect = async () => {
    // 已连接：直接返回
    if (isStompConnected.value) {
      console.log('STOMP已连接，无需重复连接')
      return Promise.resolve()
    }

    // 登录未完成：等待
    if (userStore.userInfo?.userId === '-1') {
      if (isWaitingForLoginCheck.value) {
        console.log('已有请求等待登录验证，复用等待结果')
      } else {
        isWaitingForLoginCheck.value = true
        console.log('登录验证未完成，等待状态更新...')
      }

      try {
        await waitForLoginStatus()
        console.log('登录验证成功，重新尝试连接STOMP')
        return connect() // 递归重连（此时登录状态已就绪）
      } catch (err) {
        ElMessage.error(err.message)
        return Promise.reject(err)
      }
    }

    // 未登录：直接失败
    if (userStore.userInfo?.userId === '-2') {
      const errMsg = '请先登录后再使用聊天功能'
      ElMessage.warning(errMsg)
      return Promise.reject(new Error(errMsg))
    }

    // 开始建立连接
    return new Promise((resolve, reject) => {
      // 销毁旧连接（避免内存泄漏）
      if (stompClient.value) {
        stompClient.value.deactivate()
        stompClient.value = null
      }

      // 创建新客户端
      stompClient.value = new Client({
        brokerURL: process.env.VUE_APP_WS_URL,
        connectHeaders: {
          Authorization: `Bearer ${getCookie(process.env.VUE_APP_TOKEN_NAME)}`
        },
        reconnectDelay: WS_RECONNECT_DELAY,
        onConnect: () => {
          console.log('STOMP连接成功')
          isStompConnected.value = true
          // 订阅私人消息
          stompClient.value.subscribe('/user/queue/private', handleMessage)
          resolve()
        },
        onStompError: (frame) => {
          const errMsg = frame.headers.message || 'STOMP连接失败'
          console.error('STOMP错误：', errMsg)
          isStompConnected.value = false
          ElMessage.error(`聊天连接失败：${errMsg}`)
          reject(new Error(errMsg))
        },
        onWebSocketClose: (event) => {
          console.log('WebSocket已关闭：', event.code, event.reason)
          isStompConnected.value = false
          stompClient.value = null
        },
        onWebSocketError: (error) => {
          console.error('WebSocket底层错误：', error)
          isStompConnected.value = false
        }
      })

      // 启动连接
      console.log('正在尝试连接STOMP...')
      stompClient.value.activate()
    })
  }

  /**
   * 处理收到的消息
   * @param {object} message STOMP消息对象
   */
  const handleMessage = (message) => {
    let messageData
    try {
      messageData = JSON.parse(message.body)
    } catch (parseErr) {
      console.error('消息解析失败：', parseErr, message.body)
      ElMessage.error('收到无效消息，请重试')
      return
    }

    console.log('收到聊天消息：', messageData)
    const targetConversation = chatConversationList.value.find(
      (item) => item.conversationId === messageData.conversationId
    )

    if (!targetConversation) {
      console.error('找不到目标会话：', messageData.conversationId)
      return
    }

    // 处理确认消息（删除临时消息）
    if (messageData.messageType === '0') {
      const index = pendingMessageIdList.value.findIndex(
        (id) => id === messageData.messageId
      )
      if (index > -1) {
        pendingMessageIdList.value.splice(index, 1)
        console.log('移除已确认的临时消息：', messageData.messageId)
      }
      return
    }

    // 处理文本消息
    if (messageData.messageType === '1') {
      insertNewMessage(messageData, targetConversation)
      // 非当前选中会话：标记未读
      if (messageData.conversationId !== chatConversation.value) {
        conversationAddUnread(targetConversation)
      } else {
        // TODO: 调用接口标记已读
        // conversationMarkAsRead(targetConversation)
      }
    }
  }

  /**
   * 发送聊天消息
   * @param {string} content 消息内容
   */
  const sendMessage = (content) => {
    if (!content || !selectedConversation.value) {
      ElMessage.warning('消息内容不能为空或未选择聊天对象')
      return
    }

    if (!stompClient.value || !isStompConnected.value) {
      ElMessage.warning('聊天连接已断开，请重新连接')
      connect().catch(() => {}) // 自动重连
      return
    }

    // 生成临时消息ID
    const messageId = uuidv4()
    const messageData = {
      messageId,
      toUserId: selectedConversation.value.conversationUserInfoVO?.userId,
      content,
      conversationId: selectedConversation.value.conversationId,
      messageType: 1
    }

    try {
      // 发送消息
      stompClient.value.publish({
        destination: '/app/chat/private',
        body: JSON.stringify(messageData)
      })

      // 加入待确认列表
      pendingMessageIdList.value.push(messageId)
      // 插入本地临时消息
      insertNewMessage(messageData, selectedConversation.value)

      // TODO: 临时消息超时处理（10秒未确认标记为失败）
      setTimeout(() => {
        const index = pendingMessageIdList.value.findIndex((id) => id === messageId)
        if (index > -1) {
          console.log('消息发送超时：', messageId)
          // 可在这里修改消息状态为失败
        }
      }, 10000)
    } catch (err) {
      console.error('发送消息失败：', err)
      ElMessage.error('消息发送失败，请重试')
    }
  }

  /**
   * 插入新消息到会话末尾
   * @param {object} newMessage 新消息
   * @param {object} conversation 目标会话
   */
  const insertNewMessage = (newMessage, conversation) => {
    if (!conversation.messageVOList) {
      conversation.messageVOList = []
    }
    conversation.messageVOList.push(newMessage)
    conversation.lastMessageContent = newMessage.content
    // 会话重新排序（最新消息排前面）
    sortConversationList()
  }

  // ====== 5. 待实现的方法（预留接口，统一命名） ======
  /**
   * 获取会话的聊天消息（分页）
   * @param {object} data 分页参数
   */
  const getConversationMessages = (data) => {
    // TODO: 实现消息分页查询逻辑
  }

  /**
   * 标记会话为已读
   * @param {object} conversation 目标会话
   */
  const conversationMarkAsRead = (conversation) => {
    // TODO: 调用接口修改数据库状态
    // 本地先更新状态，避免UI延迟
    if (conversation) {
      conversation.unread = false
      conversation.unreadCount = 0
    }
  }

  /**
   * 给会话添加未读标记
   * @param {object} conversation 目标会话
   */
  const conversationAddUnread = (conversation) => {
    if (conversation) {
      conversation.unread = true
      conversation.unreadCount = (conversation.unreadCount || 0) + 1
      // 会话重新排序
      sortConversationList()
    }
  }

  /**
   * 会话列表重新排序（最新消息排前面）
   */
  const sortConversationList = () => {
    chatConversationList.value.sort((a, b) => {
      const timeA = a.lastMessageTime || a.createTime || 0
      const timeB = b.lastMessageTime || b.createTime || 0
      return timeB - timeA
    })
  }

  /**
   * 发送私人消息（兼容旧逻辑，建议使用sendMessage）
   * @param {string} toUserName 接收者用户名
   * @param {string} content 消息内容
   */
  const sendPrivateMessage = (toUserName, content) => {
    ElMessage.warning('该方法已废弃，请使用sendMessage')
    // 兼容旧逻辑
    if (stompClient.value && isStompConnected.value) {
      stompClient.value.send(
        '/app/chat/private',
        {},
        JSON.stringify({ toUserName, content })
      )
    }
  }

  // ====== 6. 资源销毁（避免内存泄漏） ======
  onScopeDispose(() => {
    // 清除登录检查定时器
    if (loginCheckTimer.value) clearInterval(loginCheckTimer.value)
    // 断开STOMP连接
    if (stompClient.value) {
      stompClient.value.deactivate()
      stompClient.value = null
    }
    isStompConnected.value = false
    isWaitingForLoginCheck.value = false
    console.log('消息Store已销毁，资源已清理')
  })

  // ====== 7. 暴露给组件的状态和方法 ======
  return {
    // 状态
    chatConversationList,
    chatConversation,
    conversationLoading,
    isStompConnected,
    selectedConversation,
    // 方法
    conversationList,
    setChatConversation,
    connect,
    sendMessage,
    sendPrivateMessage,
    getConversationMessages,
    conversationMarkAsRead
  }
})