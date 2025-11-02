<template>
  <div class="dash-video-container">
    <video
      ref="videoRef"
      controls
      playsinline
      class="dash-video"
    ></video>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'

const props = defineProps({
  src: {
    type: String,
    required: true,
    default: ''
  }
})

const videoRef = ref(null)
let player = null

// 初始化 dash.js 播放器
const initPlayer = () => {
  if (typeof dashjs === 'undefined') {
    console.error('dash.js is not loaded')
    return
  }

  if (player) {
    player.reset()
  }

  player = dashjs.MediaPlayer().create()
  player.initialize(videoRef.value, props.src, true)
}

// 销毁播放器
const destroyPlayer = () => {
  if (player) {
    player.reset()
    player = null
  }
}

// 监听 src 变化重新加载
watch(() => props.src, (newSrc) => {
  if (newSrc) {
    initPlayer()
  }
})

onMounted(() => {
  if (props.src) {
    initPlayer()
  }
})

onUnmounted(() => {
  destroyPlayer()
})
</script>

<style scoped>
.dash-video-container {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #000;
}

.dash-video {
  width: 100%;
  height: 100%;
  display: block;
  outline: none;
}
</style>