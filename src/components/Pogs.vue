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
        :key="currentTimerImage"
        :src="currentTimerImage"
        :animate="{ opacity: 1, scale: 1 }"
        :initial="{ opacity: 0, scale: 0.8 }"
        :transition="{ duration: 0.5, ease: 'easeInOut' }"
        style="width: 100px; height: 100px"
      />
    </motion.div>
  </motion.div>

  <motion.div
    :animate="animation1"
    :transition="{ duration: 2, ease: 'easeInOut' }"
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
    :animate="animation2"
    :transition="{ duration: 2, ease: 'easeInOut' }"
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
    :animate="animation3"
    :transition="{ duration: 2, ease: 'easeInOut' }"
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
import timer0 from '@/assets/Timer/0.png'
import timer1 from '@/assets/Timer/1.png'
import timer2 from '@/assets/Timer/2.png'
import timer3 from '@/assets/Timer/3.png'
import timer4 from '@/assets/Timer/4.png'
import timer5 from '@/assets/Timer/5.png'
import timer6 from '@/assets/Timer/6.png'
import timer7 from '@/assets/Timer/7.png'
import timer8 from '@/assets/Timer/8.png'
import timer9 from '@/assets/Timer/9.png'
import timer10 from '@/assets/Timer/10.png'
import timer11 from '@/assets/Timer/11.png'
import timer12 from '@/assets/Timer/12.png'
import { ref, defineEmits, onMounted } from 'vue'

const pog1 = ref({})
const pog2 = ref({})
const equalizer = ref({})
const result = ref('')
const animation1 = ref({})
const animation2 = ref({})
const animation3 = ref({})

const currentTimerImage = ref(timer12)
const timerImages = [
  timer0,
  timer1,
  timer2,
  timer3,
  timer4,
  timer5,
  timer6,
  timer7,
  timer8,
  timer9,
  timer10,
  timer11,
  timer12,
]

const progress = ref(0)

const emit = defineEmits(['flip', 'resetHand', 'openBetDialog', 'closeBetDialog'])

const flipCoin = () => {
  emit('closeBetDialog')
  animation1.value = { x: '30vw', y: '0vh', rotate: 0, rotateY: 180 }
  animation2.value = { x: '0vw', y: '0vh', rotate: 0, rotateY: 180 }
  animation3.value = { x: '-30vw', y: '0vh', rotate: 0, rotateY: 180 }

  setTimeout(() => {
    animation1.value = { x: '30vw', y: '18vh', rotate: 0, rotateY: 180 }
    animation2.value = { x: '0vw', y: '18vh', rotate: 0, rotateY: 180 }
    animation3.value = { x: '-30vw', y: '18vh', rotate: 0, rotateY: 180 }

    setTimeout(() => {
      pog1.value = Math.random() > 0.5 ? 'Tails' : 'Heads'
      pog2.value = Math.random() > 0.5 ? 'Tails' : 'Heads'
      equalizer.value = Math.random() > 0.5 ? 'Tails' : 'Heads'

      animation1.value = {
        x: Math.random() * 100 - Math.random(),
        y: Math.random() * 100 - Math.random(),
        rotate: 1800,
        rotateY: pog1.value === 'Tails' ? 360 : 540,
      }
      animation2.value = {
        x: Math.random() * 100 - Math.random(),
        y: Math.random() * 100 - Math.random(),
        rotate: 1800,
        rotateY: equalizer.value === 'Tails' ? 360 : 540,
      }
      animation3.value = {
        x: Math.random() * 100 - Math.random(),
        y: Math.random() * 100 - Math.random(),
        rotate: 1800,
        rotateY: pog2.value === 'Tails' ? 360 : 540,
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
      emit('flip')
      console.log('Result:', result.value)
      setTimeout(() => {
        animation1.value = { x: 0, y: 0, rotate: 0, rotateY: 0 }
        animation2.value = { x: 0, y: 0, rotate: 0, rotateY: 0 }
        animation3.value = { x: 0, y: 0, rotate: 0, rotateY: 0 }
        emit('resetHand')
        startTimer()
      }, 5000)
    }, 2000)
  }, 3000)
}

const startTimer = () => {
  emit('openBetDialog')
  let remainingTime = 13
  const timerInterval = setInterval(() => {
    if (remainingTime > 0) {
      currentTimerImage.value = timerImages[remainingTime - 1]
      progress.value = (remainingTime / 13) * 100
      remainingTime--
    } else {
      flipCoin()
      clearInterval(timerInterval)
      progress.value = 0
    }
  }, 1000)
}

onMounted(() => {
  startTimer()
})
</script>

<style scoped></style>
