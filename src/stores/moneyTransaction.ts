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
        (transaction) => transaction.userName === authStore.user?.email,
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
      const balanceChange = type === 'CashIn' ? +chips * quantity : -chips
      user.wallet += balanceChange
      localStorage.setItem('registeredUsers', JSON.stringify(registrationStore.registeredUsers))
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
      const balanceChange = type === 'CashIn' ? +chips * quantity : -chips
      user.wallet += balanceChange
      localStorage.setItem('registeredUsers', JSON.stringify(registrationStore.registeredUsers))
    },

    withdraw(amount: number, chips: number) {
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

      user.wallet -= chips
      localStorage.setItem('registeredUsers', JSON.stringify(registrationStore.registeredUsers))
    },
  },

  // addTransaction(
  //   type: 'cash-in' | 'withdrawal',
  //   amount: number,
  //   accountNumber: string,
  //   accountName: string,
  //   method: 'Gcash' | 'Bank Account',
  // ) {
  //   const authStore = useAuthenticationStore()
  //   const registrationStore = useRegistrationStore()

  //   if (!authStore.isLoggedIn) {
  //     throw new Error('User must be logged in to perform a transaction.')
  //   }

  //   const user = registrationStore.registeredUsers.find((u) => u.email === authStore.user?.email)

  //   if (!user) {
  //     throw new Error('User not found.')
  //   }

  //   const MIN_CASH_IN = 100
  //   const MAX_CASH_IN = 10000
  //   const MIN_WITHDRAWAL = 100
  //   const MAX_WITHDRAWAL = 50000

  //   // Validate minimum and maximum cash-in
  //   if (type === 'cash-in') {
  //     if (amount < MIN_CASH_IN) {
  //       throw new Error(`Minimum cash-in amount is ${MIN_CASH_IN}.`)
  //     }
  //     if (amount > MAX_CASH_IN) {
  //       throw new Error(`Maximum cash-in amount is ${MAX_CASH_IN}.`)
  //     }
  //   }

  //   // Validate minimum and maximum withdrawal
  //   if (type === 'withdrawal') {
  //     if (amount < MIN_WITHDRAWAL) {
  //       throw new Error(`Minimum withdrawal amount is ${MIN_WITHDRAWAL}.`)
  //     }
  //     if (amount > MAX_WITHDRAWAL) {
  //       throw new Error(`Maximum withdrawal amount is ${MAX_WITHDRAWAL}.`)
  //     }
  //     if (user.wallet < amount) {
  //       throw new Error('Insufficient balance for withdrawal.')
  //     }
  //   }

  //   const newTransaction: Transaction = {
  //     id: uuidv4(),
  //     userName: user.username,
  //     type,
  //     amount,
  //     date: new Date().toISOString(),
  //     accountNumber,
  //     accountName,
  //     method,
  //   }

  //   this.transactions.push(newTransaction)
  //   localStorage.setItem('transactions', JSON.stringify(this.transactions))

  //   // Update the user's wallet balance
  //   const balanceChange = type === 'cash-in' ? +amount : -amount
  //   user.wallet += balanceChange

  //   // Save updated users to localStorage
  //   localStorage.setItem('registeredUsers', JSON.stringify(registrationStore.registeredUsers))
  // },
})
