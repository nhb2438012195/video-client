<template>
  <!-- 登录组件容器 -->
  <div class="bg-white rounded-xl shadow-lg p-2 w-full max-w-md mx-auto transition-all duration-200"
    :class="$attrs.class">
    <!-- 切换标签 -->
    <div class="flex justify-center border-b border-gray-200 mb-6">
      <button type="button" class="px-4 py-2 text-blue-600 font-medium border-b-2 border-blue-600 transition-colors"
        :class="{ 'text-gray-500 border-transparent': !isPasswordMode }" @click="switchToPassword">
        密码登录
      </button>
      <button type="button"
        class="px-4 py-2 text-gray-500 font-medium border-b-2 border-transparent hover:text-blue-600 transition-colors"
        :class="{ '!text-blue-600 !border-blue-600': !isPasswordMode }" @click="switchToSMS">
        短信登录
      </button>
    </div>

    <!-- 密码登录表单 -->
    <form v-if="isPasswordMode" @submit.prevent="onPasswordLogin" class="">
      <div class="p-2 space-y-4">
        <div class="border rounded-lg border-gray-300">

          <!-- 账号输入 -->
          <div class="h-[44px]">
            <el-input v-model="account" placeholder="请输入账号" clearable class="w-full rounded-lg flat-input h-full p-4" />
          </div>
          <div class="border-t border-gray-300"></div>
          <!-- 密码输入 -->
          <div class="flex items-center h-[44px]">
            <el-input v-model="password" placeholder="请输入密码" type="password" clearable
              class="flex-1 rounded-lg flat-input h-full p-4" />
            <a href="#" class="ml-2 text-sm text-blue-600 hover:text-blue-800 cursor-pointer"
              @click.prevent="forgetPassword">
              忘记密码？
            </a>
          </div>
        </div>
        <!-- 按钮组 -->
        <div class="flex space-x-3">
          <el-button type="" size="large" class="flex-1" :disabled="!account.trim() || !password.trim()"
            @click="onRegister">
            注册
          </el-button>
          <el-button type="primary" size="large" class="flex-1" :disabled="!account.trim() || !password.trim()"
            @click="onPasswordLogin">
            登录
          </el-button>
        </div>
      </div>
    </form>

    <!-- 短信登录表单 -->
    <form v-else @submit.prevent="onSmsLogin" class="space-y-4 w-full p-2">
      <div class="border rounded-lg border-gray-300">
        <!-- 手机号输入 -->
        <div class="flex items-center h-[44px] w-full px-4 ">
          <el-select v-model="countryCode" size="large" class="flat-select !w-[80px]">
            <el-option label="+86" value="+86" />
          </el-select>
          <el-input v-model="phone" placeholder="请输入手机号" clearable class="flat-input flex-1 rounded-lg h-full p-4" />
          <el-button type="" size="small" link class="ml-2 px-4 py-1 text-sm !h-full "
            :disabled="!phone.trim() || countdown > 0" @click="onGetCode">
            {{ countdown > 0 ? `${countdown}秒后重试` : '获取验证码' }}
          </el-button>
        </div>
        <div class="border-t border-gray-300"></div>
        <!-- 验证码输入 -->
        <div class="h-[44px] w-full  ">
          <el-input v-model="code" placeholder="请输入验证码" clearable class="flat-input  w-full rounded-lg h-full p-4" />
        </div>
      </div>
      <!-- 登录/注册按钮 -->
      <el-button type="primary" size="large" class="w-full " :disabled="!phone.trim() || !code.trim()"
        @click="onSmsLogin">
        登录/注册
      </el-button>
    </form>
  </div>
</template>

<script setup>
// 1️⃣ 必须在顶部定义 emits（最佳实践）
const emit = defineEmits([
  'login',           // (account, password)
  'get-code',        // (phone)
  'sms-login',       // (phone, code)
  'register'         // (account)
])

import { ref, onBeforeUnmount } from 'vue'

// ========================
// 状态管理
// ========================
const isPasswordMode = ref(true)
const account = ref('')
const password = ref('')
const phone = ref('')
const code = ref('')
const countryCode = ref('+86')
const countdown = ref(0)
let timer = null

// ========================
// 方法定义
// ========================
const switchToPassword = () => {
  isPasswordMode.value = true
  // 切换时重置短信相关状态
  phone.value = ''
  code.value = ''
  countdown.value = 0
  clearInterval(timer)
}

const switchToSMS = () => {
  isPasswordMode.value = false
}

const forgetPassword = () => {
  alert('忘记密码功能待实现')
}

const onRegister = () => {
    const acc = account.value.trim()
  const pwd = password.value.trim()
  if (!acc || !pwd) return
  emit('register', acc, pwd)
}

const onPasswordLogin = () => {
  const acc = account.value.trim()
  const pwd = password.value.trim()
  if (!acc || !pwd) return
  emit('login', acc, pwd)
}

const onSmsLogin = () => {
  const p = phone.value.trim()
  const c = code.value.trim()
  if (!p || !c) return
  emit('sms-login', p, c)
}

const onGetCode = () => {
  const p = phone.value.trim()
  if (!p || countdown.value > 0) return // 防止重复点击

  emit('get-code', p)
  startCountdown()
}

const startCountdown = () => {
  countdown.value = 60
  clearInterval(timer)
  timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(timer)
      timer = null
    }
  }, 1000)
}

// ========================
// 生命周期清理
// ========================
onBeforeUnmount(() => {
  clearInterval(timer)
})
</script>

<style scoped>
/* 覆盖默认、悬停、聚焦状态 */
:deep(.flat-select .el-select__wrapper) {
  /* 移除内阴影（关键！） */
  box-shadow: none !important;

  /* 背景透明（可选，避免色差） */
  background-color: transparent !important;

  /* 可选：取消圆角，更扁平 */
  border-radius: 0 !important;

  /* 可选：调整内边距 */
  padding: 0 8px !important;
}

/* 悬停时也不加边框/阴影 */
:deep(.flat-select .el-select__wrapper:hover) {
  box-shadow: none !important;
  background-color: transparent !important;
}

/* 聚焦（点击）时也不出现边框 */
:deep(.flat-select .el-select__wrapper.is-focused) {
  box-shadow: none !important;
  background-color: transparent !important;
}

/* 额外：确保下拉箭头区域也无干扰 */
:deep(.flat-select .el-select__caret) {
  color: inherit !important;
  /* 保持箭头颜色一致 */
}

/* 移除默认边框、内阴影、聚焦效果 */
:deep(.flat-input .el-input__wrapper) {
  box-shadow: none !important;
  /* 关键：移除 inset 内边框 */
  border: none !important;
  background: transparent !important;
  /* 背景透明 */
  padding: 0 !important;
  /* 可选：移除内边距 */
}

/* 悬停时也不加边框 */
:deep(.flat-input .el-input__wrapper:hover) {
  box-shadow: none !important;
}

/* 聚焦（点击）时也不出现边框或阴影 */
:deep(.flat-input .el-input__wrapper.is-focused) {
  box-shadow: none !important;
  outline: none !important;
}

/* 确保内部 input 也无样式干扰 */
:deep(.flat-input input) {
  background: transparent !important;
  border: none !important;
  outline: none !important;
  box-shadow: none !important;
  /* 可选：继承父级文字样式 */
  color: inherit;
  font-size: inherit;
}
</style>