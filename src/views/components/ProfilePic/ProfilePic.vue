<!-- <template>
    <div>
        <BaseContainer class="">
            <template #left>
                <div
                    class=" flex items-center justify-center border-[2px] border-white overflow-hidden rounded-full !w-[40px] !h-[38px] !text-white">
                    <img v-if="userimg!=''" :src="userimg"></img>
                    <div v-else class="flex items-center justify-center h-full w-full text-sm bg-[#00AEEC]">
                        <div class="text-sm">
                            登录
                        </div>
                    </div>
                </div>
            </template>
        </BaseContainer>
    </div>
</template>

<script>
import BaseContainer from "@/views/components/BaseContainer.vue"
export default {
    components: { BaseContainer },
    props: {
        userimg: {
            type: String,
            default() {
                return ''
            }
        }
    },
    data() {
        return {}
    },
    methods: {},
    mounted() { },
    created() { },

}
</script>

<style lang="scss" scoped></style> -->

<template>
  <div class="relative  flex items-center justify-center" @mouseenter="show = true" @mouseleave="show = false">
    <!-- 头像触发区域 -->
    <BaseContainer>
      <template #left>
        <div
          class="flex items-center justify-center border-[2px] border-white overflow-hidden rounded-full w-[40px] h-[38px] text-white cursor-pointer"
        >
          <img v-if="userimg" :src="userimg" alt="avatar" class="w-full h-full object-cover" />
          <div v-else class="flex items-center justify-center w-full h-full text-sm bg-[#00AEEC]">
            登录
          </div>
        </div>
      </template>
    </BaseContainer>

    <!-- 使用 Transition 包裹下拉框 -->
    <Transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-show="show"
        class="absolute  top-full   z-50 pt-1"
      >
      <div class="bg-white border border-gray-200 rounded-md shadow-lg">
            <slot>
                <div class="w-[120px] h-[120px] px-2 py-2 text-sm text-gray-700">未登录a</div>
            </slot>
      </div>
      </div>
    </Transition>
  </div>
</template>

<script>
import BaseContainer from "@/views/components/BaseContainer.vue";

export default {
  name: "ProfilePicWithDropdown",
  components: { BaseContainer },
  props: {
    userimg: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      show: false
    };
  }
};
</script>

<style scoped>
img {
  display: block;
}
</style>