<template>
    <div>
            <BaseContainer class=" cursor-pointer rounded-lg w-[72px] h-[31px] ">
                <ButtonLabel class=" text-slate-600  text-[14px] hover:text-blue-500" bgColor="" hoverEffect="" :text="text"></ButtonLabel>
                    <template #left >
                        <el-icon class="mr-[4px] !text-black">
                            <slot class=""></slot>
                        </el-icon>
                    </template>
            </BaseContainer>
    </div>
</template>

<script setup>
import BaseContainer from "@/views/components/BaseContainer.vue";
import ButtonLabel from "@/views/components/ButtonLabel.vue";
const props = defineProps({
        text:{
            type: String,
            default: "分类"
        },

     })
</script>

<style lang="scss" scoped>

</style>