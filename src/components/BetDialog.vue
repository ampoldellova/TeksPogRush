<template>
  <el-dialog
    v-model="betDialog"
    width="500"
    align-center
    :style="{
      backgroundImage: `url(${BetDialog})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '330px',
      backgroundColor: 'transparent',
    }"
    :show-close="false"
    @close="closeChipsOptions"
  >
    <div style="display: flex; justify-content: center; align-items: center; margin-top: 20px">
      <el-text :style="{ fontFamily: 'bold', color: 'white', fontSize: '20px' }">
        PLACE YOUR BET
      </el-text>
    </div>

    <div style="display: flex; justify-content: center; align-items: center; margin-top: 20px">
      <motion.button
        @click="placeBetPog1"
        :whileHover="{ scale: 1.1, transition: { duration: 0.3 } }"
        :whilePress="{ scale: 0.9 }"
        :style="{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }"
      >
        <el-row>
          <el-col :span="24">
            <el-image
              :src="heads1"
              fit="contain"
              :style="{
                width: '100px',
                height: '100px',
                borderWidth: '1px',
                borderColor: 'white',
                borderStyle: 'solid',
                borderRadius: '50%',
              }"
            />
          </el-col>
          <el-col :span="24" style="margin-top: 10px">
            <el-text :style="{ fontFamily: 'regular', color: 'white' }"> POG 1 </el-text>
          </el-col>
          <el-col :span="24" style="margin-top: 10px; display: flex; justify-content: center">
            <div
              :style="{
                backgroundColor: COLORS.dark,
                height: '20px',
                width: '100px',
                borderRadius: '99px',
                borderWidth: '1px',
                borderColor: '#2a2c32',
                borderStyle: 'solid',
              }"
            >
              <el-text :style="{ fontFamily: 'regular', color: 'white' }">
                ₱ {{ Pog1BetDisplay }}
              </el-text>
            </div>
          </el-col>
        </el-row>
      </motion.button>

      <motion.button
        @click="placeBetEqualizer"
        :whileHover="{ scale: 1.1, transition: { duration: 0.3 } }"
        :whilePress="{ scale: 0.9 }"
        :style="{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }"
      >
        <el-row>
          <el-col :span="24">
            <el-image
              :src="heads2"
              fit="contain"
              :style="{
                width: '100px',
                height: '100px',
                borderWidth: '1px',
                borderColor: 'white',
                borderStyle: 'solid',
                borderRadius: '50%',
              }"
            />
          </el-col>
          <el-col :span="24" style="margin-top: 10px">
            <el-text :style="{ fontFamily: 'regular', color: 'white' }"> EQUALIZER </el-text>
          </el-col>
          <el-col :span="24" style="margin-top: 10px; display: flex; justify-content: center">
            <div
              :style="{
                backgroundColor: COLORS.dark,
                height: '20px',
                width: '100px',
                borderRadius: '99px',
                borderWidth: '1px',
                borderColor: '#2a2c32',
                borderStyle: 'solid',
              }"
            >
              <el-text :style="{ fontFamily: 'regular', color: 'white' }">
                ₱ {{ EqualizerBetDisplay }}
              </el-text>
            </div>
          </el-col>
        </el-row>
      </motion.button>

      <motion.button
        @click="placeBetPog2"
        :whileHover="{ scale: 1.1, transition: { duration: 0.3 } }"
        :whilePress="{ scale: 0.9 }"
        :style="{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }"
      >
        <el-row>
          <el-col :span="24">
            <el-image
              :src="heads3"
              fit="contain"
              :style="{
                width: '100px',
                height: '100px',
                borderWidth: '1px',
                borderColor: 'white',
                borderStyle: 'solid',
                borderRadius: '50%',
              }"
            />
          </el-col>
          <el-col :span="24" style="margin-top: 10px">
            <el-text :style="{ fontFamily: 'regular', color: 'white' }"> POG 2 </el-text>
          </el-col>
          <el-col :span="24" style="margin-top: 10px; display: flex; justify-content: center">
            <div
              :style="{
                backgroundColor: COLORS.dark,
                height: '20px',
                width: '100px',
                borderRadius: '99px',
                borderWidth: '1px',
                borderColor: '#2a2c32',
                borderStyle: 'solid',
              }"
            >
              <el-text :style="{ fontFamily: 'regular', color: 'white' }">
                ₱ {{ Pog2BetDisplay }}
              </el-text>
            </div>
          </el-col>
        </el-row>
      </motion.button>
    </div>

    <div style="display: flex; justify-content: center; align-items: center">
      <motion.button
        @click="changeBetChip"
        :whilePress="{ scale: 0.9 }"
        :whileHover="{ scale: 1.2, transition: { duration: 0.3 } }"
        :style="{
          backgroundColor: 'transparent',
          border: 'none',
          cursor: 'pointer',
          position: 'absolute',
          bottom: '-50px',
          borderWidth: '1px',
          zIndex: 1,
        }"
      >
        <motion.img
          :src="currentBet"
          :animate="{ opacity: 1, scale: 1 }"
          :initial="{ opacity: 0, scale: 0.8 }"
          :transition="{ duration: 0.5, ease: 'easeInOut' }"
          :style="{ width: '100px', height: '100px' }"
        />
      </motion.button>
    </div>

    <div style="display: flex; justify-content: center; align-items: center">
      <motion.div
        v-for="(chip, index) in chips"
        :key="index"
        :animate="chip.animation"
        :transition="{ duration: 1, ease: 'easeInOut' }"
        style="position: absolute; bottom: -50px"
      >
        <motion.button
          @click="chip.action"
          :whilePress="{ scale: 0.9 }"
          :whileHover="{ scale: 1.2, transition: { duration: 0.3 } }"
          :style="{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }"
        >
          <el-image :src="chip.src" fit="contain" :style="{ width: '80px', height: '80px' }" />
        </motion.button>
      </motion.div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { motion } from 'motion-v'
import BetDialog from '@/assets/BetDialog.png'
import chip10 from '@/assets/chips/10.png'
import chip20 from '@/assets/chips/20.png'
import chip50 from '@/assets/chips/50.png'
import chip100 from '@/assets/chips/100.png'
import chip200 from '@/assets/chips/200.png'
import chip500 from '@/assets/chips/500.png'
import heads1 from '@/assets/pogs/Tikbalang.png'
import heads2 from '@/assets/pogs/Jeepney.png'
import heads3 from '@/assets/pogs/Festival.png'
import { COLORS } from '@/assets/theme'
import { ElMessage } from 'element-plus'

const betDialog = ref(false)
const currentBet = ref(chip10)
const currentBetValue = ref(10)
const Pog1BetDisplay = ref(0)
const EqualizerBetDisplay = ref(0)
const Pog2BetDisplay = ref(0)

const isReset = ref(false)
const chips = reactive([
  {
    src: chip10,
    animation: {},
    action: () => {
      currentBet.value = chip10
      currentBetValue.value = 10
      console.log(currentBetValue.value)
    },
  },
  {
    src: chip20,
    animation: {},
    action: () => {
      currentBet.value = chip20
      currentBetValue.value = 20
      console.log(currentBetValue.value)
    },
  },
  {
    src: chip50,
    animation: {},
    action: () => {
      currentBet.value = chip50
      currentBetValue.value = 50
      console.log(currentBetValue.value)
    },
  },
  {
    src: chip100,
    animation: {},
    action: () => {
      currentBet.value = chip100
      currentBetValue.value = 100
      console.log(currentBetValue.value)
    },
  },
  {
    src: chip200,
    animation: {},
    action: () => {
      currentBet.value = chip200
      currentBetValue.value = 200
      console.log(currentBetValue.value)
    },
  },
  {
    src: chip500,
    animation: {},
    action: () => {
      currentBet.value = chip500
      currentBetValue.value = 500
      console.log(currentBetValue.value)
    },
  },
])

const changeBetChip = () => {
  if (isReset.value) {
    chips[0].animation = { x: '0px', y: '0px' }
    chips[1].animation = { x: '0px', y: '0px' }
    chips[2].animation = { x: '0px', y: '0px' }
    chips[3].animation = { x: '0px', y: '0px' }
    chips[4].animation = { x: '0px', y: '0px' }
    chips[5].animation = { x: '0px', y: '0px' }
  } else {
    chips[0].animation = { x: '-172px', y: '-32px' }
    chips[1].animation = { x: '-154px', y: '65px' }
    chips[2].animation = { x: '-86px', y: '130px' }
    chips[3].animation = { x: '86px', y: '130px' }
    chips[4].animation = { x: '154px', y: '65px' }
    chips[5].animation = { x: '172px', y: '-32px' }
  }
  isReset.value = !isReset.value
}

const closeChipsOptions = () => {
  chips[0].animation = { x: '0px', y: '0px' }
  chips[1].animation = { x: '0px', y: '0px' }
  chips[2].animation = { x: '0px', y: '0px' }
  chips[3].animation = { x: '0px', y: '0px' }
  chips[4].animation = { x: '0px', y: '0px' }
  chips[5].animation = { x: '0px', y: '0px' }
}

const placeBetPog1 = () => {
  if (Pog1BetDisplay.value + currentBetValue.value <= 500) {
    Pog1BetDisplay.value += currentBetValue.value
  } else {
    ElMessage({
      message: 'You can only bet a maximum of ₱500',
      grouping: true,
      type: 'error',
    })
  }
}

const placeBetEqualizer = () => {
  if (EqualizerBetDisplay.value + currentBetValue.value <= 500) {
    EqualizerBetDisplay.value += currentBetValue.value
  } else {
    ElMessage({
      message: 'You can only bet a maximum of ₱500',
      grouping: true,
      type: 'error',
    })
  }
}

const placeBetPog2 = () => {
  if (Pog2BetDisplay.value + currentBetValue.value <= 500) {
    Pog2BetDisplay.value += currentBetValue.value
  } else {
    ElMessage({
      message: 'You can only bet a maximum of ₱500',
      grouping: true,
      type: 'error',
    })
  }
}
</script>

<style scoped></style>
