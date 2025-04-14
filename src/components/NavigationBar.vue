<template>
  <div
    style="
      width: 100%;
      background-color: #400e32;
      height: 10vh;
      display: flex;
      align-items: center;
      justify-content: space-between;
    "
  >
    <el-row style="padding-left: 2%; padding-right: 2%; width: 100%">
      <el-col :span="8" style="display: flex; justify-content: start; align-items: center">
        <el-button @click="drawer = true" size="large" color="#A61F69" :icon="Menu" circle />
      </el-col>

      <el-col :span="8" style="display: flex; justify-content: center; align-items: center">
        <RouterLink to="/">
          <el-image :src="logo" fit="cover" style="height: 10vh; width: 150px" />
        </RouterLink>
      </el-col>

      <el-col :span="8" class="responsive-button">
        <el-tooltip class="box-item" effect="dark" content="Shop" placement="bottom">
          <el-text
            :style="{ color: COLORS.quarternary, fontFamily: 'regular', cursor: 'pointer' }"
            style="margin-right: 30px"
          >
            Tindahan
          </el-text>
        </el-tooltip>

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

        <el-button
          @click="registerDialog = true"
          size="large"
          color="#A61F69"
          :style="{
            color: 'white',
            fontFamily: 'regular',
          }"
          round
        >
          Register
        </el-button>
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

  <el-drawer v-model="drawer" direction="ltr" :with-header="false" :size="drawerSize">
    <el-button
      @click="drawer = false"
      color="#A61F69"
      :icon="Close"
      circle
      style="position: absolute; z-index: 1"
    />
    <el-row style="display: flex; justify-content: center; align-items: center">
      <el-image :src="logo" fit="cover" style="height: 140px; width: 250px" />
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
          v-model="signInPassword"
          style="width: 100%"
          placeholder="Enter your password"
          input-style="font-family:regular"
          type="password"
          show-password
        />
      </el-col>
    </el-row>

    <el-row style="margin-top: 20px">
      <el-button
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
          v-model="confirmPassword"
          style="width: 100%"
          placeholder="Confirm your password"
          input-style="font-family:regular"
          type="password"
          show-password
        />
      </el-col>
    </el-row>

    <el-row style="margin-top: 20px">
      <el-button
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
    </el-row>
  </el-dialog>
</template>

<script setup lang="ts">
import logo from '@/assets/TeksPogRush-Logo-small.png'
import { COLORS } from '@/assets/theme'
import { Close, Menu } from '@element-plus/icons-vue'
import { onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const drawer = ref(false)

const signInDialog = ref(false)
const registerDialog = ref(false)

const signInEmail = ref('')
const signInPassword = ref('')

const username = ref('')
const email = ref('')
const contact = ref('')
const password = ref('')
const confirmPassword = ref('')

const registerDialogButton = () => {
  signInDialog.value = false
  registerDialog.value = true
}

const resetPasswordDialogButton = () => {
  signInDialog.value = false
  router.push('/forgot-password')
}

const drawerSize = ref('30%')

const updateDrawerSize = () => {
  const width = window.innerWidth
  if (width < 768) {
    drawerSize.value = '100%'
  } else if (width < 992) {
    drawerSize.value = '50%'
  } else if (width < 1200) {
    drawerSize.value = '40%'
  } else {
    drawerSize.value = '30%'
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
