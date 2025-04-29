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
    <el-row style="display: flex; justify-content: center; align-items: center; margin-top: 20px">
      <el-text :style="{ fontFamily: 'bold', color: 'white', fontSize: '20px' }">
        PLACE YOUR BET
      </el-text>
    </el-row>

    <div style="display: flex; justify-content: center; align-items: center; margin-top: 20px">
      <BetPogButton
        icon="heads1"
        label="POG 1"
        :displayValue="props.pog1BetDisplay"
        @click="placeBetPog1"
      />
      <BetPogButton
        icon="heads2"
        label="EQUALIZER"
        :displayValue="props.equalizerBetDisplay"
        @click="placeBetEqualizer"
      />
      <BetPogButton
        icon="heads3"
        label="POG 2"
        :displayValue="props.pog2BetDisplay"
        @click="placeBetPog2"
      />
    </div>

    <div style="display: flex; justify-content: center; align-items: center">
      <motion.button
        @click="changeBetChip"
        :whilePress="{ scale: 0.9 }"
        :whileHover="{ scale: 1.1, transition: { duration: 0.3 } }"
        :style="{
          backgroundColor: 'transparent',
          border: 'none',
          cursor: 'pointer',
          position: 'absolute',
          bottom: '-60px',
          borderWidth: '1px',
          zIndex: 1,
        }"
      >
        <motion.img
          :src="props.currentBet"
          :animate="{ opacity: 1, scale: 1 }"
          :initial="{ opacity: 0, scale: 0.8 }"
          :transition="{ duration: 0.5, ease: 'easeInOut' }"
          :style="{ width: '100px', height: '100px' }"
        />
      </motion.button>

      <motion.button
        @click="undoBet"
        :whilePress="{ scale: 0.9 }"
        :whileHover="{ scale: 1.1, transition: { duration: 0.3 } }"
        :style="{
          backgroundColor: COLORS.dark,
          borderRadius: '99px',
          borderWidth: '1px',
          borderColor: '#2a2c32',
          borderStyle: 'solid',
          cursor: 'pointer',
          position: 'absolute',
          bottom: '-20px',
          left: '140px',
          padding: '10px',
          zIndex: 1,
        }"
      >
        <motion.img :src="undo" :style="{ width: '30px', height: '30px' }" />
      </motion.button>

      <motion.button
        @click="clearBets"
        :whilePress="{ scale: 0.9 }"
        :whileHover="{ scale: 1.1, transition: { duration: 0.3 } }"
        :style="{
          backgroundColor: COLORS.dark,
          borderRadius: '99px',
          borderWidth: '1px',
          borderColor: '#2a2c32',
          borderStyle: 'solid',
          cursor: 'pointer',
          position: 'absolute',
          bottom: '-20px',
          right: '140px',
          padding: '10px',
          zIndex: 1,
        }"
      >
        <motion.img :src="clear" :style="{ width: '30px', height: '30px' }" />
      </motion.button>
    </div>

    <div style="display: flex; justify-content: center; align-items: center">
      <motion.div
        v-for="(chip, index) in props.chips"
        :key="index"
        :animate="chip.animation"
        :transition="{ duration: 0.5, ease: 'easeInOut' }"
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
import { ref } from 'vue'
import { motion } from 'motion-v'
import BetDialog from '@/assets/BetDialog.png'
import { COLORS } from '@/assets/theme'
import clear from '@/assets/chips/clear.png'
import undo from '@/assets/chips/undo.png'
import BetPogButton from './BetPogButton.vue'

const betDialog = ref(false)

const props = defineProps<{
  currentBet: string
  pog1BetDisplay: number
  equalizerBetDisplay: number
  pog2BetDisplay: number
  chips: Array<{
    src: string
    animation: {}
    action: () => void
  }>
}>()

const emit = defineEmits([
  'closeChipOptions',
  'changeBetChip',
  'placeBetPog1',
  'placeBetEqualizer',
  'placeBetPog2',
  'undoBet',
  'clearBets',
])

const changeBetChip = () => {
  emit('changeBetChip')
}

const closeChipsOptions = () => {
  emit('closeChipOptions')
}

const placeBetPog1 = () => {
  emit('placeBetPog1')
}

const placeBetEqualizer = () => {
  emit('placeBetEqualizer')
}

const placeBetPog2 = () => {
  emit('placeBetPog2')
}

const undoBet = () => {
  emit('undoBet')
}

const clearBets = () => {
  emit('clearBets')
}
</script>

<style scoped></style>
