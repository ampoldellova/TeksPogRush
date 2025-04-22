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
      <GameTimer @timer="updateProgress"/>
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
import { fr } from 'element-plus/es/locales.mjs'
import { motion } from 'motion-v'
import { onMounted, ref } from 'vue'
import { COLORS } from '@/assets/theme'

const currentHand = ref(hand1)

const changeHand = () => {
  currentHand.value = hand2
}

const resetHand = () => {
  currentHand.value = hand1
}
</script>

<style scoped></style>
