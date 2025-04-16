<template>
  <el-text :style="{ fontFamily: 'regular', fontSize: '14px', color: 'white', cursor: 'pointer' }">
    <RouterLink :to="to" style="color: white">{{ label }}</RouterLink>
  </el-text>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
  label: string
  to: string
}>()
</script>

<style scoped></style>
