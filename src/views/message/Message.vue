<template>
 <!-- 整个页面容器：占满视口 -->
  <div class="flex flex-col h-screen  max-w-[1800px] mx-auto">
    <!-- 固定高度的 Header（不要用 fixed，用 static + flex 布局更可控） -->
    <header class="w-full max-w-[2000px] z-[52] bg-white shadow text-black h-[64px]">
      <HeaderNavBar />
    </header>

    <!-- 主内容区：自动填充剩余高度，并可滚动 -->
    <main class="flex-1 overflow-hidden w-full min-w-[1020px] max-w-[1200px]  mx-auto">
      <div class="flex h-full">
        <!-- 左侧菜单 -->
        <div class="w-[160px] flex flex-col border-r">
          <div class="py-5 text-center">
            <h6>消息中心</h6>
          </div>
          <MessageOption text="123456" />
          <MessageOption />
          <!-- ... 其他选项 -->
        </div>

        <!-- 右侧内容 -->
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { usePublicStore } from '@/store';
import BaseFullPageContainer from '@/views/components/baseComponent/BaseFullPageContainer.vue';
import MyMessage from './children/right/MyMessage.vue';
import MessageOption from './children/left/MessageOptions.vue';
import MessageConversation from './children/right/MessageConversation/MessageConversation.vue';
import HeaderNavBar from '@/views/components/headerNavBar/HeaderNavBar.vue';
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