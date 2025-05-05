import { defineStore } from 'pinia'
import { useAuthenticationStore } from './userStore'
import { useRegistrationStore } from './userStore'

export interface TokenWallet {
  userEmail: string
  tokenBalance: number
}

export const useTokenStore = defineStore('tokenStore', {
  state: () => ({
    tokenWallets: JSON.parse(localStorage.getItem('tokenWallets') || '[]') as {
      userEmail: string
      tokenBalance: number
    }[],
  }),

  getters: {
    userTokenBalance(): number {
      const authenticationStore = useAuthenticationStore()
      const userEmail = authenticationStore.user?.email

      const userTokenWallet = this.tokenWallets.find((wallet) => wallet.userEmail === userEmail)
      return userTokenWallet ? userTokenWallet.tokenBalance : 0
    },
  },

  actions: {
    updateTokenBalance(userEmail: string, amount: number) {
      let userTokenWallet = this.tokenWallets.find((wallet) => wallet.userEmail === userEmail)
      if (userTokenWallet) {
        userTokenWallet.tokenBalance += amount
      } else {
        this.tokenWallets.push({ userEmail, tokenBalance: amount })
      }
      localStorage.setItem('tokenWallets', JSON.stringify(this.tokenWallets))
    },
  },
})
