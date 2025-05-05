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
      />{{ userWalletBalance }}.00
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
import { ElMessage, type FormInstance } from 'element-plus'

const registrationStore = useRegistrationStore()
const authenticationStore = useAuthenticationStore()
const withdrawAmount = ref()
const payment = useMoneyTransactionsStore()

const emits = defineEmits(['closeDialog'])
const withdraw = (formEl: FormInstance | undefined) => {
  if (!withdrawAmount.value || withdrawAmount.value <= 0) {
    // alert('Please enter a valid withdrawal amount.');
    ElMessage({
      message: 'Please enter a valid withdrawal amount.',
      type: 'error',
      grouping: true,
    })
    return
  }

  const chips = withdrawAmount.value
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

  payment.withdraw(withdrawAmount.value, chips)
  ElMessage({
    message: 'Withdrawal successful.',
    type: 'success',
    grouping: true,

  })
  formEl?.resetFields()
  emits('closeDialog')

}

const withdrawAmountDialog = ref(false)
const userWalletBalance = computed(() => {
  const user = registrationStore.registeredUsers.find(
    (u) => u.email === authenticationStore.user?.email,
  )
  console.log('User:', user)
  return user ? `${user.wallet}` : '₱0.00'
})
</script>

<style scoped></style>
