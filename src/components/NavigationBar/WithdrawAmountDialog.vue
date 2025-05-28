<template>
  <el-dialog v-model="withdrawAmountDialog" width="300" align-center>
    <template #header>
      <el-text
        :style="{ fontFamily: 'bold', color: COLORS.dark, alignItems: 'center', display: 'flex' }"
      >
        Current Balance:
        <el-image
          :src="currency"
          fit="cover"
          style="height: 20px; width: 20px; margin-right: 5px; margin-left: 5px"
        />{{ userWalletBalance }}
      </el-text>
    </template>

    <el-form>
      <el-text :style="{ fontFamily: 'regular', fontSize: '10px', color: COLORS.dark }">
        Withdraw Amount
      </el-text>
      <el-input
        placeholder="Enter amount to withdraw"
        input-style="font-family:regular; font-size:12px"
        v-model="withdrawAmount"
        type="text"
        @input="formatWithdrawAmount"
      />

      <el-button
        :style="{
          width: '100%',
          background: 'linear-gradient(to right, #f2cd5c, #f2921d',
          borderWidth: 0,
          fontFamily: 'semiBold',
          color: 'white',
          borderRadius: '10px',
          marginTop: '10px',
        }"
        @click="withdraw"
      >
        WITHDRAW
      </el-button>
    </el-form>
  </el-dialog>
</template>

<script setup lang="ts">
import { COLORS } from '@/assets/theme'
import { computed, ref } from 'vue'
import currency from '@/assets/currency.png'
import { useAuthenticationStore } from '@/stores/userStore'
import { useRegistrationStore } from '@/stores/userStore'
import { useMoneyTransactionsStore } from '@/stores/moneyTransaction'
import { ElMessage, type Action, type FormInstance, ElMessageBox } from 'element-plus'

const props = defineProps<{
  paymentMethod: 'GCash' | 'Card'
}>()

const registrationStore = useRegistrationStore()
const authenticationStore = useAuthenticationStore()
const withdrawAmount = ref()
const payment = useMoneyTransactionsStore()

const props = defineProps({
  paymentMethod: {
    type: String,
    required: true,
  },
})

const emits = defineEmits(['closeDialog'])

const withdraw = async (formEl: FormInstance | undefined) => {

  if (!withdrawAmount.value || Number(withdrawAmount.value) <= 0) {

    ElMessage({
      message: 'Please enter a valid withdrawal amount.',
      type: 'error',
      grouping: true,
    })
    return
  }

  const chips = Number(withdrawAmount.value)
  const user = registrationStore.registeredUsers.find(
    (u) => u.email === authenticationStore.user?.email,
  )

  if (!user) {
    ElMessage({
      message: 'User not found.',
      type: 'error',
      grouping: true,
    })
    return
  }

  if (user.wallet < chips) {
    ElMessage({
      message: 'Insufficient balance.',
      type: 'error',
      grouping: true,
    })
    return
  }

  try {

    if (props.paymentMethod === 'GCash') {
      const fixedOTP = '000000'
      console.log('OTP sent to user:', fixedOTP)

      const { value: otp } = await ElMessageBox.prompt(
        'Enter the OTP sent to your Gcash',
        'OTP Verification',
        {
          confirmButtonText: 'Verify',
          cancelButtonText: 'Cancel',
          inputPattern: /^\d{6}$/,
          inputErrorMessage: 'Please enter the 6-digit OTP',
          inputPlaceholder: '000000',
          inputType: 'number',
        },
      )

      if (otp !== fixedOTP) {
        ElMessage({
          message: 'Invalid OTP entered.',
          type: 'error',
          grouping: true,
        })
        return
      }
    }

    // Confirm withdrawal after OTP (or immediately if not GCash)
    await ElMessageBox.confirm(`You are going to withdraw ₱${withdrawAmount.value}`, 'Confirm', {
      distinguishCancelAndClose: true,
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
    })

    payment.withdraw(chips, chips)

    ElMessage({
      type: 'success',
      message: 'Transaction Completed',
    })
  } catch {
    ElMessage({
      type: 'error',
      message: 'Transaction Cancelled',
    })
  } finally {
    emits('closeDialog')
    formEl?.resetFields()
    withdrawAmount.value = ''
  }

}

function formatWithdrawAmount() {
  let val = withdrawAmount.value ?? ''


  val = val.replace(/[^0-9.]/g, '')


  const parts = val.split('.')
  if (parts.length > 2) {
    val = parts[0] + '.' + parts[1]
  }

  if (parts[1]) {
    parts[1] = parts[1].slice(0, 2)
    val = parts[0] + '.' + parts[1]
  }
  withdrawAmount.value = val
}

const withdrawAmountDialog = ref(false)
const userWalletBalance = computed(() => {
  const user = registrationStore.registeredUsers.find(
    (u) => u.email === authenticationStore.user?.email,
  )
  return user ? `${user.wallet}` : '₱0.00'
})
</script>
