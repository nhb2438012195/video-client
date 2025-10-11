<template>
    <div>
        <BaseContainer class=" cursor-pointer bg-[#ededed] rounded-lg w-[72px] h-[31px] hover:bg-[#cbcbcb]">
             <ButtonLabel class=" text-slate-600  text-[14px] hover:text-black w-[72px] h-[31px]" bgColor="" hoverEffect=""  :text=text></ButtonLabel>
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