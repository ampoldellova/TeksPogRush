<template>
  <motion.div
    :animate="{ opacity: 1, scale: 1 }"
    :initial="{ opacity: 0, scale: 0.8 }"
    :transition="{ duration: 0.5, ease: 'easeInOut' }"
    style="
      position: absolute;
      bottom: 0;
      transform: translate(-50%, 0);
      z-index: 1;
      display: flex;
      justify-content: center;
      align-items: center;
    "
  >
    <motion.img
      :src="props.currentHand"
      :animate="{ opacity: 1, scale: 1 }"
      :initial="{ opacity: 0, scale: 0.8 }"
      :transition="{ duration: 0.5, ease: 'easeInOut' }"
      style="width: 70%; height: 70%; position: relative"
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
