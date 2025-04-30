<template>
  <el-dialog v-model="visible" :style="{ width: dialogWidth }">
    <!-- <el-form>
      <div v-if="!showForm" style="text-align: center">
        <el-row>
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
          </el-col>
        </el-row>
      </div>
    </el-form> -->
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
      value.value,
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
      value.value,
    )
    alert('Withdrawal successful!')
    closeForm()
  } catch (error) {
    alert(error instanceof Error ? error.message : 'An unknown error occurred')
  }
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

:deep(.el-input__wrapper) {
  background-color: rgba(133, 130, 130, 0.048);
  border-radius: 12px;
  height: 4vh;
}

:deep(.el-input__placeholder) {
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

.gcashContainer,
.cardContainer {
  display: flex;
  margin: auto;
}

.gcash {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
}

:deep(.el-segmented) {
  width: 100vw;
  margin-top: 20px;
}

.accountInfoContainer {
  display: flex;
  margin: auto;
  gap: 20px;
}

.btnConfirm {
  display: flex;
  margin: auto;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
