<template>
  <el-dialog v-model="paymentDialog" width="400" align-center>
    <template #header>
      <el-text :style="{ fontFamily: 'bold', color: COLORS.dark }">Payment</el-text>
    </template>

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
          @click="paymentSelected = payment.name"
          :src="payment.image"
          fit="contain"
          :style="{ width: '50px', height: '50px', cursor: 'pointer' }"
        />
      </div>
    </div>

    <div
      :style="{
        marginTop: '10px',
        marginBottom: '10px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }"
    >
      <el-text :style="{ fontFamily: 'bold', fontSize: '12px', color: COLORS.dark }">
        Amount Due: Php. {{ props.chip.price * quantity }}.00
      </el-text>

      <el-input-number v-model="quantity" :min="1" :max="10" @change="handleChange" />
    </div>

    <el-divider :style="{ margin: 0, marginBottom: '10px' }" />
    <div v-if="paymentSelected === 'GCash'">
      <el-text :style="{ fontFamily: 'regular', fontSize: '12px', color: COLORS.dark }">
        Login to pay with GCash
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
      </el-form>

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
    </div>

    <div v-if="paymentSelected === 'Credit Card'">
      <el-text :style="{ fontFamily: 'regular', fontSize: '12px', color: COLORS.dark }">
        Enter your credit card details, make sure to double check your card details before
        proceeding.
      </el-text>

      <el-form ref="ruleFormRef" :model="creditCardRuleForm" :rules="cardDetailsRules">
        <el-row style="margin-top: 10px">
          <el-col :span="24">
            <el-text :style="{ fontFamily: 'regular', fontSize: '10px', color: COLORS.dark }">
              * Card Number
            </el-text>
            <el-form-item prop="cardNumber">
              <el-input
                v-model="creditCardRuleForm.cardNumber"
                placeholder="Enter card number"
                input-style="font-family:regular; font-size:12px"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :span="12">
            <el-text :style="{ fontFamily: 'regular', fontSize: '10px', color: COLORS.dark }">
              * Expiration Date
            </el-text>

            <el-form-item prop="expiryDate">
              <el-input
                v-model="creditCardRuleForm.expiryDate"
                placeholder="MM/YY"
                input-style="font-family:regular; font-size:12px"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-text :style="{ fontFamily: 'regular', fontSize: '10px', color: COLORS.dark }">
              * Security Code
            </el-text>
            <el-form-item prop="securityCode">
              <el-input
                v-model="creditCardRuleForm.securityCode"
                :type="'password'"
                :show-password="true"
                placeholder="Enter security code"
                input-style="font-family:regular; font-size:12px"
              />
            </el-form-item>
          </el-col>
        </el-row>

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
      </el-form>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { COLORS } from '@/assets/theme'
import gcash from '@/assets/shop/gcash.png'
import creditCard from '@/assets/shop/creditCard.png'
import { reactive, ref } from 'vue'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { useMoneyTransactionsStore } from '@/stores/moneyTransaction'

const quantity = ref(1)
const payment = useMoneyTransactionsStore()
const ruleFormRef = ref<FormInstance>()
const paymentDialog = ref(false)
const paymentSelected = ref('GCash')
const paymentMethods = ref([
  {
    id: '001',
    name: 'GCash',
    image: gcash,
  },
  {
    id: '002',
    name: 'Credit Card',
    image: creditCard,
  },
])

const emit = defineEmits(['closeDialog'])

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
  if (value === '') {
    callback(new Error('Please input card number'))
  } else {
    callback()
  }
}

const validateExpiryDate = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input expiry date'))
  } else {
    callback()
  }
}

const validateSecurityCode = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input security code'))
  } else {
    callback()
  }
}

const gCashRuleForm = reactive({
  mobileNumber: '',
})

const creditCardRuleForm = reactive({
  cardNumber: '',
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
      payment.gCashPayment(
        props.chip.price,
        props.chip.value,
        quantity.value,
        gCashRuleForm.mobileNumber,
        'CashIn',
      )
      emit('closeDialog')
      ElMessage({
        message: 'Payment successful!',
        grouping: true,
        type: 'success',
      })
    } else {
      console.log('error submit!')
    }
  })
}

const submitCardDetails = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      payment.cardPayment(
        props.chip.price,
        props.chip.value,
        quantity.value,
        creditCardRuleForm.cardNumber,
        creditCardRuleForm.expiryDate,
        creditCardRuleForm.securityCode,
        'CashIn',
      )
      emit('closeDialog')
      ElMessage({
        message: 'Payment successful!',
        grouping: true,
        type: 'success',
      })
    } else {
      console.log('error submit!')
    }
  })
}

const props = defineProps<{
  chip: {
    id: string
    name: string
    price: number
    image: string
    value: number
  }
}>()

const handleChange = (value: number | undefined) => {
  console.log(value)
}
</script>

<style scoped></style>
