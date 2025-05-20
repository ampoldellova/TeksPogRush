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
          <ArenaButton @buttonClick="arenaButtonClick" />
          <FriendlyButton @buttonClick="friendlyButtonClick" />
        </el-row>
      </div>
    </div>
  </div>

  <ConfirmationDialog
    v-model="confirmationDialog"
    @onClose="confirmationDialog = false"
    @onFriendlyButtonClick="friendlyButtonClick"
  />
</template>

<script setup lang="ts">
import backgrounds from '@/assets/Background.png'
import logo from '@/assets/TeksPogRush-Logo.png'
import { motion } from 'motion-v'
import clickSound from '@/assets/sounds/click.wav'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthenticationStore, useRegistrationStore } from '@/stores/userStore'
import { COLORS } from '@/assets/theme'
import ConfirmationDialog from '@/components/Play/ConfirmationDialog.vue'
import ArenaButton from '@/components/GameMode/ArenaButton.vue'
import FriendlyButton from '@/components/GameMode/FriendlyButton.vue'

const registrationStore = useRegistrationStore()
const authenticationStore = useAuthenticationStore()
const router = useRouter()

const gameMode = ref<'arena' | 'friendly'>()

const userWalletBalance = computed(() => {
  const user = registrationStore.registeredUsers.find(
    (u) => u.email === authenticationStore.user?.email,
  )
  return user ? user.wallet : 0
})

const arenaButtonClick = () => {
  gameMode.value = 'arena'
  localStorage.setItem('gameMode', 'arena')

  console.log('game mode: ', gameMode.value)
  console.log('arena mode activated')

  const audio = new Audio(clickSound)
  audio.play()

  if (userWalletBalance.value < 10) {
    confirmationDialog.value = true
  } else {
    router.push('/arena')
  }
}

const friendlyButtonClick = () => {
  gameMode.value = 'friendly'
  localStorage.setItem('gameMode', 'friendly')

  console.log('game mode: ', gameMode.value)
  console.log('friendly mode activated')

  const audio = new Audio(clickSound)
  audio.play()
  router.push('/friendly-arena')
}

const confirmationDialog = ref(false)
</script>

<style scoped></style>
