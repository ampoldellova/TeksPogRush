<template>
  <motion.div
    :animate="{ opacity: 1, scale: 1 }"
    :initial="{ opacity: 0, scale: 0.8 }"
    :transition="{ duration: 0.5, ease: 'easeInOut' }"
    style="position: absolute; bottom: 0"
  >
    <motion.img
      :src="props.currentHand"
      :animate="{ opacity: 1, scale: 1 }"
      :initial="{ opacity: 0, scale: 0.8 }"
      :transition="{ duration: 0.5, ease: 'easeInOut' }"
      style="width: 350px; height: 350px; position: relative"
    />
  </motion.div>
</template>

<script setup lang="ts">
import { motion } from 'motion-v'
const props = defineProps<{
  currentHand: string
}>()
</script>

<style scoped></style>
