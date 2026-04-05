<template>
    <!-- 整个页面容器：占满视口 -->
    <div class="flex flex-col h-screen  mx-auto">
        <header class="fixed top-0 left-0 right-0 z-[52] w-full  bg-gradient-to-b from-black/90 to-black/0 text-white ">
            <HeaderNavBar />
        </header>

        <!-- 主内容区 -->
        <main class="flex-1 w-full mx-auto">
            <router-view></router-view>
        </main>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { usePublicStore } from '@/store';
import { useRouter } from 'vue-router'

// 组件导入

import HeaderNavBar from '@/views/components/headerNavBar/HeaderNavBar.vue';
//Store
const router = useRouter();
const publicStore = usePublicStore();
import { useVideoCardStore } from '@/store/VideoCardStore'
const videoCardStore  = useVideoCardStore()
//计算属性

//方法

//生命周期
onMounted(() => {

})
onBeforeUnmount(() => {

})
</script>