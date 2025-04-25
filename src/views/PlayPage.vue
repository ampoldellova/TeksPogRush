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
      <Timer :currentTimerImage="currentTimerImage" />
      <Pogs :animation1="animation1" :animation2="animation2" :animation3="animation3" />
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

  <WinnerDialog v-model="showWinner" :winnerImage="winnerImage" />
</template>

<script setup lang="ts">
import backgrounds from '@/assets/Background.png'
import Timer from '@/components/Play/Timer.vue'
import timer0 from '@/assets/Timer/0.png'
import timer1 from '@/assets/Timer/1.png'
import timer2 from '@/assets/Timer/2.png'
import timer3 from '@/assets/Timer/3.png'
import timer4 from '@/assets/Timer/4.png'
import timer5 from '@/assets/Timer/5.png'
import timer6 from '@/assets/Timer/6.png'
import timer7 from '@/assets/Timer/7.png'
import timer8 from '@/assets/Timer/8.png'
import timer9 from '@/assets/Timer/9.png'
import timer10 from '@/assets/Timer/10.png'
import timer11 from '@/assets/Timer/11.png'
import timer12 from '@/assets/Timer/12.png'

import Pogs from '@/components/Play/Pogs.vue'
import heads1 from '@/assets/pogs/Tikbalang.png'
import heads2 from '@/assets/pogs/Jeepney.png'
import heads3 from '@/assets/pogs/Festival.png'
import tails from '@/assets/pogs/Tails.png'
import draw from '@/assets/pogs/Draw.png'

import Hand from '@/components/Play/Hand.vue'
import hand1 from '@/assets/hand1.png'
import hand2 from '@/assets/hand2.png'

import BetButton from '@/components/Play/BetButton.vue'

import BetDialog from '@/components/Play/BetDialog.vue'
import chip10 from '@/assets/chips/10.png'
import chip20 from '@/assets/chips/20.png'
import chip50 from '@/assets/chips/50.png'
import chip100 from '@/assets/chips/100.png'
import chip200 from '@/assets/chips/200.png'
import chip500 from '@/assets/chips/500.png'

import WinnerDialog from '@/components/Play/WinnerDialog.vue'

import { reactive, ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'

interface Bet {
  type: 'Pog1' | 'Equalizer' | 'Pog2'
  value: number
}

//Timer
const progress = ref(0)
const currentTimerImage = ref(timer12)
const timerImages = [
  timer0,
  timer1,
  timer2,
  timer3,
  timer4,
  timer5,
  timer6,
  timer7,
  timer8,
  timer9,
  timer10,
  timer11,
  timer12,
]

//Pogs
const pog1 = ref({})
const equalizer = ref({})
const pog2 = ref({})
const animation1 = ref({})
const animation2 = ref({})
const animation3 = ref({})
const currentHand = ref(hand1)
const result = ref('')

//Bet Button
const betButtonDisplay = ref('flex')

//Bet Dialog
const Pog1BetDisplay = ref(0)
const EqualizerBetDisplay = ref(0)
const Pog2BetDisplay = ref(0)
const betHistory = ref<Bet[]>([])
const betDialog = ref(false)
const currentBet = ref(chip10)
const currentBetValue = ref(10)
const isReset = ref(false)
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

const showWinner = ref(false)
const winnerImage = ref(tails)

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

const startTimer = () => {
  openBetDialog()
  let remainingTime = 13
  const timerInterval = setInterval(() => {
    if (remainingTime > 0) {
      currentTimerImage.value = timerImages[remainingTime - 1]
      progress.value = (remainingTime / 13) * 100
      remainingTime--
    } else {
      flipCoin()
      clearInterval(timerInterval)
      progress.value = 0
    }
  }, 1000)
}

const flipCoin = () => {
  closeBetDialog()
  animation1.value = { x: '30vw', y: '0vh', rotate: 0, rotateY: 180 }
  animation2.value = { x: '0vw', y: '0vh', rotate: 0, rotateY: 180 }
  animation3.value = { x: '-30vw', y: '0vh', rotate: 0, rotateY: 180 }

  setTimeout(() => {
    animation1.value = { x: '30vw', y: '18vh', rotate: 0, rotateY: 180 }
    animation2.value = { x: '0vw', y: '18vh', rotate: 0, rotateY: 180 }
    animation3.value = { x: '-30vw', y: '18vh', rotate: 0, rotateY: 180 }

    setTimeout(() => {
      currentHand.value = hand2

      pog1.value = Math.random() > 0.5 ? 'Tails' : 'Heads'
      pog2.value = Math.random() > 0.5 ? 'Tails' : 'Heads'
      equalizer.value = Math.random() > 0.5 ? 'Tails' : 'Heads'

      animation1.value = {
        x: Math.random() * 100 - Math.random(),
        y: Math.random() * 100 - Math.random(),
        rotate: 1800,
        rotateY: pog1.value === 'Tails' ? 360 : 540,
      }
      animation2.value = {
        x: Math.random() * 100 - Math.random(),
        y: Math.random() * 100 - Math.random(),
        rotate: 1800,
        rotateY: equalizer.value === 'Tails' ? 360 : 540,
      }
      animation3.value = {
        x: Math.random() * 100 - Math.random(),
        y: Math.random() * 100 - Math.random(),
        rotate: 1800,
        rotateY: pog2.value === 'Tails' ? 360 : 540,
      }

      setTimeout(() => {
        if (pog1.value !== pog2.value && pog1.value !== equalizer.value) {
          winnerImage.value = heads1
          showWinner.value = true
          result.value = 'Pog1 is the winner'
        } else if (equalizer.value !== pog1.value && equalizer.value !== pog2.value) {
          winnerImage.value = heads2
          showWinner.value = true
          result.value = 'Equalizer is the winner'
        } else if (pog2.value !== pog1.value && pog2.value !== equalizer.value) {
          winnerImage.value = heads3
          showWinner.value = true
          result.value = 'Pog2 is the winner'
        } else {
          winnerImage.value = draw
          showWinner.value = true
          result.value = 'Draw!'
        }
        console.log('Result:', result.value)
        setTimeout(() => {
          showWinner.value = false
          currentHand.value = hand1
          animation1.value = { x: 0, y: 0, rotate: 0, rotateY: 0 }
          animation2.value = { x: 0, y: 0, rotate: 0, rotateY: 0 }
          animation3.value = { x: 0, y: 0, rotate: 0, rotateY: 0 }
          startTimer()
        }, 5000)
      }, 2000)
    }, 2000)
  }, 3000)
}

onMounted(() => {
  startTimer()
})
</script>

<style scoped></style>
