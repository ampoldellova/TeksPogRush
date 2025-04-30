<template>
  <el-dialog v-model="signInDialog" width="300" align-center>
    <div style="display: flex; align-items: center; justify-content: center">
      <el-image :src="logo" fit="cover" style="height: 100px; width: 190px" />
    </div>

    <el-form :model="SignInRuleForm" ref="ruleFormRef" :rules="loginRules" status-icon>
      <el-row style="margin-top: 20px">
        <el-text :style="{ fontFamily: 'bold', color: 'black' }">Email</el-text>
        <el-col :span="24">
          <el-form-item prop="signInEmail" :style="{ margin: 0 }">
            <el-input
              :prefix-icon="Message"
              v-model="SignInRuleForm.signInEmail"
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
              v-model="SignInRuleForm.signInPassword"
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
</template>

<script setup lang="ts">
import logo from '@/assets/TeksPogRush-Logo-small.png'
import { COLORS } from '@/assets/theme'
import { useAuthenticationStore } from '@/stores/userStore'
import { Lock, Message } from '@element-plus/icons-vue'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { reactive, ref } from 'vue'

const signInDialog = ref(false)
const authenticationStore = useAuthenticationStore()
const ruleFormRef = ref<FormInstance>()
const emit = defineEmits([
  'registerDialogButton',
  'resetPasswordDialogButton',
  'closeSignInDialog',
  'closeDrawer',
])

const SignInRuleForm = reactive({
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

const loginRules = reactive<FormRules<typeof SignInRuleForm>>({
  signInEmail: [{ validator: validateSignInEmail, trigger: 'change' }],
  signInPassword: [{ validator: validateSignInPassword, trigger: 'change' }],
})

const loginForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      const { success, message } = authenticationStore.login(
        SignInRuleForm.signInEmail,
        SignInRuleForm.signInPassword,
      )
      if (success) {
        ElMessage({
          message,
          grouping: true,
          type: 'success',
        })
        emit('closeSignInDialog')
        emit('closeDrawer')
        SignInRuleForm.signInEmail = ''
        SignInRuleForm.signInPassword = ''
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

const registerDialogButton = () => {
  emit('registerDialogButton')
}

const resetPasswordDialogButton = () => {
  emit('resetPasswordDialogButton')
}
</script>

<style scoped></style>
