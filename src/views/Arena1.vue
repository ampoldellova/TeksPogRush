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
      <Pogs
        @flip="changeHand"
        @resetHand="resetHand"
        @openBetDialog="openBetDialog"
        @closeBetDialog="closeBetDialog"
      />
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

      <el-dialog
        v-model="betDialog"
        title="Place your bet"
        width="500"
        align-center
        style="font-family: bold; text-align: center; height: 300px"
        :show-close="false"
      >
        <el-row
          style="display: flex; justify-content: center; align-items: center; margin-top: 20px"
        >
          <el-col :span="8" style="display: flex; justify-content: center; align-items: center">
            <motion.button
              :whileHover="{
                scale: 1.2,
              }"
              :whilePress="{ scale: 0.9 }"
              style="
                width: 100px;
                height: 100px;
                border-width: 0;
                background-color: transparent;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
              "
            >
              <motion.img :src="heads1" style="width: 100px; height: 100px" />
              <el-text :style="{ fontFamily: 'bold', color: COLORS.dark, marginTop: '5px' }"
                >Pog 1</el-text
              >
            </motion.button>
          </el-col>
          <el-col :span="8" style="display: flex; justify-content: center; align-items: center">
            <motion.button
              :whileHover="{
                scale: 1.2,
              }"
              :whilePress="{ scale: 0.9 }"
              style="
                width: 100px;
                height: 100px;
                border-width: 0;
                background-color: transparent;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
              "
            >
              <motion.img :src="heads2" style="width: 100px; height: 100px" />
              <el-text :style="{ fontFamily: 'bold', color: COLORS.dark, marginTop: '5px' }"
                >Equalizer</el-text
              >
            </motion.button>
          </el-col>
          <el-col :span="8" style="display: flex; justify-content: center; align-items: center">
            <motion.button
              :whileHover="{
                scale: 1.2,
              }"
              :whilePress="{ scale: 0.9 }"
              style="
                width: 100px;
                height: 100px;
                border-width: 0;
                background-color: transparent;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
              "
            >
              <motion.img :src="heads3" style="width: 100px; height: 100px" />
              <el-text :style="{ fontFamily: 'bold', color: COLORS.dark, marginTop: '5px' }"
                >Pog 2</el-text
              >
            </motion.button>
          </el-col>
        </el-row>
      </el-dialog>
    </div>
  </div>
</template>

<script setup lang="ts">
import backgrounds from '@/assets/Background.png'
import hand1 from '@/assets/hand1.png'
import hand2 from '@/assets/hand2.png'
import heads1 from '@/assets/pogs/Tikbalang.png'
import heads2 from '@/assets/pogs/Jeepney.png'
import heads3 from '@/assets/pogs/Festival.png'

import Pogs from '@/components/Pogs.vue'
import { motion } from 'motion-v'
import { ref } from 'vue'
import { COLORS } from '@/assets/theme'

const currentHand = ref(hand1)
const betDialog = ref(false)

const changeHand = () => {
  currentHand.value = hand2
}

const resetHand = () => {
  currentHand.value = hand1
}

const openBetDialog = () => {
  betDialog.value = true
}

const closeBetDialog = () => {
  betDialog.value = false
}
</script>

<style scoped></style>
