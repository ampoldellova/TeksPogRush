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

        <el-row>
          <el-col
            :xs="24"
            :sm="24"
            :md="12"
            :lg="12"
            :xl="12"
            style="display: flex; justify-content: center; align-items: center"
          >
            <RouterLink to="/arena">
              <motion.button
                @click="buttonClick"
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
                  margin: '20px',
                }"
              >
                A R E N A
              </motion.button>
            </RouterLink>
          </el-col>
          <el-col
            :xs="24"
            :sm="24"
            :md="12"
            :lg="12"
            :xl="12"
            style="display: flex; justify-content: center; align-items: center"
          >
            <RouterLink to="/friendly-arena">
              <motion.button
                @click="buttonClick"
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
                  margin: '20px',
                }"
              >
                F R I E N D L Y
              </motion.button>
            </RouterLink>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import backgrounds from '@/assets/Background.png'
import logo from '@/assets/TeksPogRush-Logo.png'
import { motion } from 'motion-v'
import clickSound from '@/assets/sounds/click.wav'

const buttonClick = () => {
  const audio = new Audio(clickSound)
  audio.play()
}
</script>

<style scoped></style>
