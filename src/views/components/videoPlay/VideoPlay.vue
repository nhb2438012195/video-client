<template>
  <div>
        <BaseFullPageContainer>
          <template #header1>
            <HeaderNavBar class="text-black shadow"></HeaderNavBar>
          </template>
        </BaseFullPageContainer>
  </div>
</template>

<script setup>
import { ref , onMounted, onBeforeUnmount } from 'vue'
import { usePublicStore } from '@/store';
import { useRoute } from 'vue-router'

// 组件导入
import HeaderNavBar from '../headerNavBar/HeaderNavBar.vue';
import BaseFullPageContainer from '@/views/components/BaseFullPageContainer.vue';
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