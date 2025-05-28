export interface Transaction {
  id: string
  userName: string
  type: 'Cash-in' | 'Withdrawal'
  amount: number
  date: string
  accountNumber?: string
  accountName?: string
  method: 'GCash' | 'Bank Account' | 'Card' | 'Wallet'
  previousBalance: number
  newBalance: number
}

export interface GCashTransaction {
  id: string
  userName: string
  amount: number
  date: string
  mobileNumber: string
  type: 'CashIn' | 'Withdrawal'
}

export interface CardTransaction {
  id?: string
  userName?: string
  amount?: number
  date?: string
  cardNumber?: string

  expiryDate: string
  securityCode: string
  type?: 'CashIn' | 'Withdrawal'
}

export interface userRegistrationStore {
  id: string
  username: string
  email: string
  contact: string
  password: string
  confirmPassword: string
  wallet: number
}

export interface Wallet {
  id?: string
  email: string
  amount: number
  date: string
  accountNumber: string
  accountName?: string
  bet: number
}

export interface withdraw {
  id: string
  amount: number
  userName: string
  date: string
}

export interface chipsTypes {
  src?: string
  animation?: {}
  value: number
  action: () => {}
}

export interface registerForm {
  id: string
  username: string
  email: string
  contact: string
  password: string
  confirmPassword: string
  wallet: number
}

export interface loginForm {
  signInEmail: string
  signInPassword: string
}
export interface Bet {
  type: 'Pog1' | 'Equalizer' | 'Pog2'
  value: number
}

export interface pogWin {
  round?: number
  winner?: string
  total?: number
  totalBet?: number
  result?: {
    pog1: string
    equalizer: string
    pog2: string
  }
  dateTime?: string
  amount?: number
}

export interface TokenWallet {
  userEmail: string
  tokenBalance: number
}

export interface cartItem {
  id: string
  quantity: number
}
