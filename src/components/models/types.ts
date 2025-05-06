export interface Transaction {
    id: string
    userName: string
    type: 'cash-in' | 'withdrawal'
    amount: number
    date: string
    accountNumber: string
    accountName: string
    method: 'Gcash' | 'Bank Account'
  }
  
  export interface GCashTransaction {
    id: string
    userName: string
    amount: number
    date: string
    mobileNumber: string
    type: 'CashIn'| 'Withdrawal'
  }
  
  export interface CardTransaction {
    id: string
    userName: string
    amount: number
    date: string
    cardNumber: string
    expiryDate: string
    securityCode: string
    type: 'CashIn'| 'Withdrawal'

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

  export interface withdraw{
    id: string
    amount: number
    userName: string
    date: string
  }

  export interface chipsTypes{
    src?: string
    animation?: {}
    value: number
    action: () => {}
  }

  export interface pogWin {
    round?:number
    winner?:string
  }
  
  