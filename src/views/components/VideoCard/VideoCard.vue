<template>
  <!-- 视频卡片组件 -->
  <div class="z-0 h-full w-full relative flex gap-2 flex-col bg-white overflow-hidden transition-colors duration-150 ">
    <!-- 封面区域：包含视频缩略图、播放按钮、播放量、时长、功能图标 -->
    <a class="relative aspect-video cursor-pointer bg-gray-800 flex items-center justify-center overflow-hidden"
      @mousemove="handleCoverMouseMove" @mouseenter="handleCoverMouseEnter" @mouseleave="handleCoverMouseLeave"
      :href="videoPlayUrl">
      <!-- 插槽：封面图片 -->
      <!-- 默认占位图 -->
      <img :src="videoCardInfo.videoCover" alt="视频封面" class="w-full h-full object-fill" />
      <!-- 播放按钮图标（左下角） -->
      <!-- <div class="absolute bottom-4 left-4 flex items-center justify-center w-8 h-8 bg-black bg-opacity-70 rounded-full text-white">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" class="w-5 h-5">
          <path d="M8 5v14l11-7z"
        </svg>
      </div> -->
      <!-- 封面底部 -->
      <div class="absolute bottom-0 flex justify-between items-center w-full
            bg-gradient-to-t from-black/70 to-transparent h-[40px] p-1">
        <!-- 播放次数（左下角） -->
        <div class="  left-4 bg-opacity-70 text-white px-2   text-sm font-medium">
          <div>
            <span class="text-xs">{{ videoCardInfo.videoPlayVolume }}</span>
            <span class="text-xs ml-1">{{ videoCardInfo.videoBarrageVolume }}</span>
          </div>
        </div>

        <!-- 时长（右下角） -->
        <div class=" right-4  bg-opacity-70 text-white px-2   text-xs font-medium">
          <div name="duration">{{ videoCardInfo.videoLength }}</div>
        </div>
      </div>
      <!-- 功能图标占位（收藏、分享） -->
      <div class="absolute left-4 flex space-x-1">
      </div>
    </a>

    <!-- 标题与作者区域 -->
    <div class="overflow-hidden">
      <!-- 标题 -->
      <div class="text-xs font-semibold text-gray-900  leading-tight h-[40px] overflow-hidden  ">
        <a :href="videoPlayUrl">
        <span class=" text-sm overflow-hidden cursor-pointer hover:text-blue-600">
          {{ videoCardInfo.videoTitle }}
        </span>
        </a>
      </div>

      <!-- 作者信息 -->
      <div class="flex items-center mt-1 text-sm text-gray-600">
        <!-- UP主图标 -->
        <div class="w-5 h-5 mr-1.5 text-blue-500 ">
          <slot name="up-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" class="w-5 h-5">
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </slot>
        </div>
        <div class="cursor-pointer hover:text-blue-600 text-gray-400">
          <span class="font-medium  ">
            <slot name="author">{{ videoCardInfo.videoAuthor }}</slot>
          </span>
          <span class="mx-1.5 ">·</span>
          <span class="">
            <slot name="date">{{ videoCardInfo.createTime }}</slot>
          </span>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch,computed } from 'vue'
import { useVideoCardStore, usePublicStore } from '@/store';
import { useRouter} from 'vue-router'
// 引入store
const videoCard = useVideoCardStore()
const publicStore = usePublicStore()
const router = useRouter()
//卡片是否加载完成
const isLoaded = ref(false);
const dynamicvideoCardInfo=ref({
      // 封面
    videoCover: '',
    // 标题
    videoTitle: '',
    // 作者（存作者主页链接）
    videoAuthor: '',
    // 时长
    videoLength: '',
    // 播放次数
    videoPlayVolume: '',
    // 创建时间
    createTime: '',
    // 弹幕数量
    videoBarrageVolume: '',
    //视频播放id
    videoPlayId: '',
})
// 1. 直接定义响应式的 computed 变量，自动判断类型
const videoCardInfo = computed(() => {
  if (props.type === 'Profile') {
    return videoCard.DynamicVideoCard.value[props.authorId]?.[props.order]
  }
  return dynamicvideoCardInfo.value
})
const videoPlayUrl = computed(() => {
  return process.env.VUE_APP_VIDEO_PLAY+videoCardInfo.value.videoPlayId
})
// ========================

const props = defineProps({
  //id
  id: {
    type: String,
    required: true,
  },
  //视频卡片类型
  type: {
    type: String,
    required: false,
    default: 'Dynamic',
  },
  //视频作者id，用于寻找视频信息
  authorId: {
    type: String,
    required: false,
    default: '-1',
  },
  //视频顺序
  order: {
    type: Number,
    required: false,
    default: 0,
  },
})


// ========================
// === 事件处理函数 ===
// ========================

let unwatchPreload = null

function handleCoverClick() {
  console.log('点击封面')
  // 跳转视频页面
  router.push(process.env.VUE_APP_VIDEO_PLAY+videoCardInfo.value.videoPlayId)
}

// 鼠标进入封面
function handleCoverMouseEnter() {
  console.log('进入封面')
}

// 鼠标离开封面
function handleCoverMouseLeave() {
  console.log('离开封面')

}
//卡片加载完成
function handleCoverLoaded() {
  console.log('卡片加载完成')
  isLoaded.value = true
  videoCard.videoCardLoaded(props.id)
}
// 生命周期
onMounted(() => {
  //暂时默认已经加载完成
  //handleCoverLoaded()
  // 监听预加载状态
  if (props.type == 'Dynamic') {//该卡片为推荐视频
    unwatchPreload = watch(
      () => videoCard.isPreloadNotReady,
      (newVal) => {
        // 只处理未加载且预加载已完成的情况
        if (!isLoaded.value && newVal === false) {
          const info = videoCard.getCardInfo()
          if (info) {
            dynamicvideoCardInfo.value = info
            handleCoverLoaded()
            // ✅ 一次性取消监听（只调用一次）
            unwatchPreload?.()
            unwatchPreload = null
          }
        }
      },
      { immediate: true } // 建议加上，避免错过已就绪状态
    )
  }

})
// 鼠标在封面移动时触发（暂时不需要）
function handleCoverMouseMove(e) {
  // const cover = coverRef.value;
  // if (!cover) return;

  // const rect = cover.getBoundingClientRect();
  // const x = e.clientX - rect.left;
  // // 计算 x 坐标在封面中的百分比,保留2位小数
  // const percent = Math.round(x / rect.width * 100);
  // // ...后续逻辑
  // console.log('percent:', percent+'%')
}
</script>

<style scoped>
/* 控制宽高比为 16:9 */
:deep(.aspect-video) {
  aspect-ratio: 16 / 9;
}

/* 确保文本不会溢出 */
::v-deep(slot) {
  display: block;
}

/* 强制保持布局稳定 */
.container {
  width: 100%;
}
</style>