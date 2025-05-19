<template>
  <el-dialog v-model="registerDialog" width="400" align-center @close="handleDialogClose">
    <div style="display: flex; align-items: center; justify-content: center">
      <el-image :src="logo" fit="cover" style="height: 100px; width: 190px" />
    </div>

    <el-form :model="ruleForm" ref="ruleFormRef" :rules="signUpRules" status-icon>
      <el-row>
        <el-text :style="{ fontFamily: 'bold', color: 'black' }">Username</el-text>
        <el-col :span="24">
          <el-form-item prop="username">
            <el-input
              v-model="ruleForm.username"
              :prefix-icon="User"
              placeholder="Enter your username"
              input-style="font-family:regular"
              @blur="cleanInputOnBlur('username')"
              @input="removeWhitespace('username')"
              minlength="8"
              maxlength="20"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-text :style="{ fontFamily: 'bold', color: 'black' }">Email</el-text>
        <el-col :span="24">
          <el-form-item prop="email">
            <el-input
              v-model="ruleForm.email"
              :prefix-icon="Message"
              placeholder="Enter your email"
              input-style="font-family:regular"
              @input="removeWhitespace('email')"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-text :style="{ fontFamily: 'bold', color: 'black' }">Contact</el-text>
        <el-col :span="24">
          <el-form-item prop="contact">
            <el-input
              v-model="ruleForm.contact"
              :prefix-icon="Phone"
              placeholder="Enter your contact number"
              input-style="font-family:regular"
              @input="removeWhitespace('contact')"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-text :style="{ fontFamily: 'bold', color: 'black' }">Password</el-text>
        <el-col :span="24">
          <el-form-item prop="password">
            <el-input
              v-model="ruleForm.password"
              :prefix-icon="Unlock"
              type="password"
              placeholder="Enter your password"
              input-style="font-family:regular"
              @input="removeWhitespace('password')"
              @blur="cleanInputOnBlur('password')"
              show-password
              maxlength="13"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-text :style="{ fontFamily: 'bold', color: 'black' }">Confirm Password</el-text>
        <el-col :span="24">
          <el-form-item prop="confirmPassword">
            <el-input
              v-model="ruleForm.confirmPassword"
              :prefix-icon="Lock"
              type="password"
              placeholder="Confirm your password"
              input-style="font-family:regular"
              @input="removeWhitespace('confirmPassword')"
              @blur="cleanInputOnBlur('confirmPassword')"
              show-password
              maxlength="13"
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
import type { userRegistrationStore } from '../models/types'

const registerDialog = ref(false)
const ruleFormRef = ref<FormInstance>()
const registrationStore = useRegistrationStore()

const emit = defineEmits(['backDialogButton', 'openSignInDialog'])

const props = defineProps<{
  fromLogin: boolean
}>()

const ruleForm = reactive(<userRegistrationStore>{
  id: '',
  username: '',
  email: '',
  contact: '',
  password: '',
  confirmPassword: '',
  wallet: '',
})

const validateUsername = (rule: any, value: any, callback: any) => {
  console.log('value', value)
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
    if (ruleForm.password !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('checkPass')
    }
    callback()
  }
}

const confirmPass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password again'))
  } else if (value !== ruleForm.password) {
    callback(new Error("Two inputs don't match!"))
  } else {
    callback()
  }
}

const signUpRules = reactive<FormRules<typeof ruleForm>>({
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
      registrationStore.registerUser(ruleForm)
      formEl.resetFields() //built in reset fields in fromEl
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

const handleDialogClose = () => {
  if (ruleFormRef.value) {
    ruleFormRef.value.resetFields()
  }
  // Reset the ruleForm properties to their initial values
  ruleFormRef.value?.resetFields()
  ruleForm.username = ''
  ruleForm.email = ''
  ruleForm.contact = ''
  ruleForm.password = ''
  ruleForm.confirmPassword = ''
}

// REMOVE EXCESS WHITESPACE FUNCTION FOR THE INPUT FIELDS
const removeWhitespace = (field: keyof typeof ruleForm) => {
  ruleForm[field] = ruleForm[field].replace(/\s{2,}/g, ' ')
}

const cleanInputOnBlur = (field: keyof typeof ruleForm) => {
  ruleForm[field] = ruleForm[field].trim()
}

const backDialogButton = () => {
  emit('backDialogButton')
}
</script>

<style scoped></style>
