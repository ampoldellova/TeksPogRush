<template>
  <el-dialog v-model="transactionHistory" width="800px" align-center>
    <div class="transaction-history">
      <div class="transaction-history-header">
        <h1>Transaction History</h1>
        <button>Close</button>
      </div>
      <div class="transaction-history-content">
        <h2>Transaction History</h2>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Account Name</th>
              <th>Account Number</th>
              <th>Method</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="transaction in transactions" :key="transaction.id">
              <td>{{ transaction.date }}</td>
              <td>{{ transaction.type }}</td>
              <td>{{ transaction.amount }}</td>
              <td>{{ transaction.accountName }}</td>
              <td>{{ transaction.accountNumber }}</td>
              <td>{{ transaction.method }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useMoneyTransactionsStore } from '@/stores/moneyTransaction'

const transactionHistory = ref(false)
const moneyTransactionsStore = useMoneyTransactionsStore()

const transactions = computed(() => moneyTransactionsStore.userTransactions)
</script>

<style scoped>
.transaction-history {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
