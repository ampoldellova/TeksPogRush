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
      <Hand :currentHand="currentHand" />
      <BetButton @openBetDialog="openBetDialog" :betButtonDisplay="betButtonDisplay" />
    </div>
  </div>

  <BetDialog
    v-model="betDialog"
    :chips="chips"
    :currentBet="currentBet"
    :pog1BetDisplay="Pog1BetDisplay"
    :equalizerBetDisplay="EqualizerBetDisplay"
    :pog2BetDisplay="Pog2BetDisplay"
    @closeChipOptions="closeChipsOptions"
    @changeBetChip="changeBetChip"
    @placeBetPog1="placeBetPog1"
    @placeBetEqualizer="placeBetEqualizer"
    @placeBetPog2="placeBetPog2"
    @undoBet="undoBet"
    @clearBets="clearBets"
  />
</template>

<script setup lang="ts">
import backgrounds from '@/assets/Background.png'
import hand1 from '@/assets/hand1.png'
import hand2 from '@/assets/hand2.png'
import Pogs from '@/components/Pogs.vue'
import chip10 from '@/assets/chips/10.png'
import chip20 from '@/assets/chips/20.png'
import chip50 from '@/assets/chips/50.png'
import chip100 from '@/assets/chips/100.png'
import chip200 from '@/assets/chips/200.png'
import chip500 from '@/assets/chips/500.png'
import { reactive, ref } from 'vue'
import BetDialog from '@/components/BetDialog.vue'
import { ElMessage } from 'element-plus'
import Hand from '@/components/Hand.vue'
import BetButton from '@/components/BetButton.vue'

interface Bet {
  type: 'Pog1' | 'Equalizer' | 'Pog2'
  value: number
}

const betHistory = ref<Bet[]>([])
const currentHand = ref(hand1)
const betDialog = ref(false)
const currentBet = ref(chip10)
const currentBetValue = ref(10)
const isReset = ref(false)
const Pog1BetDisplay = ref(0)
const EqualizerBetDisplay = ref(0)
const Pog2BetDisplay = ref(0)
const betButtonDisplay = ref('flex')

const chips = reactive([
  {
    src: chip10,
    animation: {},
    action: () => {
      currentBet.value = chip10
      currentBetValue.value = 10
      closeChipsOptions()
    },
  },
  {
    src: chip20,
    animation: {},
    action: () => {
      currentBet.value = chip20
      currentBetValue.value = 20
      closeChipsOptions()
    },
  },
  {
    src: chip50,
    animation: {},
    action: () => {
      currentBet.value = chip50
      currentBetValue.value = 50
      closeChipsOptions()
    },
  },
  {
    src: chip100,
    animation: {},
    action: () => {
      currentBet.value = chip100
      currentBetValue.value = 100
      closeChipsOptions()
    },
  },
  {
    src: chip200,
    animation: {},
    action: () => {
      currentBet.value = chip200
      currentBetValue.value = 200
      closeChipsOptions()
    },
  },
  {
    src: chip500,
    animation: {},
    action: () => {
      currentBet.value = chip500
      currentBetValue.value = 500
      closeChipsOptions()
    },
  },
])

const changeHand = () => {
  currentHand.value = hand2
}

const resetHand = () => {
  currentHand.value = hand1
}

const openBetDialog = () => {
  betDialog.value = true
  betButtonDisplay.value = 'flex'
}

const closeBetDialog = () => {
  betDialog.value = false
  betButtonDisplay.value = 'none'
}

const changeBetChip = () => {
  if (isReset.value) {
    chips[0].animation = { x: '0px', y: '0px' }
    chips[1].animation = { x: '0px', y: '0px' }
    chips[2].animation = { x: '0px', y: '0px' }
    chips[3].animation = { x: '0px', y: '0px' }
    chips[4].animation = { x: '0px', y: '0px' }
    chips[5].animation = { x: '0px', y: '0px' }
  } else {
    chips[0].animation = { x: '-172px', y: '-10px' }
    chips[1].animation = { x: '-154px', y: '87px' }
    chips[2].animation = { x: '-86px', y: '152px' }
    chips[3].animation = { x: '86px', y: '152px' }
    chips[4].animation = { x: '154px', y: '87px' }
    chips[5].animation = { x: '172px', y: '-10px' }
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
    betHistory.value.push({ type: 'Pog1', value: currentBetValue.value })
    console.log('Bet History:', betHistory.value)
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
    betHistory.value.push({ type: 'Equalizer', value: currentBetValue.value })
    console.log('Bet History:', betHistory.value)
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
    betHistory.value.push({ type: 'Pog2', value: currentBetValue.value })
    console.log('Bet History:', betHistory.value)
  } else {
    ElMessage({
      message: 'You can only bet a maximum of ₱500',
      grouping: true,
      type: 'error',
    })
  }
}

const undoBet = () => {
  const lastBet = betHistory.value.pop()
  if (lastBet) {
    if (lastBet.type === 'Pog1') {
      Pog1BetDisplay.value -= lastBet.value
    } else if (lastBet.type === 'Equalizer') {
      EqualizerBetDisplay.value -= lastBet.value
    } else if (lastBet.type === 'Pog2') {
      Pog2BetDisplay.value -= lastBet.value
    }
    console.log('Bet History:', betHistory.value)
  } else {
    ElMessage({
      message: 'No bets to undo!',
      grouping: true,
      type: 'warning',
    })
  }
}

const clearBets = () => {
  Pog1BetDisplay.value = 0
  EqualizerBetDisplay.value = 0
  Pog2BetDisplay.value = 0
  betHistory.value = []
  ElMessage({
    message: 'All bets cleared!',
    grouping: true,
    type: 'success',
  })
  console.log('Bet History:', betHistory.value)
}
</script>

<style scoped></style>
