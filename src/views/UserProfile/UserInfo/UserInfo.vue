<template>
    <div class=" w-full relative ">
        <!-- 主页顶部 -->
        <div class="bg-img w-full">
            <img class="h-[200px] w-full" src="http://47.115.227.193:9000/public/UserProfileBackgroundImage.avif"
                alt=""></img>
            <div class="absolute top-16  w-full">
                <User></User>
            </div>
        </div>
        <!-- 主页选项栏 -->
         <div class="w-full  relative pl-[60px] pr-[60px] pt-[10px] pb-[10px]  border-b-[1px]">
            <UserOptions @menu-change="OptionsChange"></UserOptions>
         </div>
         <!-- 选中页面 -->
          <div class="w-full  relative pl-[60px] pr-[60px] pt-[10px] pb-[10px]  border-b-[1px]">
            <router-view></router-view>
         </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { usePublicStore } from '@/store';
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'
// 组件导入
import User from "./User/User.vue"
import UserOptions from './UserOptions/UserOptions.vue';
import UserVideo from './UserVideo/UserVideo.vue';
//Store
const publicStore = usePublicStore();
const router = useRouter()
const route = useRoute()
//计算属性

//方法
 function OptionsChange(index) {
    const uid = route.params.uid 
    router.push(`/userProfile/${uid}/${index.key}`)
 }
//生命周期
onMounted(() => {

})
onBeforeUnmount(() => {

})
</script>