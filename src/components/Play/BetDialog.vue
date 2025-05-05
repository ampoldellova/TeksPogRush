<template>
  <el-dialog
    v-model="betDialog"
    align-center
    width="500"
    class="bet-dialog"
    :style="{
      backgroundImage: `url(${BetDialog})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundColor: 'transparent',
      height: dialogHeight,
      width: dialogWidth,
    }"
    :show-close="false"
    @close="emit('closeChipOptions')"
  >
    <el-row
      :style="{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: dialogMargin,
      }"
    >
      <el-text :style="{ fontFamily: 'bold', color: 'white', fontSize: dialogLabel }">
        PLACE YOUR BET
      </el-text>
    </el-row>

    <div
      :style="{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: dialogMargin,
      }"
    >
      <BetPogButton
        icon="heads1"
        label="POG 1"
        :displayValue="props.pog1BetDisplay"
        @click="emit('placeBetPog1')"
      />
      <span v-if="props.pog1Multiplier > 1" class="multiplierPog1"
        >x{{ props.pog1Multiplier }}</span
      >
      <BetPogButton
        icon="heads2"
        label="EQUALIZER"
        :displayValue="props.equalizerBetDisplay"
        @click="emit('placeBetEqualizer')"
      />
      <span v-if="props.equalizerMultiplier > 1" class="multiplierEqualizer"
        >x{{ props.equalizerMultiplier }}</span
      >
      <BetPogButton
        icon="heads3"
        label="POG 2"
        :displayValue="props.pog2BetDisplay"
        @click="emit('placeBetPog2')"
      />

      <span v-if="props.pog2Multiplier > 1" class="multiplierPog2"
        >x{{ props.pog2Multiplier }}</span
      >
    </div>

    <div style="display: flex; justify-content: center; align-items: center">
      <motion.button
        @click="emit('changeBetChip')"
        :whilePress="{ scale: 0.9 }"
        :whileHover="{ scale: 1.1, transition: { duration: 0.3 } }"
        :style="{
          backgroundColor: 'transparent',
          border: 'none',
          cursor: 'pointer',
          position: 'absolute',
          bottom: bottomMargin.betChip,
          borderWidth: '1px',
          zIndex: 1,
        }"
      >
        <motion.img
          :src="props.currentBet"
          :animate="{ opacity: 1, scale: 1 }"
          :initial="{ opacity: 0, scale: 0.8 }"
          :transition="{ duration: 0.5, ease: 'easeInOut' }"
          :style="{ width: changeBetChipSize, height: changeBetChipSize }"
        />
      </motion.button>

      <motion.button
        @click="emit('undoBet')"
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
          bottom: bottomMargin.undoButton,
          left: leftRightMargin.undoButton,
          padding: '10px',
          zIndex: 1,
        }"
      >
        <motion.img :src="undo" :style="{ width: sideButtonSize, height: sideButtonSize }" />
      </motion.button>

      <motion.button
        @click="emit('clearBets')"
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
          bottom: bottomMargin.clearButton,
          right: leftRightMargin.clearButton,
          padding: '10px',
          zIndex: 1,
        }"
      >
        <motion.img :src="clear" :style="{ width: sideButtonSize, height: sideButtonSize }" />
      </motion.button>
    </div>

    <div style="display: flex; justify-content: center; align-items: center">
      <motion.div
        v-for="(chip, index) in props.chips"
        :key="index"
        :animate="chip.animation"
        :transition="{ duration: 0.5, ease: 'easeInOut' }"
        :style="{ position: 'absolute', bottom: bottomMargin.betChip }"
      >
        <motion.button
          @click="chip.action"
          :whilePress="{ scale: walletStore.userWalletBalance < chip.value ? 1 : 0.9 }"
          :whileHover="{
            scale: walletStore.userWalletBalance < chip.value ? 1 : 1.2,
            transition: { duration: 0.3 },
          }"
          :style="{
            backgroundColor: 'transparent',
            border: 'none',
            cursor: walletStore.userWalletBalance < chip.value ? 'not-allowed' : 'pointer',
          }"
        >
          <el-image
            :src="chip.src"
            fit="contain"
            :style="{ width: chipsSize, height: chipsSize }"
          />
        </motion.button>
      </motion.div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { motion } from 'motion-v'
import BetDialog from '@/assets/BetDialog.png'
import { COLORS } from '@/assets/theme'
import clear from '@/assets/chips/clear.png'
import undo from '@/assets/chips/undo.png'
import BetPogButton from './BetPogButton.vue'
import { useWalletStore } from '@/stores/walletStore'

const walletStore = useWalletStore()
const betDialog = ref(false)
const dialogWidth = ref('500px')
const dialogHeight = ref('330px')
const dialogLabel = ref('20px')
const dialogMargin = ref('20px')
const changeBetChipSize = ref('100px')
const bottomMargin = ref({ betChip: '-60px', undoButton: '-20px', clearButton: '-20px' })
const leftRightMargin = ref({ undoButton: '140px', clearButton: '140px' })
const sideButtonSize = ref('30px')
const chipsSize = ref('80px')

const props = defineProps<{
  currentBet: string
  pog1BetDisplay: number
  equalizerBetDisplay: number
  pog2BetDisplay: number
  pog1Multiplier: number
  equalizerMultiplier: number
  pog2Multiplier: number
  chips: Array<{
    src: string
    animation: {}
    value: number
    action: () => void
  }>
}>()

const updateDialogSize = () => {
  const width = window.innerWidth
  if (width < 600) {
    dialogWidth.value = '300px'
    dialogHeight.value = '200px'
    dialogLabel.value = '10px'
    dialogMargin.value = '5px'
    changeBetChipSize.value = '65px'
    bottomMargin.value = { betChip: '-30px', undoButton: '-10px', clearButton: '-10px' }
    leftRightMargin.value = { undoButton: '70px', clearButton: '70px' }
    sideButtonSize.value = '20px'
    chipsSize.value = '50px'
  } else {
    dialogWidth.value = '500px'
    dialogHeight.value = '330px'
    dialogLabel.value = '20px'
    dialogMargin.value = '20px'
    changeBetChipSize.value = '100px'
    bottomMargin.value = { betChip: '-60px', undoButton: '-20px', clearButton: '-20px' }
    leftRightMargin.value = { undoButton: '140px', clearButton: '140px' }
    sideButtonSize.value = '30px'
    chipsSize.value = '80px'
  }
}

onMounted(() => {
  updateDialogSize()
  window.addEventListener('resize', updateDialogSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateDialogSize)
})

const emit = defineEmits([
  'closeChipOptions',
  'changeBetChip',
  'placeBetPog1',
  'placeBetEqualizer',
  'placeBetPog2',
  'undoBet',
  'clearBets',
])
</script>

<style scoped>
.multiplierPog1 {
  position: absolute;
  display: inline-block;
  left: 73px;

  background-color: rgba(76, 0, 255, 0.9);
  color: black;
  font-size: 1.2rem;
  font-weight: bold;
  padding: 5px 10px;
  border-radius: 5px;
  text-align: center;
}

.multiplierEqualizer {
  position: absolute;
  display: inline-block;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(255, 255, 0, 0.486);
  color: black;
  font-size: 1.2rem;
  font-weight: bold;
  padding: 5px 10px;
  border-radius: 5px;
  text-align: center;
}

.multiplierPog2 {
  position: absolute;
  display: inline-block;
  right: 55px;

  background-color: rgba(0, 255, 21, 0.9);
  color: black;
  font-size: 1.2rem;
  font-weight: bold;
  padding: 5px 10px;
  border-radius: 5px;
  text-align: center;
}

.pog1 {
  background: linear-gradient(45deg, #ff0000, #ff5e5e);
  color: white;
}

.equalizer {
  background: linear-gradient(45deg, #00ff00, #5eff5e);
  color: black;
}

.pog2 {
  background: linear-gradient(45deg, #0000ff, #5e5eff);
  color: white;
}
</style>
