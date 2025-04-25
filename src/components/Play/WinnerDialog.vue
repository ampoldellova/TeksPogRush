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
      }"
    />
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showWinner = ref(false)

const props = defineProps<{
  winnerImage: string
  result: string
  textImageDisplay: string
}>()
</script>

<style scoped></style>
