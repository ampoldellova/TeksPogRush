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
    <el-image
      :src="heads1"
      fit="contain"
      :style="{
        width: '100px',
        height: '100px',
        position: 'absolute',
        borderWidth: '1px',
        borderColor: 'white',
        borderStyle: 'solid',
        borderRadius: '50%',
      }"
    />

    <el-image
      :src="tails"
      fit="contain"
      :style="{
        width: '100px',
        height: '100px',
        position: 'absolute',
        transform: 'rotateY(180deg)',
        backfaceVisibility: 'hidden',
        borderWidth: '1px',
        borderColor: 'white',
        borderStyle: 'solid',
        borderRadius: '50%',
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
    <el-image
      :src="heads2"
      fit="contain"
      :style="{
        width: '100px',
        height: '100px',
        position: 'absolute',
        borderWidth: '1px',
        borderColor: 'white',
        borderStyle: 'solid',
        borderRadius: '50%',
      }"
    />

    <el-image
      :src="tails"
      fit="contain"
      :style="{
        width: '100px',
        height: '100px',
        position: 'absolute',
        transform: 'rotateY(180deg)',
        backfaceVisibility: 'hidden',
        borderWidth: '1px',
        borderColor: 'white',
        borderStyle: 'solid',
        borderRadius: '50%',
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
    <el-image
      :src="heads3"
      fit="contain"
      :style="{
        width: '100px',
        height: '100px',
        position: 'absolute',
        borderWidth: '1px',
        borderColor: 'white',
        borderStyle: 'solid',
        borderRadius: '50%',
      }"
    />

    <el-image
      :src="tails"
      fit="contain"
      :style="{
        width: '100px',
        height: '100px',
        position: 'absolute',
        transform: 'rotateY(180deg)',
        backfaceVisibility: 'hidden',
        borderWidth: '1px',
        borderColor: 'white',
        borderStyle: 'solid',
        borderRadius: '50%',
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

<style scoped></style>
