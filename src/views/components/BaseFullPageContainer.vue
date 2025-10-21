<template>
  <div>
        <el-container class="h-screen  relative  max-w-[2000px] mx-auto m-[0px]">

               
        </el-container>
  </div>
</template>

<script setup>
import { ref , onMounted, onBeforeUnmount } from 'vue'
import { usePublicStore } from '@/store';

// 组件导入

//Store
const publicStore = usePublicStore();
//计算属性

//方法

//生命周期
onMounted(() => {

})
onBeforeUnmount(() => {

})
</script>