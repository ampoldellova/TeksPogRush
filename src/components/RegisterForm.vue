<template>
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
</template>

<script setup lang="ts">
import { COLORS } from '@/assets/theme'
import {
  Back,
  Lock,
  Menu,
  Message,
  Phone,
  Unlock,
  User,
} from '@element-plus/icons-vue'
import { onMounted, onUnmounted, ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
// import { useAuthenticationStore, useRegistrationStore } from '@/stores/userStore'
import { userRegistration } from '@/stores/userStore'


const router = useRouter()
const fromLogin = ref(false)
const signInDialog = ref(false)
const registerDialog = ref(false)

const ruleFormRef = ref<FormInstance>()
// const authenticationStore = useAuthenticationStore()
const registrationStore = userRegistration()


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


const signUpRules = reactive<FormRules<typeof registrationStore.ruleForm>>({
  username: [{ validator: validateUsername, trigger: 'change' }],
  email: [{ validator: validateEmail, trigger: 'change' }],
  contact: [{ validator: validateContact, trigger: 'change' }],
  password: [{ validator: validatePass, trigger: 'change' }],
  confirmPassword: [{ validator: confirmPass, trigger: 'change' }],
})


const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      registrationStore.AddUser()
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


const backDialogButton = () => {
  registerDialog.value = false
  signInDialog.value = true
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
  // authenticationStore.checkLoginStatus()
  updateDrawerSize()
  window.addEventListener('resize', updateDrawerSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateDrawerSize)
})
</script>
