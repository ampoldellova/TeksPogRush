import { defineStore } from 'pinia'
import type { pogWin } from '@/components/models/types'

export const useWinHistoryStore = defineStore('winHistoryStore', {
  state: () => ({
    arenaHistory: JSON.parse(localStorage.getItem('arenaHistory') || '[]'),
    friendlyHistory: JSON.parse(localStorage.getItem('friendlyHistory') || '[]'),
  }),
  actions: {
    addWin(mode: 'arena' | 'friendly', { round, winner }: pogWin) {
      if (mode === 'arena') {
        this.arenaHistory.push({ round, winner })
        localStorage.setItem('arenaHistory', JSON.stringify(this.arenaHistory))
      } else {
        this.friendlyHistory.push({ round, winner })
        localStorage.setItem('friendlyHistory', JSON.stringify(this.friendlyHistory))
      }
    },
    // clearHistory(mode: 'arena' | 'friendly') {
    //   if (mode === 'arena') {
    //     this.arenaHistory = []
    //     localStorage.removeItem('arenaHistory')
    //   } else {
    //     this.friendlyHistory = []
    //     localStorage.removeItem('friendlyHistory')
    //   }
    // },
    // persistPogWinHistory(mode: 'arena' | 'friendly') {
    //   if (mode === 'arena') {
    //     localStorage.setItem('arenaHistory', JSON.stringify(this.arenaHistory))
    //   } else {
    //     localStorage.setItem('friendlyHistory', JSON.stringify(this.friendlyHistory))
    //   }
    // },
    getHistory(mode: 'arena' | 'friendly') {
      return mode === 'arena' ? this.arenaHistory : this.friendlyHistory
    },
  },
})
