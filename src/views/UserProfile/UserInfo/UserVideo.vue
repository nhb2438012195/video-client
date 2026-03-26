<template>
  <!-- 组件外层容器：完全自适应父容器宽高，纵向flex布局，溢出隐藏，自带圆角与白底 -->
  <div class="w-full h-full flex flex-col overflow-hidden bg-white rounded-lg">
    <!-- 顶部操作栏：标题+标签切换+操作按钮，flex-shrink-0 固定不随滚动压缩 -->
    <div class="flex flex-wrap justify-between items-center gap-3 mb-4 flex-shrink-0 px-1">
      <!-- 左侧区域：标题 + 标签切换组 -->
      <div class="flex items-center gap-4 flex-wrap">
        <!-- 视频总数标题，对应截图左上角「视频 · 62」 -->
        <h2 class="text-xl font-bold text-gray-800 m-0">视频 · {{ totalCount }}</h2>
        
        <!-- 标签切换按钮组：ElementPlus单选按钮组，实现互斥切换，样式与截图完全匹配 -->
        <el-radio-group v-model="activeTab" size="default">
          <el-radio-button label="latest">最新发布</el-radio-button>
          <el-radio-button label="hot">最多播放</el-radio-button>
          <el-radio-button label="collect">最多收藏</el-radio-button>
        </el-radio-group>
      </div>

      <!-- 右侧区域：操作按钮组 -->
      <div class="flex items-center gap-2 flex-shrink-0">
        <!-- 播放全部按钮，带播放图标 -->
        <el-button>
          <el-icon><VideoPlay /></el-icon>
          播放全部
        </el-button>
        <!-- 查看更多按钮：文本样式，带右箭头，与截图样式对齐 -->
        <el-button type="text" class="flex items-center">
          查看更多
          <el-icon class="ml-1"><ArrowRight /></el-icon>
        </el-button>
      </div>
    </div>

    <!-- 视频卡片列表容器：flex-1 占满剩余高度，纵向溢出滚动，横向内容隐藏 -->
    <div class="flex-1 overflow-y-auto overflow-x-hidden px-1">
      <!-- 视频卡片网格布局：响应式列数，完美适配不同屏幕宽度 -->
      <!-- 适配规则：移动端2列、小屏平板3列、中屏桌面4列、大屏桌面5列，固定间距 -->
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 w-full pb-2">
        <!-- 视频卡片循环渲染，使用mock数据，您可直接替换为真实业务数据 -->
        <div 
          v-for="item in videoList" 
          :key="item.id"
          class="video-card flex flex-col gap-2 group cursor-pointer"
        >
        <!-- 视频卡牌内容 -->
          <!-- 视频封面容器：16:9标准视频比例，相对定位承载封面、播放量、时长等信息 -->
          <div class="relative w-full aspect-video rounded-md overflow-hidden bg-gray-100 shadow-sm">
            <!-- 封面图片：hover时轻微放大，增加交互质感，过渡动画平滑 -->
            <img 
              :src="item.cover" 
              :alt="item.title"
              class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />

            <!-- 左下角：播放量 + 评论数，半透明黑底+毛玻璃效果，与截图样式对齐 -->
            <div class="absolute bottom-2 left-2 flex items-center gap-2">
              <!-- 播放量标签 -->
              <span class="flex items-center gap-1 text-white text-xs bg-black/60 rounded px-1.5 py-0.5 backdrop-blur-sm">
                <el-icon><View /></el-icon>
                {{ formatCount(item.playCount) }}
              </span>
              <!-- 评论数标签 -->
              <span class="flex items-center gap-1 text-white text-xs bg-black/60 rounded px-1.5 py-0.5 backdrop-blur-sm">
                <el-icon><ChatDotRound /></el-icon>
                {{ item.commentCount }}
              </span>
            </div>

            <!-- 右下角：视频时长标签，与截图位置、样式完全匹配 -->
            <span class="absolute bottom-2 right-2 text-white text-xs bg-black/60 rounded px-1.5 py-0.5 backdrop-blur-sm">
              {{ item.duration }}
            </span>
          </div>

          <!-- 视频标题：两行文字截断，防止溢出破坏布局，行高适配阅读体验 -->
          <p class="text-sm text-gray-800 line-clamp-2 leading-snug">
            {{ item.title }}
          </p>

          <!-- 发布日期：浅灰色小字，单行截断，与截图底部日期样式对齐 -->
          <p class="text-xs text-gray-500 line-clamp-1">
            {{ item.publishDate }}
          </p>
          <!-- 视频卡牌内容 -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 导入Vue3响应式API，setup语法糖，纯JS实现
import { ref } from 'vue'

// ====================== 响应式状态定义（您可直接修改/替换为业务数据） ======================
/**
 * 当前激活的标签页
 * 可选值：latest-最新发布 / hot-最多播放 / collect-最多收藏
 * 可根据业务需求扩展、修改标签值与文案
 */
const activeTab = ref('latest')

/**
 * 视频总数量
 * 对应页面左上角的「视频 · 62」，可通过接口赋值更新
 */
const totalCount = ref(62)

/**
 * 视频列表Mock数据
 * 完全由您自行替换为真实接口数据，结构可根据业务需求自由调整
 * 字段说明：
 * id: 唯一标识，必填，用于循环key
 * cover: 视频封面图地址，当前使用随机占位图，需替换为真实地址
 * title: 视频标题文案
 * playCount: 视频播放量
 * commentCount: 视频评论数
 * duration: 视频时长，格式示例：01:27
 * publishDate: 发布日期，格式示例：03-07
 */
const videoList = ref([
  {
    id: 1,
    cover: 'https://picsum.photos/400/225?random=1',
    title: '钢琴小白挑战《KILLKISS》',
    playCount: 987,
    commentCount: 71,
    duration: '01:27',
    publishDate: '03-07'
  },
  {
    id: 2,
    cover: 'https://picsum.photos/400/225?random=2',
    title: '钢琴小白挑战7天学会《unravel》 (7/7)',
    playCount: 1358,
    commentCount: 44,
    duration: '04:24',
    publishDate: '03-03'
  },
  {
    id: 3,
    cover: 'https://picsum.photos/400/225?random=3',
    title: '依旧2月比惨大会',
    playCount: 286,
    commentCount: 6,
    duration: '00:55',
    publishDate: '03-01'
  },
  {
    id: 4,
    cover: 'https://picsum.photos/400/225?random=4',
    title: '看完《ave mujica》后像丰川祥子一样孤独地演奏《春日影》',
    playCount: 279,
    commentCount: 3,
    duration: '05:10',
    publishDate: '02-25'
  },
  {
    id: 5,
    cover: 'https://picsum.photos/400/225?random=5',
    title: '【钢琴】高中生大年初五在家中独自演奏《春日影》',
    playCount: 662,
    commentCount: 33,
    duration: '05:21',
    publishDate: '02-21'
  },
  {
    id: 6,
    cover: 'https://picsum.photos/400/225?random=6',
    title: '《不说》间奏，钢琴翻弹',
    playCount: 342,
    commentCount: 0,
    duration: '00:28',
    publishDate: '02-19'
  },
  {
    id: 7,
    cover: 'https://picsum.photos/400/225?random=7',
    title: '冰岛人新出的表情盲盒能出来什么？',
    playCount: 642,
    commentCount: 1,
    duration: '00:35',
    publishDate: '02-19'
  },
  {
    id: 8,
    cover: 'https://picsum.photos/400/225?random=8',
    title: '这是我们kards玩家最紧张的时候',
    playCount: 2035,
    commentCount: 7,
    duration: '14:36',
    publishDate: '02-17'
  },
  {
    id: 9,
    cover: 'https://picsum.photos/400/225?random=9',
    title: '大年初一在家里用钢琴弹了《牵丝戏》',
    playCount: 1750,
    commentCount: 20,
    duration: '03:59',
    publishDate: '02-17'
  },
  {
    id: 10,
    cover: 'https://picsum.photos/400/225?random=10',
    title: '钢琴小白挑战7天学会a叔《unravel》(6/7)',
    playCount: 2326,
    commentCount: 3,
    duration: '00:48',
    publishDate: '02-12'
  }
])

// ====================== 工具方法（可根据业务需求扩展） ======================
/**
 * 数字格式化：播放量超过1万时，自动转为 x.x万 格式，优化显示效果
 * @param {number} num - 原始数字（播放量）
 * @returns {string} 格式化后的显示字符串
 */
const formatCount = (num) => {
  if (num >= 10000) {
    return (num / 10000).toFixed(1) + '万'
  }
  return num
}
</script>

<style scoped>
/* 自定义滚动条样式，适配webkit内核浏览器，优化视觉体验，不影响功能兼容性 */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}
::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>