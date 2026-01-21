<template>
    <BaseContainer class="text-white bg-[#fc8bab] cursor-pointer rounded-lg !h-[34px] p-3 " @Click="clickTag()">
        <ButtonLabel class="  text-[14px] !hidden lg:!block " bgColor="" hoverEffect="" text="投稿">
        </ButtonLabel>
        <template #left>
            <el-icon class="!w-[30px] !">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"
                    class="!w-[18px] !h-[18px] header-upload-entry__icon">
                    <path
                        d="M12.0824 10H14.1412C15.0508 10 15.7882 10.7374 15.7882 11.6471V12.8824C15.7882 13.792 15.0508 14.5294 14.1412 14.5294H3.84707C2.93743 14.5294 2.20001 13.792 2.20001 12.8824V11.6471C2.20001 10.7374 2.93743 10 3.84707 10H5.90589"
                        stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"></path>
                    <path d="M8.99413 11.2353L8.99413 3.82353" stroke="currentColor" stroke-width="1.7"
                        stroke-linecap="round" stroke-linejoin="round">
                    </path>
                    <path d="M12.0823 6.29413L8.9941 3.20589L5.90587 6.29413" stroke="currentColor" stroke-width="1.7"
                        stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
            </el-icon>
        </template>
    </BaseContainer>
    <BaseModal v-model="show" class="" aria-labelledby="modal-title" @close="close">
        <div class="p-6 w-[820px] min-h-[500px]">
            <VideoUpload ref="videoUploadRef"></VideoUpload>
        </div>
    </BaseModal>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { usePublicStore } from '@/store';

// 组件导入
import BaseContainer from '@/views/components/baseComponent/BaseContainer.vue'
import ButtonLabel from '@/views/components/baseComponent/ButtonLabel.vue'
import BaseModal from '@/views/components/baseComponent/BaseModal.vue';
import VideoUpload from '@/views/components/VideoUpload.vue';
import BaseFullPageContainer from '../../baseComponent/BaseFullPageContainer.vue';
//Store
const publicStore = usePublicStore();

//计算属性
const show = ref(false);
const videoUploadRef = ref(null);
//方法
function close() {
    videoUploadRef.value.clearSelect()
}
function clickTag() {
    show.value = true;
}
//生命周期
onMounted(() => {

})
onBeforeUnmount(() => {

})
</script>