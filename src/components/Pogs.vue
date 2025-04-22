<template>
   
  <motion.div
    :animate="animation1"
    :transition="{ duration: 2, ease: 'easeInOut' }"
    @click="flipCoin"
    :style="{
      position: 'absolute',
      top: '50%',
      // left: '10%',
      borderWidth: '1px',
      borderColor: 'white',
      borderStyle: 'solid',
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
      }"
    />
  </motion.div>

  <motion.div
    :animate="animation2"
    :transition="{ duration: 2, ease: 'easeInOut' }"
    @click="flipCoin"
    :style="{
      position: 'absolute',
      top: '55%',
      // left: '10%',
      borderWidth: '1px',
      borderColor: 'white',
      borderStyle: 'solid',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '50%',
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
      }"
    />
  </motion.div>

  <motion.div
    :animate="animation3"
    :transition="{ duration: 2, ease: 'easeInOut' }"
    @click="flipCoin"
    :style="{
      position: 'absolute',
      top: '60%',
      // left: '10%',
      borderWidth: '1px',
      borderColor: 'white',
      borderStyle: 'solid',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '50%',
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
import { ref } from 'vue'

const pog1 = ref({})
const pog2 = ref({})
const equalizer = ref({})
const result = ref('')
const animation1 = ref({})
const animation2 = ref({})
const animation3 = ref({})

const flipCoin = () => {
  animation1.value = { x: 0, y: 0, rotate: 0, rotateY: 0 }
  animation2.value = { x: 0, y: -50, rotate: 0, rotateY: 0 }
  animation3.value = { x: 0, y: -100, rotate: 0, rotateY: 0 }

  setTimeout(() => {
    pog1.value = Math.random() > 0.5 ? 'Tails' : 'Heads'
    pog2.value = Math.random() > 0.5 ? 'Tails' : 'Heads'
    equalizer.value = Math.random() > 0.5 ? 'Tails' : 'Heads'

    animation1.value = {
      x: Array.from({ length: 251 }, (_, i) => i),
      y: Array.from({ length: 251 }, (_, i) => (i <= 125 ? -30 * (i / 125) : -30 * (2 - i / 125))),
      rotate: 1800,
      rotateY: pog1.value === 'Tails' ? 180 : 360,
    }

    animation2.value = {
      x: Array.from({ length: 451 }, (_, i) => i),
      y: Array.from({ length: 451 }, (_, i) =>
        i <= 225 ? -50 - 60 * (i / 225) : -50 - 60 * (2 - i / 225),
      ),
      rotate: 1800,
      rotateY: pog2.value === 'Tails' ? 180 : 360,
    }

    animation3.value = {
      x: Array.from({ length: 651 }, (_, i) => i),
      y: Array.from({ length: 651 }, (_, i) =>
        i <= 325 ? -100 - 120 * (i / 325) : -100 - 120 * (2 - i / 325),
      ),
      rotate: 1800,
      rotateY: equalizer.value === 'Tails' ? 180 : 360,
    }

    if (pog1.value !== pog2.value && pog1.value !== equalizer.value) {
      result.value = 'Pog1 is the winner'
    } else if (pog2.value !== pog1.value && pog2.value !== equalizer.value) {
      result.value = 'Pog2 is the winner'
    } else if (equalizer.value !== pog1.value && equalizer.value !== pog2.value) {
      result.value = 'Equalizer is the winner'
    } else {
      result.value = 'Draw!'
    }

    setTimeout(() => {
      animation1.value = { x: 0, y: 0, rotate: 0, rotateY: 0 }
      animation2.value = { x: 0, y: 0, rotate: 0, rotateY: 0 }
      animation3.value = { x: 0, y: 0, rotate: 0, rotateY: 0 }
    }, 15000)
  }, 3000)
}
</script>

<style scoped></style>
