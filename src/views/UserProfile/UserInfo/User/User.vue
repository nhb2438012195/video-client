<template>
  <!-- 外层容器：占满父容器宽高，完全透明背景，垂直居中布局，防止内容溢出 -->
  <div class="w-full h-full flex items-center gap-4 md:gap-6 bg-transparent overflow-hidden px-16">
    <!-- 左侧头像区域 -->
    <div class="relative flex-shrink-0">
      <!-- ElementPlus上传组件：隐藏默认列表，内部处理头像上传全逻辑 -->
      <el-upload
        class="avatar-uploader"
        action="#"
        :before-upload="beforeAvatarUpload"
        :on-change="handleAvatarChange"
        :show-file-list="false"
        accept="image/*"
      >
        <!-- 头像容器：圆形+淡白色边框，hover高亮边框，group用于控制子元素hover状态 -->
        <div
          class="
            relative group cursor-pointer rounded-full overflow-hidden
            w-20 h-20 md:w-24 md:h-24
            border-2 border-white/60
            transition-all duration-300 hover:border-white/90
          "
        >
          <!-- 头像图片：铺满容器，保持比例 -->
          <img :src="avatarUrl" alt="用户头像" class="w-full h-full object-cover" />
          <!-- hover遮罩层：默认透明，鼠标移入显示更换头像提示 -->
          <div
            class="
              absolute inset-0 bg-black/40 flex items-center justify-center
              opacity-0 group-hover:opacity-100
              transition-opacity duration-300
            "
          >
            <span class="text-white text-xs md:text-sm font-medium">更换头像</span>
          </div>
        </div>
      </el-upload>
    </div>

    <!-- 右侧信息区域：用户名在上，个性签名在下，flex-1占满剩余宽度，防止溢出 -->
    <div class="flex flex-col justify-center flex-1 min-w-0 overflow-hidden">
      <!-- 用户名：大字体加粗，溢出省略，加文字阴影适配透明背景，保证可读性 -->
      <div
        class="
          text-white font-bold text-2xl md:text-4xl
          truncate
          [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]
        "
      >
        {{ username }}
      </div>

      <!-- 个性签名区域：点击编辑，失焦/回车保存，esc取消 -->
      <div class="mt-1 md:mt-2">
        <!-- 非编辑状态：文本展示，点击进入编辑 -->
        <span
          v-if="!isEditing"
          @click="handleEditSign"
          class="
            text-white/80 text-base md:text-xl
            cursor-pointer hover:text-white
            transition-colors duration-200
            truncate block
            [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]
          "
        >
          {{ userSign || '编辑个性签名' }}
        </span>

        <!-- 编辑状态：输入框，绑定键盘事件与失焦事件 -->
        <el-input
          v-else
          ref="signInputRef"
          v-model="tempSign"
          @keyup.enter="handleSaveSign"
          @keyup.esc="handleCancelEdit"
          @blur="handleSaveSign"
          class="sign-input"
          placeholder="请输入个性签名"
          autocomplete="off"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
// 导入Vue3核心API
import { ElMessage } from 'element-plus'
import { ref, nextTick } from 'vue'
// ElementPlus已全局导入，无需单独导入，直接使用组件与API

// 可选Props：父组件可传入初始值，不传则使用默认值，保证组件完全独立
const props = defineProps({
  // 默认头像地址
  defaultAvatar: {
    type: String,
    default: 'https://picsum.photos/id/64/200/200' // 示例默认头像，可替换
  },
  // 默认用户名
  defaultUsername: {
    type: [String, Number],
    default: '9439228615'
  },
  // 默认个性签名
  defaultSign: {
    type: String,
    default: '编辑个性签名'
  }
})

// ===================== 响应式状态定义 =====================
// 头像地址：内部维护，初始化使用props传入的默认值
const avatarUrl = ref(props.defaultAvatar)
// 用户名：内部维护
const username = ref(props.defaultUsername)
// 个性签名原始值：持久化存储的内容
const userSign = ref(props.defaultSign)
// 编辑临时值：编辑过程中使用，取消编辑时不污染原始值
const tempSign = ref('')
// 个性签名编辑状态开关
const isEditing = ref(false)
// 个性签名输入框DOM引用，用于自动聚焦
const signInputRef = ref(null)

// ===================== 头像相关方法 =====================
/**
 * 头像上传前格式&大小校验
 * @param {File} file 选中的图片文件
 * @returns {Boolean} 是否通过校验
 */
const beforeAvatarUpload = (file) => {
  // 校验文件格式：仅允许图片类型
  const isImage = file.type.startsWith('image/')
  if (!isImage) {
    ElMessage.error('只能上传图片格式文件！')
    return false
  }
  // 校验文件大小：限制2MB以内
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    ElMessage.error('图片大小不能超过 2MB！')
    return false
  }
  return true
}

/**
 * 头像文件选中后的处理逻辑
 * 这里做本地模拟预览，真实场景可替换为接口上传逻辑
 * @param {Object} file 上传文件对象
 */
const handleAvatarChange = (file) => {
  // 先执行校验，不通过直接终止
  const isVerifyPass = beforeAvatarUpload(file.raw)
  if (!isVerifyPass) return

  // 模拟上传成功：生成本地临时预览地址
  // 真实业务场景：这里调用后端上传接口，将返回的线上地址赋值给avatarUrl
  avatarUrl.value = URL.createObjectURL(file.raw)
  ElMessage.success('头像更换成功！')
}

// ===================== 个性签名编辑相关方法 =====================
/**
 * 点击个性签名，进入编辑状态
 */
const handleEditSign = () => {
  // 将当前签名赋值给临时变量，用于编辑过程中暂存
  tempSign.value = userSign.value
  // 开启编辑状态
  isEditing.value = true
  // 等待DOM渲染完成后，自动聚焦输入框并选中全部内容，提升编辑体验
  nextTick(() => {
    if (signInputRef.value) {
      signInputRef.value.focus()
      signInputRef.value.select()
    }
  })
}

/**
 * 保存个性签名：失焦/回车触发
 */
const handleSaveSign = () => {
  // 去除首尾空格后赋值给原始值
  userSign.value = tempSign.value.trim()
  // 关闭编辑状态
  isEditing.value = false
  // 真实业务场景：这里可调用后端接口，保存个性签名到服务端
  ElMessage.success('个性签名保存成功！')
}

/**
 * 取消编辑：ESC键触发，恢复原始内容
 */
const handleCancelEdit = () => {
  // 重置临时变量为原始内容
  tempSign.value = userSign.value
  // 关闭编辑状态
  isEditing.value = false
}
</script>

<style scoped>
/* 编辑输入框样式覆盖：与文本样式保持一致，完全透明无边框，无突兀感 */
:deep(.sign-input .el-input__wrapper) {
  background-color: transparent;
  box-shadow: none;
  padding: 0;
}

/* 输入框文字样式：与非编辑状态文本完全匹配 */
:deep(.sign-input .el-input__inner) {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
  line-height: 1.5;
  padding: 0;
  height: auto;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

/* 响应式适配：中等屏幕以上放大输入框字体 */
@media (min-width: 768px) {
  :deep(.sign-input .el-input__inner) {
    font-size: 1.25rem;
  }
}

/* 占位符样式 */
:deep(.sign-input .el-input__inner::placeholder) {
  color: rgba(255, 255, 255, 0.6);
}

/* 聚焦时去除默认阴影，保持透明样式 */
:deep(.sign-input .el-input__wrapper.is-focus) {
  box-shadow: none;
}
</style>