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
            <span class="text-xs">播放量：{{videoCardInfo.videoPlayVolume }}</span>
            <span class="text-xs ml-1">弹幕数量：{{ videoCardInfo.videoBarrageVolume }}</span>
          </div>
        </div>

        <!-- 时长（右下角） -->
        <div class=" right-4  bg-opacity-70 text-white px-2   text-xs font-medium">
          <div name="duration">时长：{{ videoCardInfo.videoLength }}</div>
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
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" width="24" height="24" fill="currentColor" class="bili-video-card__info--owner__up"><path d="M6.15 8.24805C6.5642 8.24805 6.9 8.58383 6.9 8.99805L6.9 12.7741C6.9 13.5881 7.55988 14.248 8.3739 14.248C9.18791 14.248 9.8478 13.5881 9.8478 12.7741L9.8478 8.99805C9.8478 8.58383 10.1836 8.24805 10.5978 8.24805C11.012 8.24805 11.3478 8.58383 11.3478 8.99805L11.3478 12.7741C11.3478 14.41655 10.01635 15.748 8.3739 15.748C6.73146 15.748 5.4 14.41655 5.4 12.7741L5.4 8.99805C5.4 8.58383 5.73578 8.24805 6.15 8.24805z" fill="currentColor"></path><path d="M12.6522 8.99805C12.6522 8.58383 12.98795 8.24805 13.4022 8.24805L15.725 8.24805C17.31285 8.24805 18.6 9.53522 18.6 11.123C18.6 12.71085 17.31285 13.998 15.725 13.998L14.1522 13.998L14.1522 14.998C14.1522 15.4122 13.8164 15.748 13.4022 15.748C12.98795 15.748 12.6522 15.4122 12.6522 14.998L12.6522 8.99805zM14.1522 12.498L15.725 12.498C16.4844 12.498 17.1 11.8824 17.1 11.123C17.1 10.36365 16.4844 9.74804 15.725 9.74804L14.1522 9.74804L14.1522 12.498z" fill="currentColor"></path><path d="M12 4.99805C9.48178 4.99805 7.283 5.12616 5.73089 5.25202C4.65221 5.33949 3.81611 6.16352 3.72 7.23254C3.60607 8.4998 3.5 10.171 3.5 11.998C3.5 13.8251 3.60607 15.4963 3.72 16.76355C3.81611 17.83255 4.65221 18.6566 5.73089 18.7441C7.283 18.8699 9.48178 18.998 12 18.998C14.5185 18.998 16.7174 18.8699 18.2696 18.74405C19.3481 18.65655 20.184 17.8328 20.2801 16.76405C20.394 15.4973 20.5 13.82645 20.5 11.998C20.5 10.16965 20.394 8.49877 20.2801 7.23205C20.184 6.1633 19.3481 5.33952 18.2696 5.25205C16.7174 5.12618 14.5185 4.99805 12 4.99805zM5.60965 3.75693C7.19232 3.62859 9.43258 3.49805 12 3.49805C14.5677 3.49805 16.8081 3.62861 18.3908 3.75696C20.1881 3.90272 21.6118 5.29278 21.7741 7.09773C21.8909 8.3969 22 10.11405 22 11.998C22 13.88205 21.8909 15.5992 21.7741 16.8984C21.6118 18.7033 20.1881 20.09335 18.3908 20.23915C16.8081 20.3675 14.5677 20.498 12 20.498C9.43258 20.498 7.19232 20.3675 5.60965 20.2392C3.81206 20.0934 2.38831 18.70295 2.22603 16.8979C2.10918 15.5982 2 13.8808 2 11.998C2 10.1153 2.10918 8.39787 2.22603 7.09823C2.38831 5.29312 3.81206 3.90269 5.60965 3.75693z" fill="currentColor"></path></svg>
          </slot>
        </div>
        <div class="cursor-pointer hover:text-blue-600 text-gray-400">
          <span class="font-medium  ">
            <slot name="author">{{ videoCardInfo.videoAuthorId }}</slot>
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
    videoAuthorId: '',
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
  // 显式使用props.type，强制关联依赖，type变化立即触发重新计算
  const currentType = props.type; 
  if (currentType === 'Profile') {
   return props.videoCardInfo
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
  //视频卡片信息
  videoCardInfo: {
    type: Object,
    required: false,
    default: () => {
      return {
      // 封面
    videoCover: '',
    // 标题
    videoTitle: '',
    // 作者（存作者主页链接）
    videoAuthorId: '',
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
}
    }
  }
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