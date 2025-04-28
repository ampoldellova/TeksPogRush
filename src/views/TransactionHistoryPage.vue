<template>
  <div class="transaction-history">
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
</template>

<script>
import { useMoneyTransactionsStore } from '@/stores/moneyTransaction'

export default {
  name: 'TransactionHistory',
  computed: {
    transactions() {
      const moneyTransactionsStore = useMoneyTransactionsStore()
      return moneyTransactionsStore.userTransactions
    },
  },
}
</script>

<style scoped>
.transaction-history {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
