import { defineStore } from 'pinia'
import { useRegistrationStore } from './userStore'
import { useAuthenticationStore } from './userStore'
import type { Wallet } from '@/components/models/types'
import { v4 as uuidv4 } from 'uuid'

// export interface Wallet {
//   id: string
//   userName: string
//   amount: number
//   date: string
//   accountNumber: string
//   accountName: string
//   bet: number
// }

export const useWalletStore = defineStore('wallet', {
  state: () => ({
    wallet: JSON.parse(localStorage.getItem('wallet') || '[]') as Wallet[],
  }),

  getters: {
    userWalletBalance() {
      const registrationStore = useRegistrationStore()
      const authenticationStore = useAuthenticationStore()

      const user = registrationStore.registeredUsers.find(
        (u) => u.email === authenticationStore.user?.email,
      )

      return user ? user.wallet : 0
    },
  },
  actions: {
    updateUserWalletBalance(amount: number) {
      const registrationStore = useRegistrationStore()
      const authenticationStore = useAuthenticationStore()

      const user = registrationStore.registeredUsers.find(
        (u) => u.email === authenticationStore.user?.email,
      )

      if (user) {
        user.wallet += amount
      }

      const betValue: Wallet = {
        id: authenticationStore.user?.id,
        email: authenticationStore.user?.email || 'Unknown',
        amount: this.userWalletBalance,
        date: new Date().toISOString(),
        accountNumber: '1234567890',
        accountName: authenticationStore.user?.username,
        bet: amount,
      }

      this.wallet.push(betValue)
      localStorage.setItem('wallet', JSON.stringify(this.wallet))
      localStorage.setItem('registeredUsers', JSON.stringify(registrationStore.registeredUsers))
    },
  },
})
