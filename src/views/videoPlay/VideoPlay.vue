<template>
  <div>
    <BaseFullPageContainer>
      <template #header1>
        <div class="w-full fixed max-w-[2000px]  z-[52] bg-white ">
          <HeaderNavBar class="text-black shadow ">
          </HeaderNavBar>
        </div>
      </template>
      <template #mainLeft>
        <div class=" w-full  pt-20 pb-20 relative z-0">
          <!-- 标题 -->
          <div class="bg-zinc-950 w-full h-[104px] relative">
            <div class="h-full w-full">
              <VideoTitle class="h-full w-full"></VideoTitle>
            </div>
          </div>
          <!-- 视频 播放器 -->
          <div class=" w-full aspect-[16/9] relative">
            <DashVideoPlayer class="h-full w-full" :src="mpdUrl"></DashVideoPlayer>
          </div>
          <!-- 播放器相关操作 -->
          <div class=" w-full  h-[46px] relative">
            <div class="h-full w-full">
              <PlayerActions class="h-full w-full"></PlayerActions>
            </div>
          </div>
          <!-- 视频相关操作 -->
          <div class=" w-full  relative" style="height: clamp(56px, calc( 16px + 3vw), 66px);">
            <div class="h-full w-full">
              <VideoActions class="h-full w-full"></VideoActions>
            </div>
          </div>
          <!-- 视频简介 -->
          <div class=" w-full  min-h-[121px] relative">
            <div class=" w-full px-1 py-5">
              <VideoIntro></VideoIntro>
            </div>
          </div>
          <!-- 视频分类 -->
          <div class="bg-emerald-400 w-full  relative" style="height: clamp(36px,  3vw, 66px);"></div>
          <!-- 评论 -->
          <div class="bg-emerald-700 w-full  h-[1000px] relative"></div>
        </div>
      </template>
      <template #mainRight>
        <div class=" w-full   pt-20 relative z-0 ">
          <div class=" h-full  2xl:w-[411px] w-[350px] ml-[30px]">
            <!-- 视频作者信息 -->
            <div class=" w-full h-[104px]">
              <div class="w-full h-full">
                <VideoAuthorInfo class="w-full h-full"></VideoAuthorInfo>
              </div>
            </div>
            <!-- 视频弹幕信息 -->
            <div class=" w-full min-h-[44px]">
              <div class="w-full ">
                <VideoDanmuInfo class="w-full "></VideoDanmuInfo>
              </div>
            </div>
            <!-- 相关推荐视频 -->
            <div class="bg-slate-200 mt-2 w-full h-[4000px]">

            </div>
          </div>
        </div>
      </template>
    </BaseFullPageContainer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'

// ========== 1. 组件导入 ==========
// 通用布局组件
import HeaderNavBar from '@/views/components/headerNavBar/HeaderNavBar.vue'
import BaseFullPageContainer from '@/views/components/baseComponent/BaseFullPageContainer.vue'
// 视频播放左侧组件
import VideoTitle from './children/left/VideoTitle.vue'
import PlayerActions from './children/left/PlayerActions.vue'
import VideoActions from './children/left/VideoActions.vue'
import VideoIntro from './children/left/VideoIntro.vue'
import DashVideoPlayer from './children/left/DashVideoPlayer.vue'
// 视频播放右侧组件
import VideoAuthorInfo from './children/right/VideoAuthorInfo.vue'
import VideoDanmuInfo from './children/right/VideoDanmuInfo.vue'

// ========== 2. Store 导入 ==========
import { usePublicStore } from '@/store'
import { useVideoStore } from '@/store'

// ========== 3. 基础实例 & 响应式状态 ==========
const route = useRoute()
const publicStore = usePublicStore()
const videoStore = useVideoStore()

// 视频加载状态（用于UI提示）
const isVideoLoading = ref(false)

// ========== 4. 核心计算属性（自动响应依赖变化） ==========
/**
 * 视频播放信息（计算属性：依赖路由id + Store数据）
 * 路由id变化/Store数据更新时，自动重新计算
 */
const videoPlay = computed(() => {
  const videoId = route.params.id
  if (!videoId) return null // 无id时返回null，避免无效查询

  // 同步获取视频信息（若getVideoPlayById是异步，见下方补充方案）
  const videoInfo = videoStore.videoPlay
  if (!videoInfo) {
    ElMessage.error('未找到该视频的播放信息')
    console.error(`视频ID ${videoId} 不存在`)
  }
  return videoInfo
})

/**
 * 视频MPD播放地址（计算属性：依赖videoPlay + 环境变量）
 * videoPlay变化时，自动重新拼接URL
 */
const mpdUrl = computed(() => {
  if (!videoPlay.value) return '' // 无视频信息时返回空

  // 解构环境变量，提供默认值避免undefined
  const baseUrl = process.env.VUE_APP_VIDEO_URL || ''
  const mainUrl = process.env.VUE_APP_VIDEO_MAIN_URL || ''
  const mpdPath = videoPlay.value.videoMpdUrl || ''

  // 拼接URL并处理多斜杠问题（避免http://xxx//yyy）
  const fullUrl = baseUrl+mpdPath+mainUrl
  console.log(`视频播放地址：${fullUrl}`)
  // 校验URL有效性
  if (!fullUrl.startsWith('http')) {
    ElMessage.error('视频播放地址格式错误')
    console.error(`无效的MPD地址：${fullUrl}`)
    return ''
  }

  return fullUrl
})

// ========== 5. 监听 & 生命周期 ==========
/**
 * 监听路由id变化（切换视频时重新加载）
 * 若getVideoPlayById是异步，在此处触发异步请求
 */
watch(
  () => route.params.id,
  async (newId) => {
    if (!newId) return

    // 若getVideoPlayById是异步方法，在此处处理（示例）
    isVideoLoading.value = true
    try {
      videoStore.loadVideoPlayData(newId) // 异步获取视频信息到Store
    } catch (error) {
      ElMessage.error(`加载视频失败：${error.message}`)
      console.error(error)
    } finally {
      isVideoLoading.value = false
    }
  },
  { immediate: true } // 挂载时立即执行一次
)
// 页面挂载时加载数据
onMounted(() => {
  const videoId = route.params.id
  if (!videoId) return;

  videoStore.loadVideoPlayData(videoId)
    .then(() => {
      // 加载成功的逻辑
      console.log('视频播放信息加载结束');
    })
    .catch((error) => {
      // 加载失败的逻辑
      ElMessage.error('视频播放信息加载失败');
      console.error(error);
    });
})
/**
 * 卸载前清理资源
 */
onBeforeUnmount(() => {
  isVideoLoading.value = false
  // 若有播放器实例，此处销毁（如暂停播放、释放资源）
})
</script>