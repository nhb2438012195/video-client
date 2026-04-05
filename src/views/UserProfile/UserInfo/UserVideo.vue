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
          <el-icon>
            <VideoPlay />
          </el-icon>
          播放全部
        </el-button>
        <!-- 查看更多按钮：文本样式，带右箭头，与截图样式对齐 -->
        <el-button type="text" class="flex items-center">
          查看更多
          <el-icon class="ml-1">
            <ArrowRight />
          </el-icon>
        </el-button>
      </div>
    </div>

    <!-- 视频卡片列表容器：flex-1 占满剩余高度，纵向溢出滚动，横向内容隐藏 -->
    <div class="flex-1 overflow-y-auto overflow-x-hidden px-1">
      <!-- 视频卡片网格布局：响应式列数，完美适配不同屏幕宽度 -->
      <!-- 适配规则：移动端2列、小屏平板3列、中屏桌面4列、大屏桌面5列，固定间距 -->
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 w-full pb-2">
        <!-- 视频卡片循环渲染，使用mock数据，您可直接替换为真实业务数据 -->
        <div v-for="(card, index) in videoList" :key="card.id" :data="card"
             class="video-card flex flex-col gap-2 group cursor-pointer">
          <!-- 视频卡牌内容 -->
          <VideoCard :id="index+1"  :type="'Profile'" :order="index+1" :videoCardInfo=card >
          </VideoCard>
          <!-- 视频卡牌内容 -->
        </div>
      </div>
    </div>

    <!-- ====================== 只加了这一段分页器，无任何其他修改 ====================== -->
    <div class="flex justify-end mt-3 px-4 border-t pt-3">
      <el-pagination
        v-model:current-page="pageNum"
        v-model:page-size="pageSize"
        :total="totalCount"
        layout="prev, pager, next, jumper, ->, sizes"
        :page-sizes="[10, 20, 30, 50]"
      />
    </div>

  </div>
</template>

<script setup>
// 导入Vue3响应式API，setup语法糖，纯JS实现
import { ref,onMounted, computed,watch } from 'vue'
import VideoCard from '@/views/components/videoCard/VideoCard.vue';
//导入视频store
import { useVideoCardStore } from '@/store/VideoCardStore'
import { comment } from 'postcss';
const videoCardStore  = useVideoCardStore()
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
const totalCount =  computed(() => {
  return videoCardStore.totalCount
}) 

// ====================== 只加了这两个分页变量 ======================
const pageNum = ref(1)
const pageSize = ref(10)
// 监听分页变量，请求接口并赋值给videoList
watch([pageNum, pageSize], () => {
  videoCardStore.userVideoInfo(pageNum.value,pageSize.value, videoList)
})
/**
 * 视频列表Mock数据
 * 完全由您自行替换为真实接口数据，结构可根据业务需求自由调整
 * 字段说明：
 * videoDetailsId: 唯一标识，必填，用于循环key
 * videoCover: 视频封面图地址，当前使用随机占位图，需替换为真实地址
 * videoTitle: 视频标题文案
 * videoPlayVolume: 视频播放量
 * videoBarrageVolume: 视频评论数
 * videoLength: 视频时长，格式示例：01:27
 * createTime: 发布日期，格式示例：03-07
 */
const videoList = ref([
  {
    videoDetailsId: 1,
    videoCover: 'https://picsum.photos/400/225?random=1',
    videoTitle: '钢琴小白挑战《KILLKISS》',
    videoPlayVolume: 987,
    videoBarrageVolume: 71,
    videoLength: '01:27',
    createTime: '03-07',
    // 作者（存作者主页链接）
    videoAuthor: '',
    //视频播放id
    videoPlayId: '',
  },
  {
    videoDetailsId: 2,
    videoCover: 'https://picsum.photos/400/225?random=2',
    videoTitle: '钢琴小白挑战7天学会《unravel》 (7/7)',
    videoPlayVolume: 1358,
    videoBarrageVolume: 44,
    videoLength: '04:24',
    createTime: '03-03',
    // 作者（存作者主页链接）
    videoAuthor: '',
    //视频播放id
    videoPlayId: '',
  },
  {
    videoDetailsId: 3,
    videoCover: 'https://picsum.photos/400/225?random=3',
    videoTitle: '依旧2月比惨大会',
    videoPlayVolume: 286,
    videoBarrageVolume: 6,
    videoLength: '00:55',
    createTime: '03-01',
    // 作者（存作者主页链接）
    videoAuthor: '',
    //视频播放id
    videoPlayId: '',
  },
  {
    videoDetailsId: 4,
    videoCover: 'https://picsum.photos/400/225?random=4',
    videoTitle: '看完《ave mujica》后像丰川祥子一样孤独地演奏《春日影》',
    videoPlayVolume: 279,
    videoBarrageVolume: 3,
    videoLength: '05:10',
    createTime: '02-25',
    // 作者（存作者主页链接）
    videoAuthor: '',
    //视频播放id
    videoPlayId: '',
  },
  {
    videoDetailsId: 5,
    videoCover: 'https://picsum.photos/400/225?random=5',
    videoTitle: '【钢琴】高中生大年初五在家中独自演奏《春日影》',
    videoPlayVolume: 662,
    videoBarrageVolume: 33,
    videoLength: '05:21',
    createTime: '02-21',
    // 作者（存作者主页链接）
    videoAuthor: '',
    //视频播放id
    videoPlayId: '',
  },
  {
    videoDetailsId: 6,
    videoCover: 'https://picsum.photos/400/225?random=6',
    videoTitle: '《不说》间奏，钢琴翻弹',
    videoPlayVolume: 342,
    videoBarrageVolume: 0,
    videoLength: '00:28',
    createTime: '02-19',
    // 作者（存作者主页链接）
    videoAuthor: '',
    //视频播放id
    videoPlayId: '',
  },
  {
    videoDetailsId: 7,
    videoCover: 'https://picsum.photos/400/225?random=7',
    videoTitle: '冰岛人新出的表情盲盒能出来什么？',
    videoPlayVolume: 642,
    videoBarrageVolume: 1,
    videoLength: '00:35',
    createTime: '02-19',
    // 作者（存作者主页链接）
    videoAuthor: '',
    //视频播放id
    videoPlayId: '',
  },
  {
    videoDetailsId: 8,
    videoCover: 'https://picsum.photos/400/225?random=8',
    videoTitle: '这是我们kards玩家最紧张的时候',
    videoPlayVolume: 2035,
    videoBarrageVolume: 7,
    videoLength: '14:36',
    createTime: '02-17',
    // 作者（存作者主页链接）
    videoAuthor: '',
    //视频播放id
    videoPlayId: '',
  },
  {
    videoDetailsId: 9,
    videoCover: 'https://picsum.photos/400/225?random=9',
    videoTitle: '大年初一在家里用钢琴弹了《牵丝戏》',
    videoPlayVolume: 1750,
    videoBarrageVolume: 20,
    videoLength: '03:59',
    createTime: '02-17',
    // 作者（存作者主页链接）
    videoAuthor: '',
    //视频播放id
    videoPlayId: '',
  },
  {
    videoDetailsId: 10,
    videoCover: 'https://picsum.photos/400/225?random=10',
    videoTitle: '钢琴小白挑战7天学会a叔《unravel》(6/7)',
    videoPlayVolume: 2326,
    videoBarrageVolume: 3,
    videoLength: '00:48',
    createTime: '02-12',
    // 作者（存作者主页链接）
    videoAuthor: '',
    //视频播放id
    videoPlayId: '',
  }
])
onMounted(() => {
  //获取该用户投稿的视频,暂时只获取第一页
  videoCardStore.userVideoInfo(pageNum.value,pageSize.value,videoList)
});
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