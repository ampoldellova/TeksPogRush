<template>
  <div
    :style="{
      backgroundImage: `url(${backgrounds})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh',
      width: '100%',
    }"
  >
    <div
      :style="{
        background: 'linear-gradient(to bottom, black, transparent)',
        height: '100vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }"
    >
      <motion.div
        :animate="{ opacity: 1, scale: 1 }"
        :initial="{ opacity: 0, scale: 0.8 }"
        :transition="{ duration: 0.5, ease: 'easeInOut' }"
        style="width: 100px; height: 100px; position: absolute; top: 20%"
      >
        <svg
          viewBox="0 0 36 36"
          style="
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            transform: rotate(-90deg);
          "
        >
          <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#e6e6e6" stroke-width="2" />
          <circle
            cx="18"
            cy="18"
            r="15.915"
            fill="transparent"
            :stroke="progressColor"
            stroke-width="2"
            stroke-dasharray="100, 100"
            :stroke-dashoffset="progress"
            stroke-linecap="round"
            :animate="{ strokeDashoffset: progress }"
            :transition="{ duration: 15, ease: 'linear' }"
          />
        </svg>
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
      <Pogs @flip="changeHand" @resetHand="resetHand" />
      <motion.div
        :animate="{ opacity: 1, scale: 1 }"
        :initial="{ opacity: 0, scale: 0.8 }"
        :transition="{ duration: 0.5, ease: 'easeInOut' }"
        style="position: absolute; bottom: 0"
      >
        <motion.img
          :src="currentHand"
          :animate="{ opacity: 1, scale: 1 }"
          :initial="{ opacity: 0, scale: 0.8 }"
          :transition="{ duration: 0.5, ease: 'easeInOut' }"
          style="width: 350px; height: 350px; position: relative"
        />
      </motion.div>
    </div>
  </div>
</template>

<script setup lang="ts">
import backgrounds from '@/assets/Background.png'
import hand1 from '@/assets/hand1.png'
import hand2 from '@/assets/hand2.png'
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
import timer13 from '@/assets/Timer/13.png'
import timer14 from '@/assets/Timer/14.png'
import timer15 from '@/assets/Timer/15.png'
import Pogs from '@/components/Pogs.vue'
import { fr } from 'element-plus/es/locales.mjs'
import { motion } from 'motion-v'
import { onMounted, ref } from 'vue'
import { COLORS } from '@/assets/theme'

const currentHand = ref(hand1)
const currentTimerImage = ref(timer15) // Start with timer15
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
  timer13,
  timer14,
  timer15,
]

const progress = ref(0)
const progressColor = ref(COLORS.secondary)

const changeHand = () => {
  currentHand.value = hand2
}

const resetHand = () => {
  currentHand.value = hand1
}

const startTimer = () => {
  let remainingTime = 16
  const timerInterval = setInterval(() => {
    if (remainingTime > 0) {
      currentTimerImage.value = timerImages[remainingTime - 1]
      progress.value = (remainingTime / 16) * 100
      remainingTime--
    } else {
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
