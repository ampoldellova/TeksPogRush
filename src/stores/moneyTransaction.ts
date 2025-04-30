import { defineStore } from 'pinia'
import { useAuthenticationStore } from './userStore'
import { useRegistrationStore } from './userStore'
import type { Transaction, GCashTransaction, CardTransaction } from '@/components/models/types'
import { v4 as uuidv4 } from 'uuid'
import { useTokenStore } from './tokenStore'

// export interface Transaction {
//   id: string
//   userName: string
//   type: 'cash-in' | 'withdrawal'
//   amount: number
//   date: string
//   accountNumber: string
//   accountName: string
//   method: 'Gcash' | 'Bank Account'
// }

// export interface GCashTransaction {
//   id: string
//   userName: string
//   amount: number
//   date: string
//   mobileNumber: string
// }

// export interface CardTransaction {
//   id: string
//   userName: string
//   amount: number
//   date: string
//   cardNumber: string
//   expiryDate: string
//   securityCode: string
// }

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
      const tokenStore = useTokenStore()

      const user = registrationStore.registeredUsers.find((u) => u.email === authStore.user?.email)
      if (!user || user.wallet < amount) {
        throw new Error('Insufficient wallet balance')
      }

      // Deduct from wallet balance
      user.wallet -= amount
      const newGCashTransaction: GCashTransaction = {
        id: uuidv4(),
        userName: user.username,
        amount,
        date: new Date().toISOString(),
        mobileNumber: mobileNumber,
      }

      this.gcashPayments.push(newGCashTransaction)
      localStorage.setItem('gCashPayments', JSON.stringify(this.gcashPayments))
      const balanceChange = +chips
      user.wallet += balanceChange
      localStorage.setItem('registeredUsers', JSON.stringify(registrationStore.registeredUsers))

      // Add chips to token balance
      tokenStore.updateTokenBalance(user.email, chips)
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
      const tokenStore = useTokenStore() // ✅ Move store initialization inside the function

      if (!authStore.isLoggedIn) {
        throw new Error('User must be logged in to perform a transaction.')
      }

      const user = registrationStore.registeredUsers.find((u) => u.email === authStore.user?.email)
      if (!user) {
        throw new Error('User not found.')
      }

      const newCardTransaction: CardTransaction = {
        id: Date.now().toString(),
        userName: user.username,
        amount,
        date: new Date().toISOString(),
        cardNumber,
        expiryDate,
        securityCode,
      }

      this.cardPayments.push(newCardTransaction)
      localStorage.setItem('cardPayments', JSON.stringify(this.cardPayments))

      // Deduct from wallet balance
      user.wallet -= amount
      localStorage.setItem('registeredUsers', JSON.stringify(registrationStore.registeredUsers))

      // Add chips to token balance
      tokenStore.updateTokenBalance(user.email, chips)
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

      const MIN_CASH_IN = 100
      const MAX_CASH_IN = 10000
      const MIN_WITHDRAWAL = 100
      const MAX_WITHDRAWAL = 50000

      // Validate minimum and maximum cash-in
      if (type === 'cash-in') {
        if (amount < MIN_CASH_IN) {
          throw new Error(`Minimum cash-in amount is ${MIN_CASH_IN}.`)
        }
        if (amount > MAX_CASH_IN) {
          throw new Error(`Maximum cash-in amount is ${MAX_CASH_IN}.`)
        }
      }

      // Validate minimum and maximum withdrawal
      if (type === 'withdrawal') {
        if (amount < MIN_WITHDRAWAL) {
          throw new Error(`Minimum withdrawal amount is ${MIN_WITHDRAWAL}.`)
        }
        if (amount > MAX_WITHDRAWAL) {
          throw new Error(`Maximum withdrawal amount is ${MAX_WITHDRAWAL}.`)
        }
        if (user.wallet < amount) {
          throw new Error('Insufficient balance for withdrawal.')
        }
      }

      const newTransaction: Transaction = {
        id: uuidv4(),
        userName: user.username,
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
  },
})
