<!-- <template>
  <el-dialog v-model="walletDialog" width="400" align-center>
    <template #header>
      <el-text :style="{ fontFamily: 'bold', color: COLORS.dark }">Withdraw</el-text>
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

    <WithdrawAmountDialog v-model="withdrawAmountDialog" @closeDialog="withdrawAmountDialog = false"/>
  </el-dialog>
</template>

<script setup lang="ts">
import gcash from '@/assets/shop/gcash.png'
import creditCard from '@/assets/shop/creditCard.png'
import { COLORS } from '@/assets/theme'
import { reactive, ref } from 'vue'
import WithdrawAmountDialog from './WithdrawAmountDialog.vue'
import { type FormInstance, type FormRules } from 'element-plus'

const ruleFormRef = ref<FormInstance>()
const walletDialog = ref(false)
const withdrawAmountDialog = ref(false)
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

const selectPaymentOption = (payment: string) => {
  paymentSelected.value = payment
  resetForm(ruleFormRef.value)
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

<style scoped></style> -->

<template>
  <el-dialog v-model="visible" :style="{ width: dialogWidth}">
    <el-form>
        <div v-if="!showForm" style="text-align: center">
          <el-row >
            <el-col :span="24">
              <p class="balanceContainer">Balance: ₱{{ userWalletBalance }}</p>
              <el-row class="buttonContainer">
                <el-col>
                  <el-button @click="openDepositForm" type="success">Deposit</el-button>
                </el-col>
                <el-col>
                  <el-button @click="openWithdrawForm" type="danger">Withdraw</el-button>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </div>
        <div v-else>
          <el-row>
            <el-col :span="24" class="imgContainer">
              <div v-if="formType === 'deposit'">
                <img src="@/assets/DEPOSITNOBG2.png" alt="deposit" style="width: 15vw" />
              </div>
              <div v-else>
                <img src="@/assets/WithdrawNoBg.png" alt="" />
              </div>
            </el-col>
            <el-col :span="12" class="gcashContainer">
              <img src="@/assets/Gcash.png" alt="gcash" class="gcash" />
            </el-col>
            <el-col :span="12">
              <img src="@/assets/MasterCard.png" alt="mastercard" class="cardContainer" />
            </el-col>
            <el-segmented v-model="value" :options="options" block size="large" />
  
            <el-col>
              <el-input
                v-model="valueContainerInput"
                class="valueContainer"
                placeholder="Enter Amount"
              ></el-input>
            </el-col>
            <el-row class="accountInfoContainer">
              <el-col>
                <el-input v-model="accountNumberInput" placeholder="Enter Account Number"></el-input>
              </el-col>
              <el-col>
                <el-input v-model="accountNameInput" placeholder="Enter Account Name"></el-input>
              </el-col>
            </el-row>
            <el-col class="btnConfirm">
              <motion.button
          :whileHover="{
            scale: 1.2,
            transition: { duration: 0.3 },
          }"
          :whilePress="{ scale: 0.9 }"
          :style="{
            fontFamily: 'bold',
            width: '200px',
            backgroundColor: '#ffd200',
            color: 'black',
            borderWidth: 0,
            height: '50px',
            borderRadius: '15px',
            cursor: 'pointer',
            boxShadow: '5px 8px 0px 1px rgba(0, 0, 0, 1)',
          }"
        >
          CONFIRM
        </motion.button>
            </el-col>
          </el-row>
        </div>
      </el-form>
    </el-dialog>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, onMounted, watch } from 'vue'
  import { useMoneyTransactionsStore } from '@/stores/moneyTransaction'
  import { useAuthenticationStore, useRegistrationStore } from '@/stores/userStore'
  import { motion } from 'motion-v'
  const visible = ref(true)
  const showForm = ref(false)
  const formType = ref<'deposit' | 'withdraw'>('deposit')
  const value = ref<'Gcash' | 'Bank Account'>('Gcash')
  const options = ['Gcash', 'Bank Account']
  const accountNumberInput = ref('')
  const accountNameInput = ref('')
  const valueContainerInput = ref(0) 
  const registrationStore = useRegistrationStore() 
  const moneyStore = useMoneyTransactionsStore()
  const authenticationStore = useAuthenticationStore()
  const screenWidth = ref(window.innerWidth)
  const dialogWidth = computed(() => {
    return screenWidth.value < 768 ? '70vw' : '25vw' 
  })
  onMounted(() => {
    window.addEventListener('resize', () => {
      screenWidth.value = window.innerWidth
    })
  })
  const userWalletBalance = computed(() => {
    const user = registrationStore.registeredUsers.find(
      (u) => u.email === authenticationStore.user?.email,
    )
    return user ? user.wallet.toFixed(2) : '0.00'
  })
  const openDepositForm = () => {
    formType.value = 'deposit';
    showForm.value = true;
  };
  const openWithdrawForm = () => {
    formType.value = 'withdraw';
    showForm.value = true;
  };
  const closeForm = () => {
    showForm.value = false
    accountNumberInput.value = ''
    accountNameInput.value = ''
    valueContainerInput.value = 0
  }

  </script>
  
  <style scoped>
  .imgContainer {
    display: flex;
    width: 100vw;
    justify-content: center;
    align-items: center;
  }
  .valueContainer {
    width: 15vw;
    margin: auto;
    margin-top: 8%;
    margin-bottom: 3%;
    display: flex;
  }
  :deep(.el-input__wrapper){
    background-color: rgba(133, 130, 130, 0.048);
    border-radius: 12px;
    height: 4vh;
  }
  :deep(.el-input__placeholder){
    color: black;
  }
  .balanceContainer {
    font-size: 16px;
    color: black;
    text-align: center;
  }
  .buttonContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-top: 20px;
  }
  :deep(.el-button) {
    width: 100%;
    padding: 20px;
  }
  .gcashContainer, .cardContainer{
    display: flex;
    margin: auto;
  }
  .gcash{
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
  }
  :deep(.el-segmented){
    width: 100vw;
    margin-top: 20px;
  }
  .accountInfoContainer{
    display: flex;
    margin: auto;
    gap: 20px;
  }
  .btnConfirm{
    display: flex;
    margin: auto;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  </style>
