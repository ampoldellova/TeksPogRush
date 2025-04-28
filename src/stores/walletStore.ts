import { defineStore } from 'pinia'
import { useRegistrationStore } from './userStore'
import { useAuthenticationStore } from './userStore'

export const useWalletStore = defineStore('wallet', {
  state: () => ({
    wallet: JSON.parse(localStorage.getItem('wallet') || '[]') as number[],
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
    },
  },
})
