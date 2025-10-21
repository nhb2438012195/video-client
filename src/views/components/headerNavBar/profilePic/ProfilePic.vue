<!-- 头像组件 -->
<template>
  <div class="relative  flex items-center justify-center " @mouseenter="show = true" @mouseleave="show = false">
    <!-- 头像触发区域 -->
    <HoverZoom :scale="2" :offset-x="1" :offset-y="-1" :disabled="userimg!=''" :forceHover="showUser" class="z-50">
      <BaseContainer>
        <template #left>
          <div
            class="flex items-center justify-center border-white overflow-hidden rounded-full w-[40px] h-[38px] text-white cursor-pointer"
            :class="{ 'border-[2px]': userimg != '' }">
            <img v-if="userimg!=''" :src="userimg" alt="avatar" class="w-full h-full object-cover" />
            <div v-if="!userStore.isLogin" class="flex items-center justify-center w-full h-full text-sm bg-[#00AEEC]">
              登录
            </div>
          </div>
        </template>
      </BaseContainer>
    </HoverZoom>
    <BaseDropdownPanel :show="show">
      <NotLogin @login="login" @register="login"></NotLogin>
    </BaseDropdownPanel>
    <BaseDropdownPanel :show="showUser" class="z-49 mr-[40px] ">
      <Login class="w-[300px] pt-[40px] " :userData="userStore.userInfo"></Login>
    </BaseDropdownPanel>
  </div>
</template>

<script setup>
import { useUserStore,usePublicStore } from '@/store';
import BaseContainer from '@/views/components/BaseContainer.vue';
import NotLogin from './children/NotLogin.vue';
import BaseDropdownPanel from '@/views/components/BaseDropdownPanel.vue';
import Login from './children/Login.vue';
import { watch, computed, onMounted, ref } from 'vue';
import HoverZoom from '@/views/components/HoverZoom.vue';

const publicStore = usePublicStore();
const userStore = useUserStore();
let userimg = ref('')
function init() {
  userStore.getUserInfo();
}

function reset() {
  console.log('reset用户头像');
}
function login() {
  console.log('login');
  userStore.setShowNoLoginUser(true);
}
// 监听登录状态,显示不同的下拉面板
const show = computed({
  get: () => userStore.showLogin,
  set: (val) => {
    userStore.setShowLogin(val)
  }
});
const showUser = computed(() => userStore.showUser)
watch(
  () => userStore.userInfo,
  (newVal, oldVal) => {
    console.log('用户信息变化:', oldVal, '->', newVal);
    userimg.value = newVal?.avatar || '';
    console.log('用户头像:', userimg);
  },
  { deep: true }
);

watch(
  () => userStore.isLogin,
  (newVal, oldVal) => {
    console.log('登录状态变化:', oldVal, '->', newVal);
    if (newVal) {
      console.log('用户已登录');
      init();
    } else {
      console.log('用户未登录');
      reset();
    }
  }
);

onMounted(() => {
  if (userStore.isLogin) {
    console.log('用户已登录');
    init();
  } else {
    console.log('用户未登录');
  }
});



// 注意：<script setup> 中顶层声明的变量/函数会自动暴露给模板
// 无需 return！
</script>


<style scoped>
img {
  display: block;
}
</style>