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
      <Timer :currentTimerImage="currentTimerImage" :showTimer="showTimer" />
      <Pogs :animation1="animation1" :animation2="animation2" :animation3="animation3" />
      <Hand v-if="showHand" :currentHand="currentHand" />
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

  <WinnerDialog
    v-model="showWinner"
    :winnerImage="winnerImage"
    :result="result"
    :textImageDisplay="textImageDisplay"
  />
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
import pog1Win from '@/assets/play/pog1Win.png'
import pog2Win from '@/assets/play/pog2Win.png'
import equalizerWin from '@/assets/play/equalizerWin.png'

import { reactive, ref, onMounted, watch } from 'vue'
import { ElMessage, type ButtonInstance } from 'element-plus'
import { useRouter } from 'vue-router'

import { useWalletStore } from '@/stores/walletStore'
import { useAuthenticationStore } from '@/stores/userStore'
import clickSound from '@/assets/sounds/click.wav'
import changeChip from '@/assets/sounds/changeChip.wav'
import closeChips from '@/assets/sounds/closeChips.wav'
import placeBet from '@/assets/sounds/placeBet.wav'
import win from '@/assets/sounds/win.wav'
import type { chipsTypes } from '@/components/models/types'

const userStore = useAuthenticationStore()
const walletStore = useWalletStore()

interface Bet {
  type: 'Pog1' | 'Equalizer' | 'Pog2'
  value: number
}

const tutorial = ref(false)

//Timer
const progress = ref(0)
const showTimer = ref('flex')
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
const tutorialButtonDisplay = ref('flex')

const ref1 = ref<ButtonInstance>()
const ref2 = ref<ButtonInstance>()
const ref3 = ref<ButtonInstance>()

//Bet Dialog
const Pog1BetDisplay = ref(0)
const showHand = ref(false)
const EqualizerBetDisplay = ref(0)
const Pog2BetDisplay = ref(0)
const betHistory = ref<Bet[]>([])
const betDialog = ref(false)
const currentBet = ref(chip10)
const currentBetValue = ref(10)
const isReset = ref(false)
const resetBet = ref(false)
const chips = reactive(<chipsTypes[]>[
  {
    src: chip10,
    animation: {},
    value: 10,
    action: () => {
      if (walletStore.userWalletBalance < 10) {
        if (!userStore.isLoggedIn) {
          ElMessage({
            message: 'You must be logged in first',
            grouping: true,
            type: 'error',
          })
        }
      } else {
        currentBet.value = chip10
        currentBetValue.value = 10
        closeChipsOptions()
      }
    },
  },
  {
    src: chip20,
    animation: {},
    value: 20,
    action: () => {
      if (walletStore.userWalletBalance < 20) {
        if (!userStore.isLoggedIn) {
          ElMessage({
            message: 'You must be logged in first',
            grouping: true,
            type: 'error',
          })
        }
      } else {
        currentBet.value = chip20
        currentBetValue.value = 20
        closeChipsOptions()
      }
    },
  },
  {
    src: chip50,
    animation: {},
    value: 50,
    action: () => {
      if (walletStore.userWalletBalance < 50) {
        if (!userStore.isLoggedIn) {
          ElMessage({
            message: 'You must be logged in first',
            grouping: true,
            type: 'error',
          })
        }
      } else {
        currentBet.value = chip50
        currentBetValue.value = 50
        closeChipsOptions()
      }
    },
  },
  {
    src: chip100,
    animation: {},
    value: 100,
    action: () => {
      if (walletStore.userWalletBalance < 100) {
        if (!userStore.isLoggedIn) {
          ElMessage({
            message: 'You must be logged in first',
            grouping: true,
            type: 'error',
          })
        }
      } else {
        currentBet.value = chip100
        currentBetValue.value = 100
        closeChipsOptions()
      }
    },
  },
  {
    src: chip200,
    animation: {},
    value: 200,
    action: () => {
      if (walletStore.userWalletBalance < 200) {
        if (!userStore.isLoggedIn) {
          ElMessage({
            message: 'You must be logged in first',
            grouping: true,
            type: 'error',
          })
        }
      } else {
        currentBet.value = chip200
        currentBetValue.value = 200
        closeChipsOptions()
      }
    },
  },
  {
    src: chip500,
    animation: {},
    value: 500,
    action: () => {
      if (walletStore.userWalletBalance < 500) {
        if (!userStore.isLoggedIn) {
          ElMessage({
            message: 'You must be logged in first',
            grouping: true,
            type: 'error',
          })
        }
      } else {
        currentBet.value = chip500
        currentBetValue.value = 500
        closeChipsOptions()
      }
    },
  },
])

const router = useRouter()
const hasActiveBet = ref(false)
watch([Pog1BetDisplay, EqualizerBetDisplay, Pog2BetDisplay], ([pog1, equalizer, pog2]) => {
  hasActiveBet.value = pog1 > 0 || equalizer > 0 || pog2 > 0
})

router.beforeEach((to, from, next) => {
  if (hasActiveBet.value) {
    const confirmLeave = window.confirm(
      'You have an active bet! If you leave, your bet will be lost. Do you really want to continue?',
    )

    if (confirmLeave) {
      Pog1BetDisplay.value = 0
      EqualizerBetDisplay.value = 0
      Pog2BetDisplay.value = 0
      betHistory.value = []
      hasActiveBet.value = false
      next()
    } else {
      next(false)
    }
  } else {
    next()
  }
})

//Winner Dialog
const showWinner = ref(false)
const winnerImage = ref(tails)
const textImageDisplay = ref('')

const resetBetDialog = () => {
  Pog1BetDisplay.value = 0
  EqualizerBetDisplay.value = 0
  Pog2BetDisplay.value = 0
  betHistory.value = []
}

const openBetDialog = () => {
  const audio = new Audio(clickSound)
  audio.play()
  betDialog.value = true
  betButtonDisplay.value = 'flex'
  tutorialButtonDisplay.value = 'flex'
}

const closeBetDialog = () => {
  betDialog.value = false
  betButtonDisplay.value = 'none'
  tutorialButtonDisplay.value = 'none'
}

const changeBetChip = () => {
  const width = window.innerWidth
  if (isReset.value) {
    const closeChipsSound = new Audio(closeChips)
    closeChipsSound.play()
    chips[0].animation = { x: '0px', y: '0px' }
    chips[1].animation = { x: '0px', y: '0px' }
    chips[2].animation = { x: '0px', y: '0px' }
    chips[3].animation = { x: '0px', y: '0px' }
    chips[4].animation = { x: '0px', y: '0px' }
    chips[5].animation = { x: '0px', y: '0px' }
  } else {
    const changeChipSound = new Audio(changeChip)
    changeChipSound.play()
    chips[0].animation = { x: width < 600 ? '-120px' : '-172px', y: width < 600 ? '-5px' : '-10px' }
    chips[1].animation = { x: width < 600 ? '-102px' : '-154px', y: width < 600 ? '57px' : '87px' }
    chips[2].animation = { x: width < 600 ? '-58px' : '-86px', y: width < 600 ? '102px' : '152px' }
    chips[3].animation = { x: width < 600 ? '58px' : '86px', y: width < 600 ? '102px' : '152px' }
    chips[4].animation = { x: width < 600 ? '102px' : '154px', y: width < 600 ? '57px' : '87px' }
    chips[5].animation = { x: width < 600 ? '120px' : '172px', y: width < 600 ? '-5px' : '-10px' }
  }
  isReset.value = !isReset.value
}

const closeChipsOptions = () => {
  const closeChipsSound = new Audio(closeChips)
  closeChipsSound.play()
  chips[0].animation = { x: '0px', y: '0px' }
  chips[1].animation = { x: '0px', y: '0px' }
  chips[2].animation = { x: '0px', y: '0px' }
  chips[3].animation = { x: '0px', y: '0px' }
  chips[4].animation = { x: '0px', y: '0px' }
  chips[5].animation = { x: '0px', y: '0px' }
}

const placeBetPog1 = () => {
  if (!userStore.isLoggedIn) {
    ElMessage({
      message: 'You must log in to place a bet.',
      grouping: true,
      type: 'error',
    })
    return
  }
  if (Pog1BetDisplay.value + currentBetValue.value <= 500) {
    if (walletStore.userWalletBalance >= currentBetValue.value) {
      const placeBetSound = new Audio(placeBet)
      placeBetSound.play()
      walletStore.updateUserWalletBalance(-currentBetValue.value)
      Pog1BetDisplay.value += currentBetValue.value
      betHistory.value.push({ type: 'Pog1', value: currentBetValue.value })
      console.log('Bet History:', betHistory.value)
    } else {
      ElMessage({
        message: 'Insufficient wallet balance!',
        grouping: true,
        type: 'error',
      })
    }
  } else {
    ElMessage({
      message: 'You can only bet a maximum of ₱500',
      grouping: true,
      type: 'error',
    })
  }
}

const placeBetEqualizer = () => {
  if (!userStore.isLoggedIn) {
    ElMessage({
      message: 'You must log in to place a bet.',
      grouping: true,
      type: 'error',
    })
    return
  }
  if (EqualizerBetDisplay.value + currentBetValue.value <= 500) {
    if (walletStore.userWalletBalance >= currentBetValue.value) {
      const placeBetSound = new Audio(placeBet)
      placeBetSound.play()
      walletStore.updateUserWalletBalance(-currentBetValue.value)
      EqualizerBetDisplay.value += currentBetValue.value
      betHistory.value.push({ type: 'Equalizer', value: currentBetValue.value })
      console.log('Bet History:', betHistory.value)
    } else {
      ElMessage({
        message: 'Insufficient wallet balance!',
        grouping: true,
        type: 'error',
      })
    }
  } else {
    ElMessage({
      message: 'You can only bet a maximum of ₱500',
      grouping: true,
      type: 'error',
    })
  }
}

const placeBetPog2 = () => {
  if (!userStore.isLoggedIn) {
    ElMessage({
      message: 'You must log in to place a bet.',
      grouping: true,
      type: 'error',
    })
    return
  }
  if (Pog2BetDisplay.value + currentBetValue.value <= 500) {
    if (walletStore.userWalletBalance >= currentBetValue.value) {
      const placeBetSound = new Audio(placeBet)
      placeBetSound.play()
      walletStore.updateUserWalletBalance(-currentBetValue.value)
      Pog2BetDisplay.value += currentBetValue.value
      betHistory.value.push({ type: 'Pog2', value: currentBetValue.value })
      console.log('Bet History:', betHistory.value)
    } else {
      ElMessage({
        message: 'Insufficient wallet balance!',
        grouping: true,
        type: 'error',
      })
    }
  } else {
    ElMessage({
      message: 'You can only bet a maximum of ₱500',
      grouping: true,
      type: 'error',
    })
  }
}

const addWinnings = (amount: number) => {
  if (amount > 0) {
    const winSound = new Audio(win)
    winSound.play()
    walletStore.updateUserWalletBalance(amount)
    ElMessage({
      message: `You won ₱${amount}!`,
      grouping: true,
      type: 'success',
    })
  }
}

const refundBet = () => {
  const totalBet = Pog1BetDisplay.value + EqualizerBetDisplay.value + Pog2BetDisplay.value
  if (totalBet > 0) {
    walletStore.updateUserWalletBalance(totalBet)
    ElMessage({
      message: `It's a draw! Your total bet of ₱${totalBet} has been refunded.`,
      type: 'success',
    })
  }
}

const Pog1Bet = Pog1BetDisplay.value || 0
const EqualizerBet = EqualizerBetDisplay.value || 0
const Pog2Bet = Pog2BetDisplay.value || 0

const totalBet = Pog1Bet + EqualizerBet + Pog2Bet

if (totalBet > 0) {
  addWinnings(totalBet)
  winnerImage.value = draw
  showWinner.value = true
  result.value = ''
  textImageDisplay.value = 'none'
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

    walletStore.updateUserWalletBalance(lastBet.value)

    console.log('Bet History:', betHistory.value)
    ElMessage({
      message: `Bet of ₱${lastBet.value} has been undone and refunded!`,
      type: 'success',
    })
  } else {
    ElMessage({
      message: 'No bets to undo!',
      grouping: true,
      type: 'warning',
    })
  }
}

const clearBets = () => {
  const totalBet = Pog1BetDisplay.value + EqualizerBetDisplay.value + Pog2BetDisplay.value
  if (totalBet > 0) {
    Pog1BetDisplay.value = 0
    EqualizerBetDisplay.value = 0
    Pog2BetDisplay.value = 0
    betHistory.value = []

    walletStore.updateUserWalletBalance(totalBet)
    ElMessage({
      message: `Remove ₱${totalBet} bet in the table!`,
      type: 'success',
    })

    console.log('All bets . Wallet refunded:', totalBet)
  } else {
    ElMessage({
      message: 'No bets to undo!',
      type: 'warning',
    })
  }
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
      showHand.value = true
    }
  }, 1000)
}

const flipCoin = () => {
  closeBetDialog()
  showTimer.value = 'none'
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
        x: Math.random() * 100 - 50,
        y: Math.random() * 100 - 50,
        rotate: 1800,
        rotateY: pog1.value === 'Tails' ? 360 : 540,
      }
      animation2.value = {
        x: Math.random() * 100 - 50,
        y: Math.random() * 100 - 50,
        rotate: 1800,
        rotateY: equalizer.value === 'Tails' ? 360 : 540,
      }
      animation3.value = {
        x: Math.random() * 100 - 50,
        y: Math.random() * 100 - 50,
        rotate: 1800,
        rotateY: pog2.value === 'Tails' ? 360 : 540,
      }

      setTimeout(() => {
        if (pog1.value !== pog2.value && pog1.value !== equalizer.value) {
          addWinnings(Pog1BetDisplay.value * 2)
          winnerImage.value = heads1
          showWinner.value = true
          result.value = pog1Win
          textImageDisplay.value = 'flex'
        } else if (equalizer.value !== pog1.value && equalizer.value !== pog2.value) {
          addWinnings(EqualizerBetDisplay.value * 2)
          winnerImage.value = heads2
          showWinner.value = true
          result.value = equalizerWin
          textImageDisplay.value = 'flex'
        } else if (pog2.value !== pog1.value && pog2.value !== equalizer.value) {
          addWinnings(Pog2BetDisplay.value * 2)
          winnerImage.value = heads3
          showWinner.value = true
          result.value = pog2Win
          textImageDisplay.value = 'flex'
        } else {
          pog1.value === pog2.value && pog1.value === equalizer.value
          refundBet()
          winnerImage.value = draw
          showWinner.value = true
          result.value = ''
          textImageDisplay.value = 'none'
        }
        setTimeout(() => {
          showTimer.value = 'flex'
          showWinner.value = false
          currentHand.value = hand1
          animation1.value = { x: 0, y: 0, rotate: 0, rotateY: 0 }
          animation2.value = { x: 0, y: 0, rotate: 0, rotateY: 0 }
          animation3.value = { x: 0, y: 0, rotate: 0, rotateY: 0 }
          showHand.value = false

          resetBetDialog()
          startTimer()
        }, 2000)
      }, 2000)
    }, 2000)
  }, 1000)
}

onMounted(() => {
  startTimer()
})
</script>

<style scoped>
.wallet-balance {
  position: absolute;
  top: 10px;
  left: 10px;
  color: white;
  font-size: 20px;
  font-weight: bold;
}
</style>
