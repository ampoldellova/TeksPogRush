import { defineStore } from 'pinia'
import { useAuthenticationStore } from './userStore'
import { useRegistrationStore } from './userStore'

export interface Transaction {
  id: string
  userName: string
  type: 'cash-in' | 'withdrawal'
  amount: number
  date: string
  accountNumber: string
  accountName: string
  method: 'Gcash' | 'Bank Account'
}

export interface GCashTransaction {
  id: string
  userName: string
  amount: number
  date: string
  mobileNumber: string
}

export interface CardTransaction {
  id: string
  userName: string
  amount: number
  date: string
  cardNumber: string
  expiryDate: string
  securityCode: string
}

export const useMoneyTransactionsStore = defineStore('moneyTransactions', {
  state: () => ({
    gcashPayments: JSON.parse(localStorage.getItem('gcashPayments') || '[]') as GCashTransaction[],
    cardPayments: JSON.parse(localStorage.getItem('cardPayments') || '[]') as CardTransaction[],
    transactions: JSON.parse(localStorage.getItem('transactions') || '[]') as Transaction[],
  }),

  getters: {
    userTransactions(state) {
      const authStore = useAuthenticationStore()
      return state.transactions.filter(
        (transaction) => transaction.userName === authStore.user?.email,
      )
    },
  },

  actions: {
    gCashPayment(amount: number, chips: number, mobileNumber: string) {
      const authStore = useAuthenticationStore()
      const registrationStore = useRegistrationStore()

      if (!authStore.isLoggedIn) {
        throw new Error('User must be logged in to perform a transaction.')
      }

      const user = registrationStore.registeredUsers.find((u) => u.email === authStore.user?.email)

      if (!user) {
        throw new Error('User not found.')
      }

      const newGCashTransaction: GCashTransaction = {
        id: Date.now().toString(),
        userName: user.email,
        amount,
        date: new Date().toISOString(),
        mobileNumber: mobileNumber,
      }

      this.gcashPayments.push(newGCashTransaction)
      localStorage.setItem('gCashPayments', JSON.stringify(this.gcashPayments))
      const balanceChange = +chips
      user.wallet += balanceChange
      localStorage.setItem('registeredUsers', JSON.stringify(registrationStore.registeredUsers))
    },

    cardPayment(
      amount: number,
      chips: number,
      cardNumber: string,
      expiryDate: string,
      securityCode: string,
    ) {
      const authStore = useAuthenticationStore()
      const registrationStore = useRegistrationStore()

      if (!authStore.isLoggedIn) {
        throw new Error('User must be logged in to perform a transaction.')
      }

      const user = registrationStore.registeredUsers.find((u) => u.email === authStore.user?.email)

      if (!user) {
        throw new Error('User not found.')
      }

      const newCardTransaction: CardTransaction = {
        id: Date.now().toString(),
        userName: user.email,
        amount,
        date: new Date().toISOString(),
        cardNumber: cardNumber,
        expiryDate: expiryDate,
        securityCode: securityCode,
      }

      this.cardPayments.push(newCardTransaction)
      localStorage.setItem('cardPayments', JSON.stringify(this.cardPayments))
      const balanceChange = +chips
      user.wallet += balanceChange
      localStorage.setItem('registeredUsers', JSON.stringify(registrationStore.registeredUsers))
    },

    addTransaction(
      type: 'cash-in' | 'withdrawal',
      amount: number,
      accountNumber: string,
      accountName: string,
      method: 'Gcash' | 'Bank Account',
    ) {
      const authStore = useAuthenticationStore()
      const registrationStore = useRegistrationStore()

      if (!authStore.isLoggedIn) {
        throw new Error('User must be logged in to perform a transaction.')
      }

      const user = registrationStore.registeredUsers.find((u) => u.email === authStore.user?.email)

      if (!user) {
        throw new Error('User not found.')
      }

      if (type === 'withdrawal' && user.wallet < amount) {
        throw new Error('Insufficient balance for withdrawal.')
      }

      const newTransaction: Transaction = {
        id: Date.now().toString(),
        userName: user.email,
        type,
        amount,
        date: new Date().toISOString(),
        accountNumber,
        accountName,
        method,
      }

      this.transactions.push(newTransaction)
      localStorage.setItem('transactions', JSON.stringify(this.transactions))

      // Update the user's wallet balance
      const balanceChange = type === 'cash-in' ? +amount : -amount
      user.wallet += balanceChange

      // Save updated users to localStorage
      localStorage.setItem('registeredUsers', JSON.stringify(registrationStore.registeredUsers))
    },

    loadTransactions() {
      this.transactions = JSON.parse(localStorage.getItem('transactions') || '[]')
    },
  },
})
