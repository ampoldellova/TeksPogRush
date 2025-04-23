import { defineStore } from 'pinia'
import { useAuthenticationStore } from './userStore'

export interface Transaction {
  id: string
  userEmail: string
  type: 'cash-in' | 'withdrawal'
  amount: number
  date: string
  accountNumber: string
  accountName: string
  method: 'Gcash' | 'Bank Account'
}

export const useMoneyTransactionsStore = defineStore('moneyTransactions', {
  state: () => ({
    transactions: JSON.parse(localStorage.getItem('transactions') || '[]') as Transaction[],
  }),

  getters: {
    userTransactions(state) {
      const authStore = useAuthenticationStore()
      return state.transactions.filter(
        (transaction) => transaction.userEmail === authStore.user?.email,
      )
    },
  },

  actions: {
    addTransaction(
      type: 'cash-in' | 'withdrawal',
      amount: number,
      accountNumber: string,
      accountName: string,
      method: 'Gcash' | 'Bank Account',
    ) {
      const authStore = useAuthenticationStore()

      if (!authStore.isLoggedIn) {
        throw new Error('User must be logged in to perform a transaction.')
      }

      if (type === 'withdrawal' && authStore.getUserBalance < amount) {
        throw new Error('Insufficient balance for withdrawal.')
      }

      const newTransaction: Transaction = {
        id: Date.now().toString(),
        userEmail: authStore.user?.email || '',
        type,
        amount,
        date: new Date().toISOString(),
        accountNumber,
        accountName,
        method,
      }

      this.transactions.push(newTransaction)
      localStorage.setItem('transactions', JSON.stringify(this.transactions))

      // Update the user's balance
      const balanceChange = type === 'cash-in' ? amount : -amount
      authStore.updateBalance(balanceChange)
    },

    loadTransactions() {
      this.transactions = JSON.parse(localStorage.getItem('transactions') || '[]')
    },
  },
})