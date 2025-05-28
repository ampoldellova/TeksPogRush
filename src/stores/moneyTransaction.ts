import { defineStore } from 'pinia'
import { useAuthenticationStore } from './userStore'
import { useRegistrationStore } from './userStore'
import type {
  Transaction,
  GCashTransaction,
  CardTransaction,
  withdraw,
} from '@/components/models/types'
import { v4 as uuidv4 } from 'uuid'
import { throwError } from 'element-plus/es/utils/error.mjs'

export const useMoneyTransactionsStore = defineStore('moneyTransactions', {
  state: () => ({
    gcashPayments: JSON.parse(localStorage.getItem('gcashPayments') || '[]') as GCashTransaction[],
    cardPayments: JSON.parse(localStorage.getItem('cardPayments') || '[]') as CardTransaction[],
    transactions: JSON.parse(localStorage.getItem('transactions') || '[]') as Transaction[],
    withdrawTransactions: JSON.parse(
      localStorage.getItem('withdrawTransactions') || '[]',
    ) as withdraw[],
  }),

  getters: {
    userTransactions(state) {
      const authStore = useAuthenticationStore()
      return state.transactions.filter(
        (transaction) => transaction.userName === authStore.user?.username,
      )
    },
  },

  actions: {
    gCashPayment(
      amount: number,
      chips: number,
      quantity: number,
      mobileNumber: string,
      type: 'CashIn' | 'Withdrawal',
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

      const newGCashTransaction: GCashTransaction = {
        id: uuidv4(),
        userName: user.username,
        amount,
        date: new Date().toISOString(),
        mobileNumber: mobileNumber,
        type,
      }

      this.gcashPayments.push(newGCashTransaction)
      localStorage.setItem('gCashPayments', JSON.stringify(this.gcashPayments))

      const previousBalance = user.wallet
      const balanceChange = type === 'CashIn' ? +chips * quantity : -chips
      user.wallet += balanceChange
      const newBalance = user.wallet

      localStorage.setItem('registeredUsers', JSON.stringify(registrationStore.registeredUsers))

      const newTransaction: Transaction = {
        id: uuidv4(),
        userName: user.username,
        type: type === 'CashIn' ? 'Cash-in' : 'Withdrawal',
        amount,
        date: new Date().toISOString(),
        method: 'GCash',
        previousBalance,
        newBalance,
      }

      this.transactions.push(newTransaction)
      localStorage.setItem('transactions', JSON.stringify(this.transactions))
    },

    cardPayment(
      amount: number,
      chips: number,
      quantity: number,
      cardNumber: string,
      expiryDate: string,
      securityCode: string,
      type: 'CashIn' | 'Withdrawal',
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
        userName: user.username,
        amount,
        date: new Date().toISOString(),
        cardNumber: cardNumber,
        expiryDate: expiryDate,
        securityCode: securityCode,
        type,
      }

      this.cardPayments.push(newCardTransaction)
      localStorage.setItem('cardPayments', JSON.stringify(this.cardPayments))

      const previousBalance = user.wallet
      const balanceChange = type === 'CashIn' ? +chips * quantity : -chips
      user.wallet += balanceChange
      const newBalance = user.wallet

      localStorage.setItem('registeredUsers', JSON.stringify(registrationStore.registeredUsers))

      const newTransaction: Transaction = {
        id: uuidv4(),
        userName: user.username,
        type: type === 'CashIn' ? 'Cash-in' : 'Withdrawal',
        amount,
        date: new Date().toISOString(),
        method: 'Card',
        previousBalance,
        newBalance,
      }

      this.transactions.push(newTransaction)
      localStorage.setItem('transactions', JSON.stringify(this.transactions))
    },

    withdraw(amount: number, chips: number, method: 'GCash' | 'Card') {
      const authStore = useAuthenticationStore()
      const registrationStore = useRegistrationStore()

      if (!authStore.isLoggedIn) {
        throw new Error('User must be logged in to perform a transaction.')
      }

      if (chips < amount) {
        throw new Error('You dont have enough balance')
      }

      const user = registrationStore.registeredUsers.find((u) => u.email === authStore.user?.email)
      if (!user) {
        throw new Error('User not found.')
      }

      if (user.wallet < chips) {
        throw new Error('Insufficient balance.')
      }

      const newWithdrawTransaction: withdraw = {
        id: Date.now().toString(),
        userName: user.username,
        amount,
        date: new Date().toISOString(),
      }

      this.withdrawTransactions.push(newWithdrawTransaction)
      localStorage.setItem('withdrawTransactions', JSON.stringify(this.withdrawTransactions))

      const previousBalance = user.wallet
      user.wallet -= chips
      const newBalance = user.wallet

      localStorage.setItem('registeredUsers', JSON.stringify(registrationStore.registeredUsers))

      const newTransaction: Transaction = {
        id: uuidv4(),
        userName: user.username,
        type: 'Withdrawal',
        amount,
        date: new Date().toISOString(),
        method: method,
        previousBalance,
        newBalance,
      }

      this.transactions.push(newTransaction)
      localStorage.setItem('transactions', JSON.stringify(this.transactions))
    },
  },
})
