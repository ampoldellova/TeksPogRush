<template>
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
        v-if="props.fromLogin"
        @click="backDialogButton"
        style="display: flex; gap: 10px; align-items: center; cursor: pointer"
      >
        <el-icon :style="{ fontSize: '16px', color: COLORS.dark, marginTop: '10px' }">
          <Back />
        </el-icon>
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
import { useRegistrationStore } from '@/stores/userStore'
import { Back, Lock, Message, Phone, Unlock, User } from '@element-plus/icons-vue'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { reactive, ref } from 'vue'

const registerDialog = ref(false)
const ruleFormRef = ref<FormInstance>()
const registrationStore = useRegistrationStore()

const emit = defineEmits(['backDialogButton', 'openSignInDialog'])

const props = defineProps<{
  fromLogin: boolean
}>()

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
      registrationStore.registerUser(formEl)
      emit('openSignInDialog')
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
  emit('backDialogButton')
}
</script>

<style scoped></style>
