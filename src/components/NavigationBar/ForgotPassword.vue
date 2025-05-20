<template>
  <el-dialog v-model="forgotPassDialog" width="500" align-center @close="handleDialogClose">
    <div style="display: flex; align-items: center; justify-content: center">
      <el-image :src="logo" fit="cover" style="height: 100px; width: 190px" />
    </div>

    <el-form
      ref="ruleFormRef"
      style="max-width: 600px"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="auto"
      :style="{ border: '1px solid black', padding: '20px', borderRadius: '10px' }"
    >
      <el-row style="margin-top: 20px">
        <el-text :style="{ fontFamily: 'bold', color: 'black' }">Email</el-text>
        <el-col :span="24">
          <el-form-item prop="email" :style="{ margin: 0 }">
            <el-input
              v-model="ruleForm.email"
              style="width: 100%"
              placeholder="Enter your email"
              input-style="font-family:regular"
              type="email"
              @input="removeWhitespace('email')"
              @blur="cleanInputOnBlur('email')"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-text :style="{ fontFamily: 'bold', color: 'black' }" style="margin-top: 10px">
          New Password
        </el-text>
        <el-col :span="24">
          <el-form-item prop="pass" :style="{ margin: 0 }">
            <el-input
              v-model="ruleForm.password"
              style="width: 100%"
              placeholder="Enter your new password"
              input-style="font-family:regular"
              type="password"
              maxlength="13"
              @input="removeWhitespace('password')"
              @blur="cleanInputOnBlur('password')"
              show-password
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-text :style="{ fontFamily: 'bold', color: 'black' }" style="margin-top: 10px">
          Confirm Password
        </el-text>
        <el-col :span="24">
          <el-form-item prop="confirmPassword" :style="{ margin: 0 }">
            <el-input
              v-model="ruleForm.confirmPassword"
              style="width: 100%"
              placeholder="Confirm Password"
              input-style="font-family:regular"
              type="password"
              @input="removeWhitespace('confirmPassword')"
              @blur="cleanInputOnBlur('confirmPassword')"
              show-password
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row style="margin-top: 30px">
        <el-button
          @click="submitForm(ruleFormRef)"
          size="large"
          :style="{
            backgroundColor: '#141414',
            fontFamily: 'semiBold',
            color: 'white',
            borderRadius: '10px',
          }"
          style="width: 100%"
        >
          Reset Password
        </el-button>
      </el-row>

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

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import logo from '@/assets/TeksPogRush-Logo-small.png'
import { Back } from '@element-plus/icons-vue'
import { COLORS } from '@/assets/theme'

const ruleFormRef = ref<FormInstance>()

const forgotPassDialog = ref(false)

const props = defineProps({
  fromLogin: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['forgotPassDialogButton', 'backDialogButton'])

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password'))
  } else {
    if (ruleForm.password !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('confirmPassword')
    }
    callback()
  }
}
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password again'))
  } else if (value !== ruleForm.password) {
    callback(new Error("Two inputs don't match!"))
  } else {
    callback()
  }
}

const ruleForm = reactive({
  email: '',
  password: '',
  confirmPassword: '',
})

const rules = reactive<FormRules<typeof ruleForm>>({
  email: [
    { required: true, message: 'Please input your email', trigger: 'blur' },
    {
      type: 'email',
      message: 'There is no account registered to this Email',
      trigger: ['blur', 'change'],
    },
  ],
  password: [{ validator: validatePass, trigger: 'blur' }],
  confirmPassword: [{ validator: validatePass2, trigger: 'blur' }],
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!')
    }
  })
}

const handleDialogClose = () => {
  if (ruleFormRef.value) {
    ruleFormRef.value.resetFields()
  }
  ruleForm.email = ''
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
