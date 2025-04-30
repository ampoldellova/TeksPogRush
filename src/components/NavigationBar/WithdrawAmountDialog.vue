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

    <el-text :style="{ fontFamily: 'regular', fontSize: '10px', color: COLORS.dark }">
      Withdraw Amount
    </el-text>
    <el-input
      placeholder="Enter amount to withdraw"
      input-style="font-family:regular; font-size:12px"
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
    >
      WITHDRAW
    </el-button>
  </el-dialog>
</template>

<script setup lang="ts">
import { COLORS } from '@/assets/theme'
import { computed, ref } from 'vue'
import currency from '@/assets/currency.png'
import { useAuthenticationStore } from '@/stores/userStore'
import { useRegistrationStore } from '@/stores/userStore'

const registrationStore = useRegistrationStore()
const authenticationStore = useAuthenticationStore()

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
