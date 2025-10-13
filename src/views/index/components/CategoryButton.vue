<template>
    <div>
        <BaseContainer class="  cursor-pointer bg-[#ededed] rounded-lg hover:bg-[#cbcbcb] aspect-[20/9] ">
             <ButtonLabel class=" text-slate-600  text-[14px] hover:text-black " bgColor="" hoverEffect=""  :text=text></ButtonLabel>
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