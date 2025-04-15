<template>
  <div
    style="
      width: 100%;
      background-color: transparent;
      height: 10vh;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: absolute;
    "
  >
    <el-row style="padding-left: 2%; padding-right: 2%; width: 100%">
      <el-col :span="8" style="display: flex; justify-content: start; align-items: center">
        <el-button @click="drawer = true" size="large" color="#A61F69" :icon="Menu" circle />
      </el-col>

      <el-col :span="8" style="display: flex; justify-content: center; align-items: center">
        <RouterLink to="/">
          <el-image :src="logo" fit="cover" style="height: 10vh; width: 130px" />
        </RouterLink>
      </el-col>

      <el-col :span="8" class="responsive-button">
        <el-text
          :style="{ fontFamily: 'regular', fontSize: '18px', color: 'white', cursor: 'pointer' }"
        >
          <RouterLink to="/" style="color: white">Home</RouterLink>
        </el-text>
        <el-text
          :style="{ fontFamily: 'regular', fontSize: '18px', color: 'white', cursor: 'pointer' }"
        >
          <RouterLink to="/arena" style="color: white">Play</RouterLink>
        </el-text>
        <el-text
          :style="{ fontFamily: 'regular', fontSize: '18px', color: 'white', cursor: 'pointer' }"
        >
          <RouterLink to="/arena" style="color: white">Shop</RouterLink>
        </el-text>
        <el-text
          @click="signInDialog = true"
          :style="{ fontFamily: 'regular', fontSize: '18px', color: 'white', cursor: 'pointer' }"
        >
          Login
        </el-text>
        <el-text
          @click="registerNavButton"
          :style="{ fontFamily: 'regular', fontSize: '18px', color: 'white', cursor: 'pointer' }"
        >
          Register
        </el-text>
      </el-col>

      <el-col :span="8" class="responsive-menu">
        <el-button
          @click="signInDialog = true"
          size="large"
          color="#A61F69"
          :style="{
            color: 'white',
            fontFamily: 'regular',
          }"
          round
        >
          Sign In
        </el-button>
      </el-col>
    </el-row>
  </div>

  <el-drawer
    v-model="drawer"
    direction="ltr"
    :with-header="false"
    :size="drawerSize"
    :style="{ backgroundColor: COLORS.dark }"
  >
    <el-button
      @click="drawer = false"
      :icon="Close"
      circle
      :style="{ backgroundColor: 'transparent', borderWidth: 0, color: 'white', fontSize: '1rem' }"
      style="position: absolute; z-index: 1"
    />

    <el-row style="display: flex; justify-content: center; align-items: center; margin-top: 30px">
      <el-image :src="logo" fit="cover" style="height: 140px; width: 180px; margin-top: -20px" />
    </el-row>

    <el-row
      style="
        display: flex;
        flex-direction: column;
        gap: 20px;
        justify-content: center;
        align-items: center;
        margin-top: 20px;
      "
    >
      <el-row style="display: flex; justify-content: center; align-items: center; cursor: pointer">
        <el-icon :style="{ fontSize: '20px', marginRight: '10px', color: 'white' }">
          <House />
        </el-icon>
        <el-text
          :style="{ fontFamily: 'regular', color: 'white', fontSize: '16px', marginTop: '2px' }"
        >
          Home
        </el-text>
      </el-row>

      <el-row style="display: flex; justify-content: center; align-items: center; cursor: pointer">
        <el-icon :style="{ fontSize: '20px', marginRight: '10px', color: 'white' }">
          <SwitchFilled />
        </el-icon>
        <el-text :style="{ fontFamily: 'regular', color: 'white', fontSize: '16px' }">
          Play
        </el-text>
      </el-row>

      <el-row style="display: flex; justify-content: center; align-items: center; cursor: pointer">
        <el-icon :style="{ fontSize: '20px', marginRight: '10px', color: 'white' }">
          <TakeawayBox />
        </el-icon>
        <el-text :style="{ fontFamily: 'regular', color: 'white', fontSize: '16px' }">
          Shop
        </el-text>
      </el-row>

      <el-row style="display: flex; justify-content: center; align-items: center; cursor: pointer">
        <el-icon :style="{ fontSize: '20px', marginRight: '10px', color: 'white' }">
          <CreditCard />
        </el-icon>
        <el-text :style="{ fontFamily: 'regular', color: 'white', fontSize: '16px' }">
          Deposit
        </el-text>
      </el-row>
    </el-row>
  </el-drawer>

  <el-dialog v-model="signInDialog" width="300" align-center>
    <div style="display: flex; align-items: center; justify-content: center">
      <el-image :src="logo" fit="cover" style="height: 100px; width: 190px" />
    </div>

    <el-row style="margin-top: 20px">
      <el-text :style="{ fontFamily: 'bold', color: 'black' }">Email</el-text>
      <el-col :span="24">
        <el-input
          :prefix-icon="Message"
          v-model="signInEmail"
          style="width: 100%"
          placeholder="Enter your email"
          input-style="font-family:regular"
        />
      </el-col>
    </el-row>

    <el-row style="margin-top: 5px">
      <el-text :style="{ fontFamily: 'bold', color: 'black' }" style="margin-top: 10px">
        Password
      </el-text>
      <el-col :span="24">
        <el-input
          :prefix-icon="Lock"
          v-model="signInPassword"
          style="width: 100%"
          placeholder="Enter your password"
          input-style="font-family:regular"
          type="password"
          show-password
        />
      </el-col>
    </el-row>

    <el-row style="margin-top: 30px">
      <el-button
        size="large"
        :style="{
          backgroundColor: COLORS.dark,
          fontFamily: 'semiBold',
          color: 'white',
          borderRadius: '10px',
        }"
        style="width: 100%"
      >
        Sign In
      </el-button>
    </el-row>

    <el-row :gutter="10" style="margin-top: 10px">
      <el-col :span="12">
        <el-button
          @click="registerDialogButton"
          width="100%"
          :style="{
            fontFamily: 'regular',
            color: 'white',
            fontSize: '12px',
            backgroundColor: COLORS.secondary,
            borderRadius: '10px',
          }"
          style="width: 100%"
        >
          Register
        </el-button>
      </el-col>

      <el-col :span="12">
        <el-button
          @click="resetPasswordDialogButton"
          width="100%"
          :style="{
            fontFamily: 'regular',
            color: 'white',
            fontSize: '12px',
            backgroundColor: COLORS.secondary,
            borderRadius: '10px',
          }"
          style="width: 100%"
        >
          Reset Password
        </el-button>
      </el-col>
    </el-row>
  </el-dialog>

  <el-dialog v-model="registerDialog" width="400" align-center>
    <div style="display: flex; align-items: center; justify-content: center">
      <el-image :src="logo" fit="cover" style="height: 100px; width: 190px" />
    </div>

    <el-row style="margin-top: 20px">
      <el-text :style="{ fontFamily: 'bold', color: 'black' }">Username</el-text>
      <el-col :span="24">
        <el-input
          :prefix-icon="User"
          v-model="username"
          style="width: 100%"
          placeholder="Enter your usename"
          input-style="font-family:regular"
        />
      </el-col>
    </el-row>

    <el-row style="margin-top: 20px">
      <el-text :style="{ fontFamily: 'bold', color: 'black' }">Email</el-text>
      <el-col :span="24">
        <el-input
          :prefix-icon="Message"
          v-model="email"
          style="width: 100%"
          placeholder="Enter your email"
          input-style="font-family:regular"
        />
      </el-col>
    </el-row>

    <el-row style="margin-top: 20px">
      <el-text :style="{ fontFamily: 'bold', color: 'black' }">Contact</el-text>
      <el-col :span="24">
        <el-input
          :prefix-icon="Phone"
          v-model="contact"
          style="width: 100%"
          placeholder="Enter your contact number"
          input-style="font-family:regular"
        />
      </el-col>
    </el-row>

    <el-row style="margin-top: 5px">
      <el-text :style="{ fontFamily: 'bold', color: 'black' }" style="margin-top: 10px">
        Password
      </el-text>
      <el-col :span="24">
        <el-input
          :prefix-icon="Unlock"
          v-model="password"
          style="width: 100%"
          placeholder="Enter your password"
          input-style="font-family:regular"
          type="password"
          show-password
        />
      </el-col>
    </el-row>

    <el-row style="margin-top: 5px">
      <el-text :style="{ fontFamily: 'bold', color: 'black' }" style="margin-top: 10px">
        Confirm Password
      </el-text>
      <el-col :span="24">
        <el-input
          :prefix-icon="Lock"
          v-model="confirmPassword"
          style="width: 100%"
          placeholder="Confirm your password"
          input-style="font-family:regular"
          type="password"
          show-password
        />
      </el-col>
    </el-row>

    <el-row style="margin-top: 30px">
      <el-button
        size="large"
        :style="{
          backgroundColor: COLORS.dark,
          fontFamily: 'semiBold',
          color: 'white',
          borderRadius: '5px',
        }"
        style="width: 100%"
      >
        Register
      </el-button>

      <div
        v-if="fromLogin"
        @click="backDialogButton"
        style="display: flex; gap: 10px; align-items: center; cursor: pointer"
      >
        <el-icon :style="{ fontSize: '16px', color: COLORS.dark, marginTop: '10px' }"
          ><Back
        /></el-icon>
        <el-text
          :style="{ fontFamily: 'regular', color: COLORS.dark, fontSize: '16px' }"
          style="margin-top: 10px"
        >
          Go back
        </el-text>
      </div>
    </el-row>
  </el-dialog>
</template>

<script setup lang="ts">
import logo from '@/assets/TeksPogRush-Logo-small.png'
import { COLORS } from '@/assets/theme'
import {
  Back,
  Close,
  Coin,
  CreditCard,
  HomeFilled,
  House,
  Lock,
  Menu,
  Message,
  Phone,
  Switch,
  SwitchFilled,
  TakeawayBox,
  Unlock,
  User,
} from '@element-plus/icons-vue'
import { onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const drawer = ref(false)

const fromLogin = ref(false)
const signInDialog = ref(false)
const registerDialog = ref(false)

const signInEmail = ref('')
const signInPassword = ref('')

const username = ref('')
const email = ref('')
const contact = ref('')
const password = ref('')
const confirmPassword = ref('')

const registerNavButton = () => {
  fromLogin.value = false
  registerDialog.value = true
}

const registerDialogButton = () => {
  signInDialog.value = false
  fromLogin.value = true
  registerDialog.value = true
}

const backDialogButton = () => {
  registerDialog.value = false
  signInDialog.value = true
}

const resetPasswordDialogButton = () => {
  signInDialog.value = false
  router.push('/forgot-password')
}

const drawerSize = ref('300px')

const updateDrawerSize = () => {
  const width = window.innerWidth
  if (width < 768) {
    drawerSize.value = '100%'
  } else if (width < 992) {
    drawerSize.value = '300px'
  } else if (width < 1200) {
    drawerSize.value = '300px'
  } else {
    drawerSize.value = '300px'
  }
}

onMounted(() => {
  updateDrawerSize()
  window.addEventListener('resize', updateDrawerSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateDrawerSize)
})
</script>

<style scoped>
.responsive-button {
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 40px;
}

.responsive-menu {
  display: none;
}

@media (max-width: 800px) {
  .responsive-button {
    display: none;
  }
  .responsive-menu {
    display: flex;
    align-items: center;
    justify-content: end;
  }
}
</style>
