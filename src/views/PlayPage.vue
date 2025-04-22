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
        :animate="animation"
        :transition="{ duration: 15, ease: 'linear' }"
        @click="startTimer"
        :style="{
          width: '100px',
          height: '100px',
          backgroundColor: 'lightblue',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }"
      >
        <span>{{ timeLeft }}s</span>  
      </motion.div> -->

      <Pogs />
    </div>
  </div>
</template>

<script setup lang="ts">
import backgrounds from '@/assets/Background.png'
import Pogs from '@/components/Pogs.vue'
// import { motion } from 'motion-v'

// import { ref } from 'vue'

// const timeLeft = ref(15)
// const animation = ref({})

// const startTimer = () => {
//   animation.value = { scale: 1.5 }

//   const timer = setInterval(() => {
//     timeLeft.value -= 1
//     if (timeLeft.value <= 0) {
//       clearInterval(timer)
//       animation.value = { scale: 1 }
//     }
//   }, 1000)
// }

// pog1.value = Math.random() > 0.5 ? 'Tails' : 'Heads'
// pog2.value = Math.random() > 0.5 ? 'Tails' : 'Heads'
// equalizer.value = Math.random() > 0.5 ? 'Tails' : 'Heads'
// animation1.value = { x: 0, y: 0, rotateY: 1800 }
// animation2.value = { x: 150, y: -42, rotateY: 1800 }
// animation3.value = { x: 300, y: -92, rotateY: 1800 }
// if (pog1.value !== pog2.value && pog1.value !== equalizer.value) {
//   result.value = 'Pog1 is the winner'
// } else if (pog2.value !== pog1.value && pog2.value !== equalizer.value) {
//   result.value = 'Pog2 is the winner'
// } else if (equalizer.value !== pog1.value && equalizer.value !== pog2.value) {
//   result.value = 'Equalizer is the winner'
// } else {
//   result.value = 'Draw!'
// }
// console.log('Result:', result.value)
// setTimeout(() => {
//   pog1.value = 'Tails'
//   pog2.value = 'Tails'
//   equalizer.value = 'Tails'
//   animation1.value = { x: 0, y: 0, rotateY: 0 }
//   animation2.value = { x: 0, y: 0, rotateY: 0 }
//   animation3.value = { x: 0, y: 0, rotateY: 0 }
// }, 6000)
</script>

<style scoped></style>
