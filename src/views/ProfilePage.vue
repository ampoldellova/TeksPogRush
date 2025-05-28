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
          ref="transactionContainerRef"
          class="transactionContainer"
          style="
            max-height: 80vh;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            align-items: center;
            border: 1px solid #fff;
            border-radius: 15px;
            gap: 20px;
            background: rgba(0, 0, 0, 0.4);
            backdrop-filter: blur(10px);
            padding: 20px;
          "
        >
          <el-text
            :style="{
              fontFamily: 'regular',
              fontWeight: 'bold',
              color: 'white',
              fontSize: '20px',
            }"
          >
            TRANSACTIONS
          </el-text>

          <div
            v-for="transaction in reversedTransactions"
            :key="transaction.id"
            style="width: 100%; color: white; border-bottom: 1px solid #666; padding-bottom: 15px"
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
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import profilePicture from '@/assets/profile/profileImage.jpg'
import { useMoneyTransactionsStore } from '@/stores/moneyTransaction'

const transactionContainerRef = ref<HTMLElement | null>(null)
const moneyTransactionsStore = useMoneyTransactionsStore()

const transactions = computed(() => moneyTransactionsStore.userTransactions)

const reversedTransactions = computed(() => {
  return [...transactions.value].reverse()
})
</script>

<style scoped>
.transactionContainer::-webkit-scrollbar {
  display: none;
}

.transactionContainer {
  scrollbar-width: none;
  -ms-overflow-style: none;
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
