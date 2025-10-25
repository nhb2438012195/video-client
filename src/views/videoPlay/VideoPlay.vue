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
          <div class=" w-full aspect-[16/9] relative"></div>
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
              <VideoIntro ></VideoIntro>
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
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { usePublicStore } from '@/store';
import { useRoute } from 'vue-router'

// 组件导入
import HeaderNavBar from '@/views/components/headerNavBar/HeaderNavBar.vue';
import BaseFullPageContainer from '@/views/components/BaseFullPageContainer.vue';
import VideoTitle from './children/left/VideoTitle.vue';
import PlayerActions from './children/left/PlayerActions.vue';
import VideoActions from './children/left/VideoActions.vue';
import VideoIntro from './children/left/VideoIntro.vue';
import VideoAuthorInfo from './children/right/VideoAuthorInfo.vue';
import VideoDanmuInfo from './children/right/VideoDanmuInfo.vue';
//Store
const publicStore = usePublicStore();
//属性
const route = useRoute()

//方法

//生命周期
onMounted(() => {
  console.log(route.params.id)
})
onBeforeUnmount(() => {

})
</script>