import { defineStore } from 'pinia'
import { useAuthenticationStore } from './userStore'
import { useMoneyTransactionsStore } from './moneyTransaction'

export const useWalletStore = defineStore('wallet', {
  state: () => ({
    balance: 0,
  }),

  actions: {
    initializeWallet() {
      const authStore = useAuthenticationStore()
      const moneyTransactionsStore = useMoneyTransactionsStore()

      if (!authStore.isLoggedIn) {
        throw new Error('User must be logged in to initialize wallet.')
      }

      const userTransactions = moneyTransactionsStore.userTransactions
      this.balance = userTransactions.reduce((total, transaction) => {
        return transaction.type === 'cash-in'
          ? total + transaction.amount
          : total - transaction.amount
      }, 0)
    },

    updateWallet(transaction: { type: 'cash-in' | 'withdrawal'; amount: number }) {
      if (transaction.type === 'cash-in') {
        this.balance += transaction.amount
      } else if (transaction.type === 'withdrawal') {
        this.balance -= transaction.amount
      }
    },
  },
})
