<template>
  <el-dialog v-model="confirmationDialog" title="Warning" width="400" align-center>
    <template #header>
      <el-text :style="{ fontFamily: 'bold', color: COLORS.dark }">Oops!</el-text>
    </template>

    <el-result
      icon="warning"
      title="Warning Tip"
      sub-title="It seems you don't have enough chips to enter the arena, you can buy chips from the shop or
      would you like to try friendly arena instead?"
    >
      <template #extra>
        <el-button @click="emit('onClose')" type="primary">Back</el-button>
        <el-button @click="emit('onFriendlyButtonClick')" type="primary">Friendly Arena</el-button>
      </template>
    </el-result>
  </el-dialog>
</template>

<script setup lang="ts">
import { COLORS } from '@/assets/theme'
import { ref } from 'vue'
const confirmationDialog = ref(false)

const emit = defineEmits(['onClose', 'onFriendlyButtonClick'])
</script>

<style scoped></style>
