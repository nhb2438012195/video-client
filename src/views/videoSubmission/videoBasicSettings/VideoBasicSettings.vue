<template>
  <!-- 组件外层容器：自适应父容器宽高，内容溢出时纵向滚动，内边距适配，盒模型规范 -->
  <div class="w-full h-full p-6 overflow-y-auto bg-white box-border">
    <!-- 顶部标题与操作栏 -->
    <div class="flex items-center justify-between mb-8">
      <h2 class="text-xl font-bold text-gray-800 m-0">基本设置</h2>
      <!-- 一键填写按钮，功能逻辑由您自行实现 -->
      <el-button>一键填写</el-button>
    </div>

    <!-- 封面设置模块 - 必填项 -->
    <div class="mb-8">
      <!-- 模块标签，带必填红色星号标记 -->
      <label class="block mb-3 text-sm font-medium text-gray-700">
        <span class="text-red-500 mr-1">*</span>封面
      </label>

      <!-- 主封面展示与设置入口 -->
      <div class="relative w-[180px] h-[100px] rounded-md overflow-hidden mb-4">
        <!-- 封面主图，可自行替换src地址 -->
        <img 
          src="https://picsum.photos/id/237/360/200" 
          alt="视频封面" 
          class="w-full h-full object-cover"
        />
        <!-- 封面设置按钮悬浮层，常驻显示与设计图一致 -->
        <div class="absolute inset-0 bg-black/30 flex items-center justify-center">
          <el-button type="primary" size="small">封面设置</el-button>
        </div>
      </div>

      <!-- 智能推荐封面区域 -->
      <div class="w-full bg-gray-50 rounded-lg p-4">
        <!-- 辅助提示文字 -->
        <p class="text-xs text-gray-500 mb-3">系统默认选中第一帧为视频封面，以下为更多智能推荐封面</p>
        <!-- 推荐封面列表，支持横向换行适配不同宽度 -->
        <div class="flex gap-3 flex-wrap">
          <div 
            v-for="(cover, index) in recommendCoverList" 
            :key="index" 
            class="relative w-[120px] h-[70px] rounded-md overflow-hidden border-2 transition-all"
            :class="activeCoverIndex === index ? 'border-primary' : 'border-transparent hover:border-gray-200'"
          >
            <!-- 推荐封面缩略图 -->
            <img 
              :src="cover.coverUrl" 
              :alt="`推荐封面${index + 1}`" 
              class="w-full h-full object-cover"
            />
            <!-- 选中状态对勾标识，默认选中第一个与设计图一致 -->
            <div v-if="activeCoverIndex === index" class="absolute top-1 left-1 text-primary">
              <el-icon><CircleCheckFilled /></el-icon>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 标题设置模块 - 必填项 -->
    <div class="mb-8">
      <label class="block mb-3 text-sm font-medium text-gray-700">
        <span class="text-red-500 mr-1">*</span>标题
      </label>
      <!-- 标题输入框，带右侧实时字数统计 -->
      <div class="relative w-full">
        <el-input 
          v-model="formData.title" 
          maxlength="80" 
          placeholder="请输入视频标题"
          class="w-full"
        />
        <!-- 字数统计，固定悬浮在输入框右侧，与设计图位置一致 -->
        <span class="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">
          {{ formData.title.length }}/80
        </span>
      </div>
    </div>

    <!-- 分区选择模块 - 必填项 -->
    <div class="mb-8">
      <label class="block mb-3 text-sm font-medium text-gray-700">
        <span class="text-red-500 mr-1">*</span>分区
      </label>
      <!-- 分区下拉选择器，可自行扩展option选项 -->
      <el-select v-model="formData.partition" class="w-full max-w-xs">
        <el-option label="vlog" value="vlog" />
        <el-option label="游戏" value="game" />
        <el-option label="生活" value="life" />
        <el-option label="动画" value="anime" />
      </el-select>
    </div>

    <!-- 标签设置模块 - 必填项 -->
    <div class="mb-8">
      <label class="block mb-3 text-sm font-medium text-gray-700">
        <span class="text-red-500 mr-1">*</span>标签
        <!-- 帮助提示气泡，与设计图问号图标一致 -->
        <el-tooltip content="按回车键Enter创建标签" placement="top">
          <el-icon class="ml-1 text-gray-400"><QuestionFilled /></el-icon>
        </el-tooltip>
      </label>
      <!-- 标签输入框，带剩余可添加数量提示 -->
      <div class="relative w-full">
        <el-input 
          v-model="tagInput" 
          placeholder="按回车键Enter创建标签"
          class="w-full"
          @keyup.enter.prevent="handleAddTag"
        />
        <!-- 剩余可添加标签数量提示，与设计图位置一致 -->
        <span class="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">
          还可以添加{{ maxTagCount - tagList.length }}个标签
        </span>
      </div>
      <!-- 已添加标签展示区域，预留完整结构，可直接使用 -->
      <div v-if="tagList.length > 0" class="flex flex-wrap gap-2 mt-3">
        <el-tag
          v-for="(tag, index) in tagList"
          :key="index"
          closable
          @close="handleRemoveTag(index)"
        >
          {{ tag }}
        </el-tag>
      </div>
    </div>

    <!-- 简介设置模块 - 非必填项 -->
    <div class="mb-8">
      <label class="block mb-3 text-sm font-medium text-gray-700">简介</label>
      <!-- 简介文本域，自带右下角字数统计，与设计图一致 -->
      <el-input
        v-model="formData.description"
        type="textarea"
        :rows="6"
        maxlength="2000"
        placeholder="填写更全面的相关信息，让更多的人能找到你的视频吧"
        class="w-full"
        show-word-limit
      />
    </div>

    <!-- 底部提交按钮 -->
    <div class="pt-2 pb-4">
      <el-button type="primary" size="large" class="px-8" @click="handleSubmit">立即投稿</el-button>
    </div>
  </div>
</template>

<script setup>
// 导入Vue3核心响应式API
import { ref, reactive } from 'vue'

// 【图标补充说明】如果ElementPlus图标未全局导入，请取消下面一行的注释
// import { CircleCheckFilled, QuestionFilled } from '@element-plus/icons-vue'

// ====================== 响应式数据定义（全组件内部维护，无需父组件传参） ======================
/**
 * 表单核心数据对象
 * 所有表单字段统一在此管理，可自行扩展字段
 */
const formData = reactive({
  title: 'shilishiping-1080p', // 标题默认值，与设计图示例一致
  partition: 'vlog', // 分区默认值，与设计图示例一致
  description: '' // 简介内容
})

/**
 * 推荐封面列表
 * 可自行替换图片地址、增减封面数量
 */
const recommendCoverList = ref([
  { coverUrl: 'https://picsum.photos/id/237/240/140' },
  { coverUrl: 'https://picsum.photos/id/238/240/140' },
  { coverUrl: 'https://picsum.photos/id/239/240/140' },
  { coverUrl: 'https://picsum.photos/id/240/240/140' },
  { coverUrl: 'https://picsum.photos/id/241/240/140' }
])

// 当前选中的推荐封面索引，默认选中第一个，与设计图一致
const activeCoverIndex = ref(0)

// 标签相关配置与数据
const tagInput = ref('') // 标签输入框绑定值
const tagList = ref([]) // 已添加的标签列表
const maxTagCount = 10 // 最大可添加标签数量，与设计图提示一致

// ====================== 功能方法预留（空实现，可自行完善业务逻辑） ======================
/**
 * 回车添加标签方法
 * 已预留基础非空、数量限制、去重逻辑，可自行修改扩展
 */
const handleAddTag = () => {
  const inputValue = tagInput.value.trim()
  // 空值不处理
  if (!inputValue) return
  // 超出最大数量不处理
  if (tagList.value.length >= maxTagCount) return
  // 去重添加
  if (!tagList.value.includes(inputValue)) {
    tagList.value.push(inputValue)
  }
  // 添加后清空输入框
  tagInput.value = ''
}

/**
 * 删除已添加标签方法
 * @param {number} index 要删除的标签数组索引
 */
const handleRemoveTag = (index) => {
  tagList.value.splice(index, 1)
}

/**
 * 表单提交/立即投稿核心方法
 * 可在此实现表单校验、接口请求、文件上传等业务逻辑
 */
const handleSubmit = () => {
  // 示例：打印当前表单全量数据，可自行删除
  console.log('投稿表单数据', {
    formData,
    selectedCover: recommendCoverList.value[activeCoverIndex.value],
    tagList: tagList.value
  })
  // 后续业务逻辑由您自行实现
}
</script>