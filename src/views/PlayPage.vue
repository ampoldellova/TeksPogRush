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
      <!-- <motion.div
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
      </motion.div> -->
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
import Pogs from '@/components/Pogs.vue'
import { motion } from 'motion-v'
import { ref } from 'vue'

const currentHand = ref(hand1)

const changeHand = () => {
  currentHand.value = hand2
}

const resetHand = () => {
  currentHand.value = hand1
}
</script>

<style scoped></style>
