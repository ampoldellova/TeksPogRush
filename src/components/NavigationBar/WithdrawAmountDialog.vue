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

    <!-- {{ withdrawAmount }} -->
    
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
import { ElMessage, type Action, type FormInstance, ElMessageBox} from 'element-plus'
// import { ElMessageBox } from 'element-plus/lib/components/index.js'

const registrationStore = useRegistrationStore()
const authenticationStore = useAuthenticationStore()
const withdrawAmount = ref()
const payment = useMoneyTransactionsStore()



const emits = defineEmits(['closeDialog'])
const withdraw = async (formEl: FormInstance | undefined) => {
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

  try{
    await ElMessageBox.confirm(
      `You are going to withdraw ₱${withdrawAmount.value}`,
      'Gcash',
      {
        distinguishCancelAndClose: true,
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel'
      } 
    )

      payment.withdraw(withdrawAmount.value, chips)
        ElMessage({
          type: 'success',
          message: 'Transaction Completed'
        })
        
  } catch {
    ElMessage({
      type:'error',
      message: 'Transaction Cacelled'
    })
  }
  emits('closeDialog')
  formEl?.resetFields

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
