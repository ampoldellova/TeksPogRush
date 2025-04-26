<template>
    <el-dialog v-model="visible" title="Your Wallet" width="500px">
      <div v-if="!showForm" style="text-align: center;">
        <p>Your current balance: <strong>₱{{ userWalletBalance }}</strong></p>
        <div style="display: inline-flex; gap: 10px;">
          <el-button @click="openDepositForm" type="success">Deposit</el-button>
          <el-button @click="openWithdrawForm" type="danger">Withdraw</el-button>
        </div>
      </div>
  
      <div v-else>
        <el-header style="font-weight: bold; font-size: 16px; color: black;">
          {{ formType === 'deposit' ? 'Deposit Funds' : 'Withdraw Funds' }}: ₱{{ userWalletBalance }}
        </el-header>
        <el-row style="display: flex; justify-content: center; margin-bottom: 20px;"> 
            <el-row :span="12" style="margin-right: 150px;">
            <img src="@/assets/Gcash.png" alt="gcash" />
            </el-row>
          <el-row :span="12">
            <img src="@/assets/MasterCard.png" alt="mastercard" style="size: 200px;" />
          </el-row>
          <el-segmented v-model="value" :options="options" block size="large" style="width: 100vw;" />
          <el-col>
            <el-input
              v-model="valueContainerInput"
              class="valueContainer"
              placeholder="Enter Amount"
            ></el-input>
          </el-col>
          <el-row>
            <el-col>
              <el-input
                v-model="accountNumberInput"
                placeholder="Enter Account Number"
              ></el-input>

            </el-col>
            <el-col>
              <el-input
                v-model="accountNameInput"
                placeholder="Enter Account Name"
              ></el-input>

            </el-col>
          </el-row>
        </el-row>
        <motion.button
          @click="formType === 'deposit' ? handleCashIn() : handleWithdraw()"
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
        <el-button @click="closeForm" type="text" style="margin-top: 10px">Cancel</el-button>
      </div>
    </el-dialog>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue'
  import { useMoneyTransactionsStore } from '@/stores/moneyTransaction'
  import { useAuthenticationStore, useRegistrationStore } from '@/stores/userStore'
  import { motion } from 'motion-v'
  import GCash from '../assets/Gcash.png'
  import MasterCard from '../assets/MasterCard.png'
  
  const visible = ref(false)
  const showForm = ref(false)
  const formType = ref<'deposit' | 'withdraw'>('deposit')
  
  const value = ref<'Gcash' | 'Bank Account'>('Gcash')
  const options = ['Gcash', 'Bank Account']
  
  const accountNumberInput = ref('')
  const accountNameInput = ref('')
  const valueContainerInput = ref(0) // Amount to deposit/withdraw
  
  const registrationStore = useRegistrationStore() // Initialize the store
  const moneyStore = useMoneyTransactionsStore()
  const authenticationStore = useAuthenticationStore()
  
  const userWalletBalance = computed(() => {
  const user = registrationStore.registeredUsers.find(
    (u) => u.email === authenticationStore.user?.email
  )
  return user ? user.wallet.toFixed(2) : '0.00'
})
  
  const openDepositForm = () => {
    formType.value = 'deposit'
    showForm.value = true
  }
  
  const openWithdrawForm = () => {
    formType.value = 'withdraw'
    showForm.value = true
  }
  
  const closeForm = () => {
    showForm.value = false
    accountNumberInput.value = ''
    accountNameInput.value = ''
    valueContainerInput.value = 0
  }
  
  const handleCashIn = () => {
    if (!valueContainerInput.value || !accountNumberInput.value || !accountNameInput.value) {
      alert('Please fill in all fields.')
      return
    }
  
    try {
      moneyStore.addTransaction(
        'cash-in',
        valueContainerInput.value,
        accountNumberInput.value,
        accountNameInput.value,
        value.value
      )
      alert('Deposit successful!')
      closeForm()
    } catch (error) {
      alert(error instanceof Error ? error.message : 'An unknown error occurred')
    }
  }
  
  const handleWithdraw = () => {
    if (!valueContainerInput.value || !accountNumberInput.value || !accountNameInput.value) {
      alert('Please fill in all fields.')
      return
    }
  
    try {
      moneyStore.addTransaction(
        'withdrawal',
        valueContainerInput.value,
        accountNumberInput.value,
        accountNameInput.value,
        value.value
      )
      alert('Withdrawal successful!')
      closeForm()
    } catch (error) {
      alert(error instanceof Error ? error.message : 'An unknown error occurred')
    }
  }
  </script>
  
  <style scoped>
  .valueContainer {
    width: 75%;
    height: 4vh;
    background-color: rgba(133, 130, 130, 0.048);
    border-radius: 12px;
    margin: auto;
    margin-top: 8%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  img {
    margin-bottom: 8%;
  }
  
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 10vw;
    height: 3vh;
    border-radius: 10px;
    margin: auto;
    margin-top: 8%;
    margin-bottom: 8%;
    background-color: #f2921d;
    border-color: gray;
  }
  </style>