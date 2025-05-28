<template>
  <div
    :style="{
      backgroundImage: `url(${backgrounds})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh',
      width: '100%',
    }"
  >
    <div
      :style="{
        background: 'linear-gradient(to bottom, black, transparent)',
        height: '100vh',
        width: '100%',
      }"
    >
      <div
        style="
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          width: 100%;
          flex-direction: column;
        "
      >
        <el-row>
          <el-col :span="24">
            <el-form ref="withdrawRef" class="withdrawContainer">
              <div
                :style="{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  marginTop: '10px',
                  gap: '10px',
                  marginBottom: '10px',
                }"
              >
                <div
                  v-for="payment in paymentMethods"
                  :style="{
                    borderWidth: '1px',
                    borderColor: paymentSelected === payment.name ? COLORS.dark : COLORS.gray2,
                    borderStyle: 'solid',
                    borderRadius: '10px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '2px 10px',
                  }"
                >
                  <el-image
                    @click="selectPaymentOption(payment.name)"
                    :src="payment.image"
                    fit="contain"
                    :style="{ width: '50px', height: '50px', cursor: 'pointer' }"
                  />
                </div>
              </div>

              <el-divider :style="{ margin: 0, marginBottom: '10px' }" />
              <div v-if="paymentSelected === 'GCash'">
                <el-text :style="{ fontFamily: 'regular', fontSize: '12px', color: COLORS.dark }">
                  Login to withdraw with GCash
                </el-text>

                <el-form
                  ref="ruleFormRef"
                  :model="gCashRuleForm"
                  :rules="gCashRules"
                  style="margin-top: 10px"
                >
                  <el-text :style="{ fontFamily: 'regular', fontSize: '10px', color: COLORS.dark }">
                    * Mobile Number
                  </el-text>
                  <el-form-item prop="mobileNumber" :style="{ width: '100%' }">
                    <el-input
                      v-model="gCashRuleForm.mobileNumber"
                      placeholder="Enter mobile number"
                      input-style="font-family:regular; font-size:12px"
                    />
                  </el-form-item>
                  <el-button
                    @click="submitGcashDetails(ruleFormRef)"
                    :style="{
                      width: '100%',
                      background: 'linear-gradient(to right, #f2cd5c, #f2921d',
                      borderWidth: 0,
                      fontFamily: 'semiBold',
                      color: 'white',
                      borderRadius: '10px',
                      marginTop: '10px',
                    }"
                  >
                    CONFIRM
                  </el-button>
                </el-form>
                <el-button
                  @click="cancelButton"
                  :style="{
                    width: '100%',
                    background: 'linear-gradient(to right, #f2cd5c, #f2921d',
                    borderWidth: 0,
                    fontFamily: 'semiBold',
                    color: 'white',
                    borderRadius: '10px',
                    marginTop: '10px',
                  }"
                >
                  CANCEL
                </el-button>
              </div>

              <div v-if="paymentSelected === 'Credit Card'">
                <el-row>
                  <el-col :span="24">
                    <el-text
                      :style="{ fontFamily: 'regular', fontSize: '12px', color: COLORS.dark }"
                    >
                      Enter your credit card details, make sure to double check your card details
                      before proceeding.
                    </el-text>
                  </el-col>
                </el-row>

                <el-form
                  ref="ruleFormRef"
                  :model="creditCardRuleForm"
                  :rules="cardDetailsRules"
                  style="background-color: white"
                >
                  <el-col>
                    <el-row style="margin-top: 10px">
                      <el-col :span="24">
                        <el-text
                          :style="{ fontFamily: 'regular', fontSize: '10px', color: COLORS.dark }"
                        >
                          * Card Number
                        </el-text>
                        <el-form-item prop="cardNumber">
                          <el-input
                            v-model="creditCardRuleForm.cardNumber"
                            placeholder="Enter card number"
                            type="number"
                            input-style="font-family:regular; font-size:12px"
                            @input="limitCardNumberLength"
                          />
                        </el-form-item>
                      </el-col>
                    </el-row>

                    <el-row :gutter="10">
                      <el-col :span="12">
                        <el-text
                          :style="{ fontFamily: 'regular', fontSize: '10px', color: COLORS.dark }"
                        >
                          * Expiration Date
                        </el-text>

                        <el-form-item prop="expiryDate">
                          <el-input
                            v-model="creditCardRuleForm.expiryDate"
                            placeholder="MM/YY"
                            maxlength="5"
                            @input="formatExpiryDate"
                            input-style="font-family:regular; font-size:12px"
                          />
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-text
                          :style="{ fontFamily: 'regular', fontSize: '10px', color: COLORS.dark }"
                        >
                          * Security Code
                        </el-text>
                        <el-form-item prop="securityCode">
                          <el-input
                            v-model="creditCardRuleForm.securityCode"
                            @input="filterDigits"
                            :type="'password'"
                            :show-password="true"
                            placeholder="Enter security code"
                            input-style="font-family:regular; font-size:12px"
                          />
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-row>
                    <el-col :span="24">
                      <el-button
                        @click="submitCardDetails(ruleFormRef)"
                        :style="{
                          width: '100%',
                          background: 'linear-gradient(to right, #f2cd5c, #f2921d',
                          borderWidth: 0,
                          fontFamily: 'semiBold',
                          color: 'white',
                          borderRadius: '10px',
                          marginTop: '10px',
                        }"
                      >
                        CONFIRM
                      </el-button>
                    </el-col>
                    <el-button
                      @click="cancelButton"
                      :style="{
                        width: '100%',
                        background: 'linear-gradient(to right, #f2cd5c, #f2921d',
                        borderWidth: 0,
                        fontFamily: 'semiBold',
                        color: 'white',
                        borderRadius: '10px',
                        marginTop: '10px',
                      }"
                    >
                      CANCEL
                    </el-button>
                  </el-row>
                </el-form>
              </div>

              <WithdrawAmountDialog
                v-model="withdrawAmountDialog"
                :payment-method="getPaymentMethod()"
                @closeDialog="withdrawAmountDialog = false"
              />
            </el-form>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import backgrounds from '@/assets/Background.png'
import { COLORS } from '@/assets/theme'
// import gcash from '@/assets/shop/gcash.png'
// import creditCard from '@/assets/shop/creditCard.png'
import { reactive, ref } from 'vue'
import WithdrawAmountDialog from './WithdrawAmountDialog.vue'
import { ElMessage, ElMessageBox, type FormInstance, type FormRules } from 'element-plus'
import { paymentMethods } from '../models/constants'
import { useRouter } from 'vue-router'
import type { CardTransaction } from '../models/types'

const ruleFormRef = ref<FormInstance>()
const walletDialog = ref(false)
const withdrawAmountDialog = ref(false)
const paymentSelected = ref('GCash')
const router = useRouter()
const cancelButton = async () => {
  try {
    await ElMessageBox.confirm('You are exiting the withdraw page', {
      distinguishCancelAndClose: true,
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
    })
    router.push('/')
  } catch {
    ElMessage({
      message: 'You are still in the withdraw page',
    })
  }
}

// const paymentMethods = ref([
//   {
//     id: '001',
//     name: 'GCash',
//     image: gcash,
//   },
//   {
//     id: '002',
//     name: 'Credit Card',
//     image: creditCard,
//   },
// ])

function limitCardNumberLength() {
  creditCardRuleForm.cardNumber = creditCardRuleForm.cardNumber?.slice(0, 19)
}

const emit = defineEmits(['closeDialog'])

const selectPaymentOption = (payment: string) => {
  paymentSelected.value = payment
  resetForm(ruleFormRef.value)
}

const getPaymentMethod = (): 'GCash' | 'Card' => {
  if (paymentSelected.value === 'GCash') return 'GCash'
  if (paymentSelected.value === 'Card') return 'Card'
  return 'GCash'
}

const validatePhoneNumber = (rule: any, value: any, callback: any) => {
  const phoneRegex = /^09\d{9}$/
  if (value === '') {
    callback(new Error('Please input your mobile number'))
  } else if (!phoneRegex.test(value)) {
    callback(new Error('Please enter a valid Philippine mobile number'))
  } else {
    callback()
  }
}

const validateCardNumber = (rule: any, value: any, callback: any) => {
  const cardNumberRegex = /^\d+$/

  if (value === '') {
    callback(new Error('Please input card number'))
  } else if (value.length > 19) {
    callback(new Error('Invalid Card Number'))
  } else if (!cardNumberRegex.test(value)) {
    callback(new Error('Invalid Card Number'))
  }
  callback()
}

const validateExpiryDate = (rule: any, value: string, callback: (error?: Error) => void) => {
  const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/
  const currentDate = new Date()

  if (!value || value === '/' || value.trim() === '') {
    callback(new Error('Please input expiry date'))
  } else if (!expiryRegex.test(value)) {
    callback(new Error('Invalid Expiry Date'))
  } else {
    const [month, year] = value.split('/')
    const expiryMonth = parseInt(month, 10)
    const expiryYear = parseInt(year, 10)

    const fullExpiryYear = 2000 + expiryYear
    const expiryDate = new Date(fullExpiryYear, expiryMonth, 0)

    const now = new Date()
    now.setHours(0, 0, 0, 0)

    if (expiryDate < now) {
      callback(new Error('This Card is Expired'))
    } else {
      callback()
    }
  }
}

function formatExpiryDate() {
  let val = creditCardRuleForm.expiryDate

  val = val.replace(/[^0-9\/]/g, '')

  val = val.replace(/\//g, '')

  if (val.length === 0) {
    val = '/'
  } else if (val.length <= 2) {
    val = val + '/'
  } else {
    val = val.slice(0, 2) + '/' + val.slice(2, 4)
  }

  creditCardRuleForm.expiryDate = val.slice(0, 5)
}

const validateSecurityCode = (rule: any, value: any, callback: any) => {
  const securityCodeRegex = /^\d+$/
  if (value === '') {
    callback(new Error('Please input security code'))
  } else if (value.length < 3 || value.length > 4) {
    callback(new Error('Please input a valid security code'))
  } else if (!securityCodeRegex.test(value)) {
    callback(new Error('Invalid Security Code'))
  } else {
    callback()
  }
}

function filterDigits() {
  creditCardRuleForm.securityCode = creditCardRuleForm.securityCode.replace(/\D/g, '')
  creditCardRuleForm.securityCode = creditCardRuleForm.securityCode?.slice(0, 4)
}

const gCashRuleForm = reactive({
  mobileNumber: '',
})

const creditCardRuleForm = reactive<CardTransaction>({
  cardNumber: ' ',
  securityCode: '',
  expiryDate: '',
})

const gCashRules = reactive<FormRules<typeof gCashRuleForm>>({
  mobileNumber: [{ validator: validatePhoneNumber, trigger: 'change' }],
})

const cardDetailsRules = reactive<FormRules<typeof creditCardRuleForm>>({
  cardNumber: [{ validator: validateCardNumber, trigger: 'change' }],
  securityCode: [{ validator: validateSecurityCode, trigger: 'change' }],
  expiryDate: [{ validator: validateExpiryDate, trigger: 'change' }],
})

const submitGcashDetails = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      withdrawAmountDialog.value = true
      // walletDialog.value = false;
    } else {
      console.log('error submit!')
    }
  })
}

const submitCardDetails = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      withdrawAmountDialog.value = true
    } else {
      console.log('error submit!')
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<style scoped>
.withdrawContainer {
  width: 300px;
  background-color: white;
  border-radius: 10px;
  padding: 10px;
  margin: 20px;
}
</style>
