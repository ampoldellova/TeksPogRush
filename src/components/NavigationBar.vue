<template>
  <div class="responsive-navbar">
    <el-row style="width: 100%">
      <el-col :span="8" class="responsive-button-left">
        <NavBarButton label="Home" to="/" />
        <NavBarButton label="Play" to="/play" />
        <NavBarButton label="Shop" to="/shop" />
      </el-col>

      <el-col :span="8" class="responsive-menu">
        <el-button @click="openDrawer" size="large" color="#A61F69" :icon="Menu" circle />
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
          :style="{ fontFamily: 'regular', fontSize: '14px', color: 'white', cursor: 'pointer' }"
        >
          Login
        </el-text>

        <el-text
          v-if="!authenticationStore.isAuthenticated"
          @click="registerDialog = true"
          :style="{ fontFamily: 'regular', fontSize: '14px', color: 'white', cursor: 'pointer' }"
        >
          Register
        </el-text>

        <el-text
          v-if="authenticationStore.isAuthenticated"
          @click="authenticationStore.logout"
          :style="{ fontFamily: 'regular', fontSize: '14px', color: 'white', cursor: 'pointer' }"
        >
          Logout
        </el-text>

        <el-text
          v-if="authenticationStore.isAuthenticated"
          @click="cashInDialog = true"
          :style="{ fontFamily: 'regular', fontSize: '14px', color: 'white', cursor: 'pointer' }"
        >
          Cash In
        </el-text>

        <el-text
          v-if="authenticationStore.isAuthenticated"
          :style="{ fontFamily: 'regular', fontSize: '14px', color: 'white', cursor: 'pointer' }"
        >
          Cash Out
        </el-text>
        
        
      </el-col>
    </el-row>
  </div>

  <NavBarDrawer :isOpen="isDrawerOpen" @closeDrawer="handleCloseDrawer"/>

  
  <el-dialog v-model="cashInDialog" width="600" align-center style="border-radius: 28px;">
    <div style="display: flex; align-items: center; justify-content: center; ">
      <!-- <el-image :src="logo" fit="cover" style="height: 100px; width: 190px" /> -->
    </div>
  <CashInForm/>
  </el-dialog>

  <el-dialog v-model="signInDialog" width="300" align-center>
    <div style="display: flex; align-items: center; justify-content: center">
      <el-image :src="logo" fit="cover" style="height: 100px; width: 190px" />
    </div>
  <SignInForm/>
  </el-dialog>

  <el-dialog v-model="registerDialog" width="400" align-center>
    <div style="display: flex; align-items: center; justify-content: center">
      <el-image :src="logo" fit="cover" style="height: 100px; width: 190px" />
    </div>
    <RegisterForm/>
  </el-dialog>
</template>

<script setup lang="ts">
import logo from '@/assets/TeksPogRush-Logo-small.png'
import { COLORS } from '@/assets/theme'
import {Menu,} from '@element-plus/icons-vue'
import {ref} from 'vue'
import { useRouter } from 'vue-router'
import NavBarButton from './NavBarButton.vue'
import { useAuthenticationStore, useRegistrationStore } from '@/stores/userStore'
import NavBarDrawer from './NavBarDrawer.vue'
import SignInForm from './SignInForm.vue'
import RegisterForm from './RegisterForm.vue'
import CashInForm from './CashInForm.vue'

const router = useRouter()
const signInDialog = ref(false)
const registerDialog = ref(false)
const cashInDialog = ref(false)

const authenticationStore = useAuthenticationStore()
const isDrawerOpen = ref(false)


const openDrawer = () => {
  isDrawerOpen.value = true
}

const handleCloseDrawer = () =>{
  isDrawerOpen.value = false
  console.log(isDrawerOpen.value)
}

console.log(isDrawerOpen.value)

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

.responsive-button-right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 40px;
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
