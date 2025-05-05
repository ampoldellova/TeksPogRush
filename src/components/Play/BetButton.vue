<template>
  <motion.button
    @click="emit('openBetDialog')"
    :whileHover="{
      scale: 1,
      transition: { duration: 0.3 },
    }"
    :whilePress="{ scale: 0.9 }"
    :style="{
      display: props.betButtonDisplay,
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'bold',
      width: '100px',
      backgroundColor: '#ffd200',
      color: 'black',
      borderWidth: 0,
      height: '50px',
      borderRadius: '15px',
      cursor: 'pointer',
      boxShadow: '5px 8px 0px 1px rgba(0, 0, 0, 1)',
      position: 'absolute',
      bottom: '30px',
    }"
  >
    B E T
  </motion.button>
</template>

<script setup lang="ts">
import { motion } from 'motion-v'

const props = defineProps<{
  betButtonDisplay: string
}>()

const emit = defineEmits(['openBetDialog'])
</script>

<style scoped></style>
