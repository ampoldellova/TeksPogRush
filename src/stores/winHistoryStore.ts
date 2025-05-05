import { defineStore } from 'pinia'

export const useWinHistoryStore = defineStore('winHistory', {
  state: () => ({
    history: [] as { round: number; winner: string }[],
  }),
  actions: {
    addWin(round: number, winner: string) {
      this.history.push({ round, winner })
    },
    clearHistory() {
      this.history = []
    },
  },
})
