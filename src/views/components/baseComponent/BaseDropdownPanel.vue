<!-- 将具体面板插入默认插槽，外界需要绑定变量show来控制是否显示面板 -->
<template>
    <!-- 使用 Transition 包裹下拉框 -->
    <Transition enter-active-class="transition-all duration-200 ease-out" enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0" leave-active-class="transition-all duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 -translate-y-2">
        <div v-show="show" class="absolute  top-full    pt-1">
            <div class="bg-white border border-gray-200 rounded-md shadow-lg">
                <slot></slot>
            </div>
        </div>
    </Transition>
</template>

<script>
export default {
    props: {
        show: {
            type: Boolean,
            default() {
                return false;
            }
        }
    },


}
</script>

<style lang="scss" scoped></style>