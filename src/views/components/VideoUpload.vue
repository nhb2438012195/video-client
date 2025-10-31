<template>
    <div class="video-upload">
        <h3>上传视频</h3>

        <!-- 文件选择区域 -->
        <el-upload ref="uploadRef" :class="{ 'upload-area': !canSelect }" :auto-upload="false" :show-file-list="false"
            accept="video/*" :on-change="handleFileChange" :disabled="uploading" :http-request="customUpload">
            <!-- 隐藏默认的上传区域，我们用自定义按钮 -->
            <div class="upload-placeholder" v-if="!previewUrl">
                <el-icon :size="32" color="#909399">
                    <VideoCamera />
                </el-icon>
                <p>点击“选择视频”按钮上传文件</p>
            </div>
        </el-upload>

        <!-- 视频预览 -->
        <div v-if="previewUrl" class="preview-container">
            <video :src="previewUrl" controls width="100%"></video>
        </div>

        <!-- 按钮组 -->
        <div class="button-group">
            <!-- 选择视频按钮 -->
            <el-button type="primary" plain @click="triggerFileSelect" :disabled="uploading">
                选择视频
            </el-button>

            <!-- 开始上传按钮 -->
            <el-button type="success" @click="startUpload" :disabled="!currentFile || uploading" :loading="uploading">
                {{ uploading ? '上传中...' : '开始上传' }}
            </el-button>
        </div>

        <!-- 上传进度 -->
        <div v-if="uploadProgress > 0" class="progress-section">
            <el-progress :percentage="Math.round(uploadProgress)" :stroke-width="6" :show-text="true"
                status="success" />
        </div>

        <!-- 消息提示 -->
        <p v-if="message" :class="{ error: hasError }" class="message">
            {{ message }}
        </p>
    </div>
</template>

<script setup>
import { ref, onBeforeUnmount } from 'vue'
import { ElMessage } from 'element-plus'
import { VideoCamera } from '@element-plus/icons-vue'
import { useVideoStore } from '@/store'

const videoStore = useVideoStore()
// refs
const uploadRef = ref(null)

// 状态
const previewUrl = ref('')
const currentFile = ref(null)
const uploading = ref(false)
const uploadProgress = ref(0)
const message = ref('')
const hasError = ref(false)
//是否选择
const canSelect = ref(false)
const CHUNK_SIZE = 5 * 1024 * 1024; // 10MB per chunk
// 触发文件选择
const triggerFileSelect = () => {
    uploadRef.value.$el.querySelector('input[type="file"]').click()
}

// 文件选择处理
const handleFileChange = (file) => {
    if (!file.raw.type.startsWith('video/')) {
        ElMessage.error('请选择视频文件（如 MP4、MOV、AVI 等）')
        return false
    }

    // 清理旧预览
    if (previewUrl.value) {
        URL.revokeObjectURL(previewUrl.value)
    }

    currentFile.value = file.raw
    previewUrl.value = URL.createObjectURL(currentFile.value)
    message.value = ''
    hasError.value = false
    uploadProgress.value = 0
    canSelect.value = true
}

// 手动开始上传
const startUpload = () => {
    if (!currentFile.value || uploading.value) return
    uploading.value = true
    message.value = ''
    hasError.value = false
    uploadRef.value.submit() // 触发 http-request
}

// 自定义上传逻辑（重点：你在这里填入真实上传代码）
const customUpload = async (options) => {
    const { file, onProgress, onSuccess, onError } = options
    let uploadKey = '';
    let totalChunks = 0;


    // 切分文件
    const chunks = [];
    let start = 0;
    while (start < file.size) {
        const end = Math.min(start + CHUNK_SIZE, file.size);
        chunks.push(file.slice(start, end));
        start = end;
    }
    totalChunks = chunks.length;

    //  初始化上传任务，前端告诉后端总共有多少分块，后端收到足够多的分块后就直接合并
    try {
        await videoStore.initChunkUpload({  totalChunks ,fileType: file.type });//注意这里以后应该再带上视频信息，但是现在不需要视频信息就暂时不写
        uploadKey = videoStore.uploadKey;//本次上传的凭证
        if (!uploadKey) {
            throw new Error('后端未返回 uploadKey');
        }
    } catch (err) {
        console.error('初始化上传失败', err);
        ElMessage.error('初始化上传失败');
        onError(err);
        return;
    }

    //  上传所有分片（串行，避免浏览器卡死）这里从0开始，但是以后可以加入断点续传
    for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i];
        const partNumber = i + 1;
        try {
            const formData = new FormData();
            formData.append('chunk', chunk);
            formData.append('partNumber', partNumber);
            formData.append('uploadKey', uploadKey);

            const res = await videoStore.chunkUploadVideo(formData)
                .then(res => {
                    const percent = partNumber/totalChunks * 100;
                    onProgress({ percent });
                    ElMessage.success(`分片${partNumber} 上传成功`);
                })
                .catch(err => {
                    console.error(`分片 ${partNumber} 上传失败`, err);
                    ElMessage.error("上传失败");
                    throw err;
                })
            console.log(`分片 ${partNumber} 上传成功`);
        } catch (err) {
            console.error(`分片 ${partNumber} 上传失败`, err);
            ElMessage.error("上传失败");
            onError(err)
            return;
        }
    }
    ElMessage.success("上传成功");
    onSuccess({ uploadKey});
}

// 上传成功
const handleSuccess = (response) => {
    uploading.value = false
    message.value = '视频上传成功！'
    hasError.value = false
    // 可选：清空文件
    // currentFile.value = null
    // URL.revokeObjectURL(previewUrl.value)
    // previewUrl.value = ''
}

// 上传失败
const handleError = (err) => {
    uploading.value = false
    hasError.value = true
    message.value = '上传失败，请检查网络或文件格式'
    console.error('Upload error:', err)
}

// 组件卸载时清理 object URL
onBeforeUnmount(() => {
    if (previewUrl.value) {
        URL.revokeObjectURL(previewUrl.value)
    }
})
</script>

<style scoped>
.video-upload {
    max-width: 560px;
    margin: 24px auto;
    padding: 24px;
    border: 1px solid #ebeef5;
    border-radius: 12px;
    background-color: #fafafa;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.upload-area {
    width: 100%;
    height: 120px;
    border: 2px dashed #d9d9d9;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: border-color 0.3s;
    margin-bottom: 20px;
}

.upload-area:hover {
    border-color: #409eff;
}

.upload-placeholder {
    text-align: center;
    color: #909399;
}

.upload-placeholder p {
    margin-top: 8px;
    font-size: 14px;
}

.preview-container {
    margin: 20px 0;
    border-radius: 8px;
    overflow: hidden;
    background: #000;
}

.button-group {
    display: flex;
    gap: 12px;
    justify-content: center;
    margin: 16px 0;
}

.progress-section {
    margin: 16px 0;
}

.message {
    text-align: center;
    min-height: 1.4em;
    margin: 8px 0;
}

.error {
    color: #f56c6c;
}
</style>