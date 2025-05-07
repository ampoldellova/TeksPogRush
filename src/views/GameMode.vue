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
            <el-popover
              class="box-item"
              title="Battle Arena"
              content="Battle Arena is a game mode where you can compete for chips. It's a great way to test your skills and earn rewards!"
              placement="top"
              width="300"
            >
              <template #reference>
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
              </template>
            </el-popover>
          </el-col>

          <el-col
            :xs="24"
            :sm="24"
            :md="12"
            :lg="12"
            :xl="12"
            style="display: flex; justify-content: center; align-items: center"
          >
            <el-popover
              class="box-item"
              title="Friendly Arena"
              content="Friendly Arena is a fun and casual game mode where you can play without the pressure of losing chips. It's a great way to practice and enjoy the game!"
              placement="top"
              width="300"
            >
              <template #reference>
                <motion.button
                  @click="friendlyButtonClick"
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
              </template>
            </el-popover>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>

  <el-dialog v-model="confirmationDialog" title="Warning" width="400" align-center>
    <template #header>
      <el-text :style="{ fontFamily: 'bold', color: COLORS.dark }">Oops!</el-text>
    </template>

    <el-result
      icon="warning"
      title="Warning Tip"
      sub-title="It seems you don't have enough chips to enter the arena, you can buy chips from the shop or
      would you like to try friendly arena instead?"
    >
      <template #extra>
        <el-button type="primary">Back</el-button>
        <el-button @click="friendlyButtonClick" type="primary">Friendly Arena</el-button>
      </template>
    </el-result>
  </el-dialog>
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

const buttonClick = () => {
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
