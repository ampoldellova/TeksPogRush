<template>
  <motion.div
    :animate="props.animation1"
    :transition="{ duration: 1, ease: 'easeInOut' }"
    :style="{
      position: 'absolute',
      top: '50%',
      left: '20%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      transformStyle: 'preserve-3d',
    }"
  >
    <motion.img :src="heads1" fit="contain" class="responsive-image" />

    <motion.img
      :src="tails"
      fit="contain"
      class="responsive-image"
      :style="{
        transform: 'rotateY(180deg)',
        backfaceVisibility: 'hidden',
      }"
    />
  </motion.div>

  <motion.div
    :animate="props.animation2"
    :transition="{ duration: 1, ease: 'easeInOut' }"
    :style="{
      position: 'absolute',
      top: '50%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      transformStyle: 'preserve-3d',
    }"
  >
    <motion.img :src="heads2" fit="contain" class="responsive-image" />

    <motion.img
      :src="tails"
      fit="contain"
      class="responsive-image"
      :style="{
        transform: 'rotateY(180deg)',
        backfaceVisibility: 'hidden',
      }"
    />
  </motion.div>

  <motion.div
    :animate="props.animation3"
    :transition="{ duration: 1, ease: 'easeInOut' }"
    :style="{
      position: 'absolute',
      top: '50%',
      right: '20%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      transformStyle: 'preserve-3d',
    }"
  >
    <motion.img :src="heads3" fit="contain" class="responsive-image" />

    <motion.img
      :src="tails"
      fit="contain"
      class="responsive-image"
      :style="{
        transform: 'rotateY(180deg)',
        backfaceVisibility: 'hidden',
      }"
    />
  </motion.div>
</template>

<script setup lang="ts">
import { motion } from 'motion-v'
import heads1 from '@/assets/pogs/Tikbalang.png'
import heads2 from '@/assets/pogs/Jeepney.png'
import heads3 from '@/assets/pogs/Festival.png'
import tails from '@/assets/pogs/Tails.png'

const props = defineProps<{
  animation1: {}
  animation2: {}
  animation3: {}
}>()
</script>

<style scoped>
.responsive-image {
  width: 100px;
  height: 100px;
  position: absolute;
  border-width: 1px;
  border-color: white;
  border-style: solid;
  border-radius: 50%;
}

@media (max-width: 600px) {
  .responsive-image {
    width: 80px;
    height: 80px;
  }
}

@media (min-width: 1201px) {
  .responsive-image {
    width: 100px;
    height: 100px;
  }
}
</style>
