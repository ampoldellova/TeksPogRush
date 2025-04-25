<template>
  <motion.div
    :animate="{ opacity: 1, scale: 1 }"
    :initial="{ opacity: 0, scale: 0.8 }"
    :transition="{ duration: 0.5, ease: 'easeInOut' }"
    style="width: 100px; height: 100px; position: absolute; top: 20%"
  >
    <motion.div
      :animate="{ opacity: 1 }"
      :initial="{ opacity: 0 }"
      :transition="{ duration: 0.5, ease: 'easeInOut' }"
      style="position: relative; z-index: 1; width: 100%; height: 100%"
    >
      <motion.img
        :key="props.currentTimerImage"
        :src="props.currentTimerImage"
        :animate="{ opacity: 1, scale: 1 }"
        :initial="{ opacity: 0, scale: 0.8 }"
        :transition="{ duration: 0.5, ease: 'easeInOut' }"
        style="width: 100px; height: 100px"
      />
    </motion.div>
  </motion.div>
</template>

<script setup lang="ts">
import { motion } from 'motion-v'

const props = defineProps<{
  currentTimerImage: string
}>()
</script>

<style scoped></style>
