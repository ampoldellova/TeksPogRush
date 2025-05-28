import { defineStore } from 'pinia'
import type { pogWin } from '@/components/models/types'

export const useWinHistoryStore = defineStore('winHistoryStore', {
  state: () => ({
    arenaHistory: JSON.parse(localStorage.getItem('arenaHistory') || '[]'),
    friendlyHistory: JSON.parse(localStorage.getItem('friendlyHistory') || '[]'),
  }),
  actions: {
    addWin(mode: 'arena' | 'friendly', win: pogWin) {
      const currentMode = localStorage.getItem('gameMode') as 'arena' | 'friendly'

      if (mode !== currentMode || !win.winner || win.round == null) {
        console.warn(
          `Ignoring win record: mode=${mode}, currentMode=${currentMode}, round=${win.round}, winner=${win.winner}`,
        )
        return
      }
      if (mode === 'arena') {
        this.arenaHistory.push({ ...win })
        localStorage.setItem('arenaHistory', JSON.stringify(this.arenaHistory))
      } else {
        this.friendlyHistory.push({ ...win })
        localStorage.setItem('friendlyHistory', JSON.stringify(this.friendlyHistory))
      }
    },

    getHistory(mode: 'arena' | 'friendly') {
      return mode === 'arena' ? this.arenaHistory : this.friendlyHistory
    },

    resetWinHistory() {
      this.arenaHistory = []
      this.friendlyHistory = []
      localStorage.removeItem('arenaHistory')
      localStorage.removeItem('friendlyHistory')
      console.log('Win history has been reset')
    },
  },
})
