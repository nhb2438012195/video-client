<template>
  <div class="h-screen  relative  max-w-[2000px] mx-auto m-[0px]">
    <div v-if="hasHeader1Slot()" class="z-50 relative  min-w-[1060px]">
    <slot name="header1"></slot>
    </div>
    <div v-if="hasHeader2Slot()"
      class="z-0 relative flex items-center justify-between min-w-[1020px] !aspect-[11.766] !p-[0px] !w-[83.451536643%]  mx-auto ">
      <slot name="header2"></slot>
    </div>
    <div v-if="hasMainSlot()" class="z-0 relative min-w-[1020px] !h-full  !p-[0px]  !w-[83.451536643%] mx-auto">
      <slot name="main"></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, useSlots } from 'vue'
import { usePublicStore } from '@/store';

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
//方法

//生命周期
onMounted(() => {

})
onBeforeUnmount(() => {

})
</script>