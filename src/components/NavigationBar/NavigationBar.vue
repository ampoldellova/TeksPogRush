<template>
  <div class="responsive-navbar">
    <el-row style="width: 100%">
      <el-col :span="8" class="responsive-button-left">
        <el-text
          @click="router.push('/')"
          :style="{ fontFamily: 'regular', fontSize: '16px', color: 'white', cursor: 'pointer' }"
        >
          Home
        </el-text>
        <el-text
          @click="router.push('/play')"
          :style="{ fontFamily: 'regular', fontSize: '16px', color: 'white', cursor: 'pointer' }"
        >
          Play
        </el-text>
        <el-text
          @click="router.push('/Shop')"
          :style="{ fontFamily: 'regular', fontSize: '16px', color: 'white', cursor: 'pointer' }"
        >
          Shop
        </el-text>
      </el-col>

      <el-col :span="8" class="responsive-menu">
        <el-button @click="drawer = true" size="large" color="#A61F69" :icon="Menu" circle />
      </el-col>

      <el-col :span="8" style="display: flex; justify-content: center; align-items: center">
        <RouterLink to="/">
          <el-image :src="logo" fit="cover" style="height: 10vh; width: 130px" />
        </RouterLink>
      </el-col>

      <el-col :span="8" class="responsive-button-right">
        <el-text
          v-if="!authenticationStore.isAuthenticated"
          @click="signInDialog = true"
          :style="{ fontFamily: 'regular', fontSize: '16px', color: 'white', cursor: 'pointer' }"
        >
          Login
        </el-text>

        <el-text
          v-if="!authenticationStore.isAuthenticated"
          @click="openRegisterDialog"
          :style="{ fontFamily: 'regular', fontSize: '16px', color: 'white', cursor: 'pointer' }"
        >
          Register
        </el-text>

        <div
          v-if="authenticationStore.isAuthenticated"
          @click="openWalletDialog"
          :style="{
            backgroundColor: COLORS.dark,
            height: '30px',
            width: 'auto',
            borderRadius: '99px',
            borderWidth: '1px',
            borderColor: '#2a2c32',
            borderStyle: 'solid',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 10px',
            gap: '10px',
            cursor: 'pointer',
          }"
        >
          <el-image :src="currency" fit="cover" style="height: 20px; width: 20px" />
          <el-text :style="{ fontFamily: 'regular', color: 'white' }">
            {{ userWalletBalance }}
          </el-text>
        </div>

        <el-text
          v-if="authenticationStore.isAuthenticated"
          @click="authenticationStore.logout"
          :style="{ fontFamily: 'regular', fontSize: '16px', color: 'white', cursor: 'pointer' }"
        >
          Logout
        </el-text>
      </el-col>
    </el-row>
  </div>

  <Drawer v-model="drawer" @closeDrawer="closeDrawer" />

  <SignInDialog
    v-model="signInDialog"
    @registerDialogButton="registerDialogButton"
    @resetPasswordDialogButton="resetPasswordDialogButton"
    @closeSignInDialog="closeSignInDialog"
  />

  <RegisterDialog
    v-model="registerDialog"
    :fromLogin="fromLogin"
    @backDialogButton="backDialogButton"
    @openSignInDialog="openSignInDialog"
  />

  <WalletDialog v-model="walletDialog" />
</template>

<script setup lang="ts">
import currency from '@/assets/currency.png'
import logo from '@/assets/TeksPogRush-Logo-small.png'
import { Menu, Plus, Wallet } from '@element-plus/icons-vue'
import { onMounted, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthenticationStore } from '@/stores/userStore'
import { useRegistrationStore } from '@/stores/userStore'
import WalletDialog from './WalletDialog.vue'
import Drawer from './Drawer.vue'
import SignInDialog from './SignInDialog.vue'
import RegisterDialog from './RegisterDialog.vue'
import NavBarButton from './NavBarButton.vue'
import { COLORS } from '@/assets/theme'

const router = useRouter()
const drawer = ref(false)
const fromLogin = ref(false)
const signInDialog = ref(false)
const registerDialog = ref(false)
const authenticationStore = useAuthenticationStore()
const walletDialog = ref(false)
const registrationStore = useRegistrationStore() // Initialize the store

const openWalletDialog = () => {
  walletDialog.value = true
}

const userWalletBalance = computed(() => {
  const user = registrationStore.registeredUsers.find(
    (u) => u.email === authenticationStore.user?.email,
  )
  console.log('User:', user)
  return user ? `${user.wallet}` : '₱0.00'
})

const closeDrawer = () => {
  drawer.value = false
}

const openSignInDialog = () => {
  signInDialog.value = true
  registerDialog.value = false
}

const closeSignInDialog = () => {
  signInDialog.value = false
}

const openRegisterDialog = () => {
  registerDialog.value = true
  signInDialog.value = false
  fromLogin.value = false
}

const registerDialogButton = () => {
  signInDialog.value = false
  fromLogin.value = true
  registerDialog.value = true
}

const resetPasswordDialogButton = () => {
  signInDialog.value = false
  router.push('/forgot-password')
}

const backDialogButton = () => {
  registerDialog.value = false
  signInDialog.value = true
}

onMounted(() => {
  authenticationStore.checkLoginStatus()
})
</script>

<style scoped>
.responsive-navbar {
  width: 100%;
  background-color: transparent;
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  padding-left: 200px;
  padding-right: 200px;
}

.responsive-button-left {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 40px;
}

.responsive-button-left .el-text:hover {
  color: #ffd200 !important;
  font-weight: bold;
}

.responsive-button-right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 40px;
}

.responsive-button-right .el-text:hover {
  color: #ffd200 !important;
  font-weight: bold;
}

.responsive-menu {
  display: none;
}

@media (max-width: 1440px) {
  .responsive-navbar {
    padding-left: 100px;
    padding-right: 100px;
  }
}

@media (max-width: 1024px) {
  .responsive-navbar {
    padding-left: 100px;
    padding-right: 100px;
  }
}

@media (max-width: 980px) {
  .responsive-navbar {
    padding-left: 20px;
    padding-right: 20px;
  }

  .responsive-button-left {
    display: none;
  }

  .responsive-button-right {
    display: none;
  }

  .responsive-menu {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
}

@media (max-width: 480px) {
  .responsive-navbar {
    padding-left: 10px;
    padding-right: 10px;
  }
}
</style>
