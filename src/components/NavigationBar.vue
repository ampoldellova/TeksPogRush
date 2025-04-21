<template>
  <div class="responsive-navbar">
    <el-row style="width: 100%">
      <el-col :span="8" class="responsive-button-left">
        <NavBarButton label="Home" to="/" />
        <NavBarButton label="Play" to="/play" />
        <NavBarButton label="Shop" to="/shop" />
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

    <el-form :model="ruleForm" ref="ruleFormRef" :rules="loginRules" status-icon>
      <el-row style="margin-top: 20px">
        <el-text :style="{ fontFamily: 'bold', color: 'black' }">Email</el-text>
        <el-col :span="24">
          <el-form-item prop="signInEmail" :style="{ margin: 0 }">
            <el-input
              :prefix-icon="Message"
              v-model="ruleForm.signInEmail"
              style="width: 100%"
              placeholder="Enter your email"
              input-style="font-family:regular"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-text :style="{ fontFamily: 'bold', color: 'black' }" style="margin-top: 10px">
          Password
        </el-text>
        <el-col :span="24">
          <el-form-item prop="signInPassword" :style="{ margin: 0 }">
            <el-input
              :prefix-icon="Lock"
              v-model="ruleForm.signInPassword"
              style="width: 100%"
              placeholder="Enter your password"
              input-style="font-family:regular"
              type="password"
              show-password
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row style="margin-top: 30px">
        <el-button
          @click="loginForm(ruleFormRef)"
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
    </el-form>

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

    <el-form :model="registrationStore.ruleForm" ref="ruleFormRef" :rules="signUpRules" status-icon>
      <el-row>
        <el-text :style="{ fontFamily: 'bold', color: 'black' }">Username</el-text>
        <el-col :span="24">
          <el-form-item prop="username">
            <el-input
              v-model="registrationStore.ruleForm.username"
              :prefix-icon="User"
              placeholder="Enter your username"
              input-style="font-family:regular"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-text :style="{ fontFamily: 'bold', color: 'black' }">Email</el-text>
        <el-col :span="24">
          <el-form-item prop="email">
            <el-input
              v-model="registrationStore.ruleForm.email"
              :prefix-icon="Message"
              placeholder="Enter your email"
              input-style="font-family:regular"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-text :style="{ fontFamily: 'bold', color: 'black' }">Contact</el-text>
        <el-col :span="24">
          <el-form-item prop="contact">
            <el-input
              v-model="registrationStore.ruleForm.contact"
              :prefix-icon="Phone"
              placeholder="Enter your contact number"
              input-style="font-family:regular"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-text :style="{ fontFamily: 'bold', color: 'black' }">Password</el-text>
        <el-col :span="24">
          <el-form-item prop="password">
            <el-input
              v-model="registrationStore.ruleForm.password"
              :prefix-icon="Unlock"
              type="password"
              placeholder="Enter your password"
              input-style="font-family:regular"
              show-password
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-text :style="{ fontFamily: 'bold', color: 'black' }">Confirm Password</el-text>
        <el-col :span="24">
          <el-form-item prop="confirmPassword">
            <el-input
              v-model="registrationStore.ruleForm.confirmPassword"
              :prefix-icon="Lock"
              type="password"
              placeholder="Confirm your password"
              input-style="font-family:regular"
              show-password
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-button
        @click="submitForm(ruleFormRef)"
        size="large"
        :style="{
          backgroundColor: COLORS.dark,
          fontFamily: 'semiBold',
          color: 'white',
          borderRadius: '5px',
        }"
        style="width: 100%; margin-top: 20px"
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
    </el-form>
  </el-dialog>
</template>

<script setup lang="ts">
import logo from '@/assets/TeksPogRush-Logo-small.png'
import { COLORS } from '@/assets/theme'
import {
  Back,
  Close,
  CreditCard,
  House,
  Lock,
  Menu,
  Message,
  Phone,
  SwitchFilled,
  TakeawayBox,
  Unlock,
  User,
} from '@element-plus/icons-vue'
import { onMounted, onUnmounted, ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import NavBarButton from './NavBarButton.vue'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { useAuthenticationStore, useRegistrationStore } from '@/stores/userStore'
import { ru } from 'element-plus/es/locales.mjs'

const router = useRouter()
const drawer = ref(false)
const fromLogin = ref(false)
const signInDialog = ref(false)
const registerDialog = ref(false)

const ruleFormRef = ref<FormInstance>()
const authenticationStore = useAuthenticationStore()
const registrationStore = useRegistrationStore()

const ruleForm = reactive({
  signInEmail: '',
  signInPassword: '',
})

const validateSignInEmail = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input your email'))
  } else {
    callback()
  }
}

const validateSignInPassword = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input your password'))
  } else {
    callback()
  }
}

const validateUsername = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the username'))
  } else if (value.length < 8) {
    callback(new Error('Username must be at least 8 characters long'))
  } else {
    callback()
  }
}

const validateEmail = (rule: any, value: any, callback: any) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (value === '') {
    callback(new Error('Please input the email'))
  } else if (!emailRegex.test(value)) {
    callback(new Error('Please input a valid email address'))
  } else {
    callback()
  }
}

const validateContact = (rule: any, value: any, callback: any) => {
  const contactRegex = /^(09|\+639)\d{9}$/
  if (value === '') {
    callback(new Error('Please input the contact number'))
  } else if (!contactRegex.test(value)) {
    callback(new Error('Please input a valid Philippine contact number'))
  } else {
    callback()
  }
}

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password'))
  } else {
    if (registrationStore.ruleForm.password !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('checkPass')
    }
    callback()
  }
}

const confirmPass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password again'))
  } else if (value !== registrationStore.ruleForm.password) {
    callback(new Error("Two inputs don't match!"))
  } else {
    callback()
  }
}

const loginRules = reactive<FormRules<typeof ruleForm>>({
  signInEmail: [{ validator: validateSignInEmail, trigger: 'change' }],
  signInPassword: [{ validator: validateSignInPassword, trigger: 'change' }],
})

const signUpRules = reactive<FormRules<typeof registrationStore.ruleForm>>({
  username: [{ validator: validateUsername, trigger: 'change' }],
  email: [{ validator: validateEmail, trigger: 'change' }],
  contact: [{ validator: validateContact, trigger: 'change' }],
  password: [{ validator: validatePass, trigger: 'change' }],
  confirmPassword: [{ validator: confirmPass, trigger: 'change' }],
})

const loginForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      const { success, message } = authenticationStore.login(
        ruleForm.signInEmail,
        ruleForm.signInPassword,
      )
      if (success) {
        ElMessage({
          message,
          grouping: true,
          type: 'success',
        })
        signInDialog.value = false
        ruleForm.signInEmail = ''
        ruleForm.signInPassword = ''
        formEl.resetFields()
      } else {
        ElMessage({
          message,
          grouping: true,
          type: 'error',
        })
      }
    } else {
      ElMessage({
        message: 'Error during form submission!',
        grouping: true,
        type: 'error',
      })
    }
  })
}

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      registrationStore.registerUser(formEl)
      registerDialog.value = false
      signInDialog.value = true
      fromLogin.value = true
    } else {
      ElMessage({
        message: 'Error during form submission!',
        grouping: true,
        type: 'error',
      })
    }
  })
}

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
  authenticationStore.checkLoginStatus()
  updateDrawerSize()
  window.addEventListener('resize', updateDrawerSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateDrawerSize)
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
