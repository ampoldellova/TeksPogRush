<template>
  <el-dialog
    v-model="showWinner"
    width="300"
    align-center
    :style="{
      backgroundImage: `url(${props.winnerImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '300px',
      backgroundColor: 'transparent',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }"
    :show-close="false"
    :close-on-click-modal="false"
  >
    <el-image
      :src="result"
      :style="{
        display: textImageDisplay,
        width: '200px',
        height: '200px',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1,
      }"
    >
    </el-image>
    <Vue3Lottie
      :animationData="confetti"
      :loop="true"
      :style="{ height: '100vh', width: '100vw' }"
    />
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Vue3Lottie } from 'vue3-lottie'
import confetti from '@/assets/play/confetti.json'

const showWinner = ref(false)

const props = defineProps<{
  winnerImage: string
  result: string
  textImageDisplay: string
}>()
</script>

<style scoped></style>
