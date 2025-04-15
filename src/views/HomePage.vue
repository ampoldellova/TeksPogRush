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
      }"
    >
      <div
        style="
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          width: 100%;
          flex-direction: column;
        "
      >
        <motion.div
          :animate="{
            y: [0, -10, 0],
            transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
          }"
          style="display: flex; justify-content: center; align-items: center"
        >
          <el-image :src="logo" fill="cover" style="width: 100%; height: 70vh" />
        </motion.div>

        <RouterLink to="/play">
          <motion.button
            :whileHover="{
              scale: 1.2,
              transition: { duration: 0.3 },
            }"
            :whilePress="{ scale: 0.9 }"
            :style="{
              fontFamily: 'bold',
              width: '200px',
              backgroundColor: '#ffd200',
              color: 'black',
              borderWidth: 0,
              height: '50px',
              borderRadius: '15px',
              cursor: 'pointer',
              boxShadow: '5px 8px 0px 1px rgba(0, 0, 0, 1)',
            }"
          >
            S T A R T
          </motion.button>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import backgrounds from '@/assets/Background.png'
import logo from '@/assets/TeksPogRush-Logo.png'
import { COLORS } from '@/assets/theme'
import { motion } from 'motion-v'
</script>

<style scoped></style>
