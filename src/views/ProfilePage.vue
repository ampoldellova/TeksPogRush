<template>
  <div
    :style="{
      background: 'linear-gradient(to bottom, #400e32, black)',
      height: '100vh',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '10px',
    }"
  >
    <el-row justify="center" style="width: 100%; height: 75%">
      <el-col :xs="24" :sm="20" :md="16" :lg="12" :xl="8">
        <div
          class="mainContainer"
          style="
            max-height: 80vh;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            border: 1px solid #fff;
            border-radius: 15px;
            background: rgba(0, 0, 0, 0.4);
            backdrop-filter: blur(10px);
          "
        >
          <div
            class="tabNavigation"
            style="
              display: flex;
              border-bottom: 1px solid #666;
              background: rgba(255, 255, 255, 0.05);
              border-radius: 15px 15px 0 0;
            "
          >
            <button
              @click="activeTab = 'profile'"
              :class="['tabButton', { active: activeTab === 'profile' }]"
              style="
                flex: 1;
                padding: 15px 20px;
                background: transparent;
                border: none;
                color: white;
                font-family: 'regular';
                font-weight: bold;
                font-size: 16px;
                cursor: pointer;
                transition: all 0.3s ease;
                border-radius: 15px 0 0 0;
              "
            >
              PROFILE
            </button>
            <button
              @click="activeTab = 'transactions'"
              :class="['tabButton', { active: activeTab === 'transactions' }]"
              style="
                flex: 1;
                padding: 15px 20px;
                background: transparent;
                border: none;
                color: white;
                font-family: 'regular';
                font-weight: bold;
                font-size: 16px;
                cursor: pointer;
                transition: all 0.3s ease;
                border-radius: 0 15px 0 0;
              "
            >
              TRANSACTIONS
            </button>
          </div>

          <div
            class="tabContent"
            style="padding: 20px; height: calc(100% - 60px); overflow-y: auto"
          >
            <div v-if="activeTab === 'profile'" class="profileContent">
              <div style="display: flex; flex-direction: column; align-items: center; gap: 20px">
                <div style="display: flex; flex-direction: column; align-items: center; gap: 15px">
                  <img
                    :src="profilePicture"
                    alt="Profile Picture"
                    style="width: 80px; height: 80px; border-radius: 50%; border: 3px solid #fff"
                  />
                  <el-text
                    :style="{
                      fontFamily: 'regular',
                      fontWeight: 'bold',
                      color: 'white',
                      fontSize: '24px',
                      textAlign: 'center',
                    }"
                  >
                    {{ authStore.user?.username }}
                  </el-text>
                </div>

                <div
                  class="walletCard"
                  style="
                    width: 50%;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 10px;
                    padding: 20px;
                    text-align: center;
                    border: 1px solid rgba(255, 255, 255, 0.2);
                  "
                >
                  <span style="color: #ccc; font-size: 14px; font-family: 'regular'"
                    >Current Balance</span
                  >
                  <div
                    style="
                      color: #4ade80;
                      font-size: 28px;
                      font-weight: bold;
                      font-family: 'regular';
                      margin-top: 5px;
                    "
                  >
                    ₱ {{ userWalletBalance }}
                  </div>
                </div>

                <div
                  class="profileForm"
                  style="width: 100%; display: flex; flex-direction: column; gap: 15px"
                >
                  <div
                    style="
                      display: flex;
                      justify-content: space-between;
                      align-items: center;
                      margin-bottom: 10px;
                    "
                  >
                    <el-text
                      style="
                        color: white;
                        font-size: 18px;
                        font-weight: bold;
                        font-family: 'regular';
                      "
                    >
                      Personal Information
                    </el-text>
                    <el-button
                      @click="toggleEditMode"
                      :type="isEditing ? 'success' : 'primary'"
                      size="small"
                      style="font-family: 'regular'"
                    >
                      {{ isEditing ? 'Save Changes' : 'Edit Profile' }}
                    </el-button>
                  </div>

                  <div class="fieldContainer">
                    <span class="fieldLabel">Username</span>
                    <el-input
                      v-if="isEditing"
                      v-model="editableProfile.username"
                      style="font-family: 'regular'"
                      disabled
                    />
                    <span v-else class="fieldValue">{{ currentProfile.username }}</span>
                  </div>

                  <div class="fieldContainer">
                    <span class="fieldLabel">Email</span>
                    <el-input
                      v-if="isEditing"
                      v-model="editableProfile.email"
                      type="email"
                      style="font-family: 'regular'"
                    />
                    <span v-else class="fieldValue">{{ currentProfile.email }}</span>
                  </div>

                  <div class="fieldContainer">
                    <span class="fieldLabel">Contact Number</span>
                    <el-input
                      v-if="isEditing"
                      v-model="editableProfile.contact"
                      style="font-family: 'regular'"
                    />
                    <span v-else class="fieldValue">{{ currentProfile.contact }}</span>
                  </div>

                  <el-button
                    v-if="isEditing"
                    @click="cancelEdit"
                    type="danger"
                    style="margin-top: 10px; font-family: 'regular'"
                  >
                    Cancel
                  </el-button>
                </div>
              </div>
            </div>

            <div v-if="activeTab === 'transactions'" class="transactionContent">
              <el-text
                :style="{
                  fontFamily: 'regular',
                  fontWeight: 'bold',
                  color: 'white',
                  fontSize: '20px',
                  display: 'block',
                  textAlign: 'center',
                  marginBottom: '20px',
                }"
              >
                TRANSACTION HISTORY
              </el-text>

              <div
                v-for="transaction in reversedTransactions"
                :key="transaction.id"
                style="
                  width: 100%;
                  color: white;
                  border-bottom: 1px solid #666;
                  padding-bottom: 15px;
                  margin-bottom: 15px;
                "
              >
                <el-row :gutter="10" align="middle" style="margin-bottom: 10px">
                  <el-col :xs="24" :sm="16" :md="16">
                    <div style="display: flex; align-items: center; gap: 10px">
                      <img
                        :src="profilePicture"
                        alt="Profile Picture"
                        style="width: 40px; height: 40px; border-radius: 50%"
                      />
                      <strong
                        :style="{
                          fontFamily: 'regular',
                          fontWeight: 'bold',
                          color: 'white',
                          fontSize: '16px',
                        }"
                      >
                        {{ transaction.userName }}
                      </strong>
                    </div>
                  </el-col>
                  <el-col :xs="24" :sm="8" :md="8">
                    <span
                      style="color: #ccc; font-size: 12px"
                      :style="{ textAlign: $el?.clientWidth < 576 ? 'left' : 'right' }"
                    >
                      {{ new Date(transaction.date).toLocaleString() }}
                    </span>
                  </el-col>
                </el-row>

                <el-row :gutter="10" style="margin-top: 8px">
                  <el-col :xs="12" :sm="8" :md="6">
                    <div class="labelContainer">
                      <span class="label">Type:</span>
                      <strong>{{ transaction.type }}</strong>
                    </div>
                  </el-col>
                  <el-col :xs="12" :sm="8" :md="6">
                    <div class="labelContainer">
                      <span class="label">Method:</span>
                      <strong>{{ transaction.method }}</strong>
                    </div>
                  </el-col>
                  <el-col :xs="12" :sm="8" :md="6">
                    <div class="labelContainer">
                      <span class="label">Amount:</span>
                      <strong>₱{{ transaction.amount }}</strong>
                    </div>
                  </el-col>
                  <el-col :xs="12" :sm="0" :md="6">
                    <div class="labelContainer">
                      <span class="label">New Balance:</span>
                      <strong>₱{{ transaction.newBalance }}</strong>
                    </div>
                  </el-col>
                </el-row>

                <el-row :gutter="10" style="margin-top: 5px">
                  <el-col :xs="24" :sm="12" :md="0">
                    <div class="labelContainer">
                      <span class="label">Previous Balance:</span>
                      <strong>₱{{ transaction.previousBalance }}</strong>
                    </div>
                  </el-col>
                  <el-col :xs="0" :sm="12" :md="0">
                    <div class="labelContainer">
                      <span class="label">New Balance:</span>
                      <strong>₱{{ transaction.newBalance }}</strong>
                    </div>
                  </el-col>
                  <el-col :xs="0" :sm="0" :md="24">
                    <div class="labelContainer">
                      <span class="label">Previous Balance:</span>
                      <strong>₱{{ transaction.previousBalance }}</strong>
                    </div>
                  </el-col>
                </el-row>
              </div>

              <div
                v-if="reversedTransactions.length === 0"
                style="text-align: center; color: #ccc; margin-top: 40px"
              >
                <el-text style="font-family: 'regular'; font-size: 16px">
                  No transactions found
                </el-text>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import profilePicture from '@/assets/profile/profileImage.jpg'
import { useMoneyTransactionsStore } from '@/stores/moneyTransaction'
import { useAuthenticationStore, useRegistrationStore } from '@/stores/userStore'

const moneyTransactionsStore = useMoneyTransactionsStore()
const authStore = useAuthenticationStore()
const registrationStore = useRegistrationStore()

const activeTab = ref('profile')
const isEditing = ref(false)

const currentProfile = computed(() => ({
  username: authStore.user?.username || '',
  email: authStore.user?.email || '',
  contact: getCurrentUserContact() || '',
}))

const userWalletBalance = computed(() => {
  if (!authStore.user?.id) return 0

  const currentUser = registrationStore.registeredUsers.find(
    (user) => user.id === authStore.user?.id,
  )
  return currentUser?.wallet || 0
})

const editableProfile = reactive({
  username: '',
  email: '',
  contact: '',
})

const transactions = computed(() => moneyTransactionsStore.userTransactions)
const reversedTransactions = computed(() => {
  return [...transactions.value].reverse()
})

function getCurrentUserContact(): string {
  const currentUser = registrationStore.registeredUsers.find(
    (user) => user.id === authStore.user?.id,
  )
  return currentUser?.contact || ''
}

function toggleEditMode() {
  if (isEditing.value) {
    saveProfile()
  } else {
    editableProfile.username = currentProfile.value.username
    editableProfile.email = currentProfile.value.email
    editableProfile.contact = currentProfile.value.contact
    isEditing.value = true
  }
}

function saveProfile() {
  if (!authStore.user) return

  if (
    !editableProfile.username.trim() ||
    !editableProfile.email.trim() ||
    !editableProfile.contact.trim()
  ) {
    ElMessage({
      message: 'All fields are required!',
      type: 'error',
      grouping: true,
    })
    return
  }

  const existingUser = registrationStore.registeredUsers.find(
    (user) =>
      user.id !== authStore.user?.id &&
      (user.email.toLowerCase() === editableProfile.email.toLowerCase() ||
        user.username.toLowerCase() === editableProfile.username.toLowerCase()),
  )

  if (existingUser) {
    ElMessage({
      message: 'Username or email already exists!',
      type: 'error',
      grouping: true,
    })
    return
  }

  const userIndex = registrationStore.registeredUsers.findIndex(
    (user) => user.id === authStore.user?.id,
  )

  if (userIndex !== -1) {
    registrationStore.registeredUsers[userIndex].username = editableProfile.username
    registrationStore.registeredUsers[userIndex].email = editableProfile.email
    registrationStore.registeredUsers[userIndex].contact = editableProfile.contact

    localStorage.setItem('registeredUsers', JSON.stringify(registrationStore.registeredUsers))

    authStore.user.username = editableProfile.username
    authStore.user.email = editableProfile.email

    const loginStatus = JSON.parse(localStorage.getItem('loginStatus') || '{}')
    loginStatus.username = editableProfile.username
    loginStatus.email = editableProfile.email
    localStorage.setItem('loginStatus', JSON.stringify(loginStatus))

    ElMessage({
      message: 'Profile updated successfully!',
      type: 'success',
      grouping: true,
    })

    isEditing.value = false
  }
}

function cancelEdit() {
  isEditing.value = false

  editableProfile.username = currentProfile.value.username
  editableProfile.email = currentProfile.value.email
  editableProfile.contact = currentProfile.value.contact
}
</script>

<style scoped>
.mainContainer::-webkit-scrollbar {
  display: none;
}

.mainContainer {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.tabContent::-webkit-scrollbar {
  display: none;
}

.tabContent {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.tabButton {
  position: relative;
}

.tabButton:hover {
  background: rgba(255, 255, 255, 0.1) !important;
}

.tabButton.active {
  background: rgba(255, 255, 255, 0.15) !important;
  border-bottom: 3px solid #4ade80;
}

.labelContainer {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 8px;
  font-family: 'regular';
  color: white;
  font-size: 14px;
}

.label {
  color: #ccc;
  font-size: 12px;
}

.fieldContainer {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 15px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.fieldLabel {
  color: #ccc;
  font-size: 12px;
  font-family: 'regular';
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.fieldValue {
  color: white;
  font-size: 16px;
  font-family: 'regular';
  font-weight: bold;
}

.walletCard {
  transition: all 0.3s ease;
}

.walletCard:hover {
  background: rgba(255, 255, 255, 0.15) !important;
  transform: translateY(-2px);
}

@media (max-width: 767px) {
  .labelContainer {
    padding: 5px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .labelContainer:last-child {
    border-bottom: none;
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  .labelContainer {
    min-height: 40px;
    justify-content: center;
  }
}
</style>
