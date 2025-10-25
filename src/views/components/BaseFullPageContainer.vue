<!-- 页面容器，用来装一个独立完整的页面 -->
<template>
  <!-- 滚动条 -->
  
  <div class="h-screen  relative  max-w-[2000px] min-w-[1200px] mx-auto m-[0px]">
    <!-- 导航栏 -->
    <div v-if="hasHeader1Slot()" class="z-[51] relative w-full max-w-[2000px]  min-w-[1060px]">
      <slot name="header1"></slot>
    </div>
    <!-- 分类 -->
    <div v-if="hasHeader2Slot()"
      class="z-0 relative flex items-center justify-between min-w-[1020px] !aspect-[11.766]  !w-[83.451536643%]  mx-auto ">
      <slot name="header2"></slot>
    </div>
    <!-- 主页主要内容 -->
    <div v-if="hasMainSlot()" class="z-0 relative min-w-[1020px] !h-full  !w-[83.451536643%] mx-auto">
      <slot name="main"></slot>
    </div>
    <!-- 视频播放页面主要内容 -->
    <div v-if="hasMainLeftSlot()" class="z-0 min-w-[1200px]  relative flex  h-full  2xl:px-[105px] xl:px-[90px] lg:px-[50px] px-[10px] w-full mx-auto">
      <div v-if="hasMainLeftSlot()" class="relative h-full z-0"style="width: clamp( 720px,  62vw, 1694px);">
        <slot name="mainLeft"></slot>
      </div>

      <div v-if="hasMainRightSlot()" class="relative h-full  z-0" style="width: clamp( 380px,  26vw, 441px);">
        <slot name="mainRight"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, useSlots } from 'vue'
import { usePublicStore } from '@/store';
import CustomScrollbar from '@/views/components/CustomScrollbar.vue';
const slots = useSlots()


// 组件导入

//Store
const publicStore = usePublicStore();
//计算属性
//判断是否传入了名为 header1插槽
const hasHeader1Slot = () => !!slots.header1
// 判断是否传入了名为 "header2" 的插槽
const hasHeader2Slot = () => !!slots.header2
//判断是否传入了名为 "main" 的插槽
const hasMainSlot = () => !!slots.main
//判断是否传入了名为 "main-left" 的插槽
const hasMainLeftSlot = () => !!slots.mainLeft
//判断是否传入了名为 "main-right" 的插槽
const hasMainRightSlot = () => !!slots.mainRight
//方法

//生命周期
onMounted(() => {

})
onBeforeUnmount(() => {

})
</script>