<template>
  <div>
        <div>
            <!-- 导航栏 -->
            <div class="w-full p-1  shadow-md">
                <HeaderNavBar class="text-black"></HeaderNavBar>
            </div>
            <!-- 导航栏 -->
        </div>
  </div>
</template>

<script setup>
import { ref , onMounted, onBeforeUnmount } from 'vue'
import { usePublicStore } from '@/store';
import { useRoute } from 'vue-router'

// 组件导入
import HeaderNavBar from '../headerNavBar/HeaderNavBar.vue';
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