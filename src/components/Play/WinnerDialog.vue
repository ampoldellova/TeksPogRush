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
    }"
    :show-close="false"
    :close-on-click-modal="false"
  >
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showWinner = ref(false)

const props = defineProps<{
  winnerImage: string
}>()
</script>

<style scoped></style>
