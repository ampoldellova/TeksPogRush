import { defineStore } from 'pinia'

export interface pogWin {
  round?:number
  winner?:string
}

export const useWinHistoryStore = defineStore('winHistory', {
  state: () => ({
    history: JSON.parse(localStorage.getItem('winHistory') || '[]'),
    win: JSON.parse(localStorage.getItem('PogWinHistory') || 'null')
  }),
  actions: {
    addWin({round, winner}:pogWin) {
      this.history.push({ round, winner });
      this.win = { round, winner };
      localStorage.setItem('winHistory', JSON.stringify(this.history));
      localStorage.setItem('PogWinHistory', JSON.stringify(this.win));
    },
    clearHistory() {
      this.history = [];
      this.win = null;
      localStorage.removeItem('winHistory');
      localStorage.removeItem('PogWinHistory');
    },
    persistPogWinHistory() {
      localStorage.setItem('winHistory', JSON.stringify(this.history));
      localStorage.setItem('PogWinHistory', JSON.stringify(this.win));
    }
  }
});

