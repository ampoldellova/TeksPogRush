// import { defineStore } from 'pinia'
// import { reactive } from 'vue'
// import { ElMessage } from 'element-plus'

// export const useRegistrationStore = defineStore('registration', {
//   state: () => ({
//     registeredUsers: JSON.parse(localStorage.getItem('registeredUsers') || '[]') as Array<{
//       username: string
//       email: string
//       contact: string
//       password: string
//     }>,
//     ruleForm: reactive({
//       username: '',
//       email: '',
//       contact: '',
//       password: '',
//       confirmPassword: '',
//     }),
//   }),
//   getters: {
//     getUsers: (state) => state.registeredUsers,
//   },
//   actions: {
//     registerUser(formEl: any) {
//       const { username, email, contact, password } = this.ruleForm

//       // Add the new user to the registeredUsers array
//       this.registeredUsers.push({ username, email, contact, password })

//       // Save the updated array to localStorage
//       localStorage.setItem('registeredUsers', JSON.stringify(this.registeredUsers))

//       // Show success message
//       ElMessage({
//         message: 'User registered successfully!',
//         grouping: true,
//         type: 'success',
//       })

//       // Reset the form and validators
//       this.resetForm(formEl)
//     },
//     resetForm(formEl: any) {
//       this.ruleForm.username = ''
//       this.ruleForm.email = ''
//       this.ruleForm.contact = ''
//       this.ruleForm.password = ''
//       this.ruleForm.confirmPassword = ''

//       if (formEl) {
//         formEl.resetFields()
//       }
//     },
//   },
// })

// export const useAuthenticationStore = defineStore('auth', {
//   state: () => ({
//     isLoggedIn: false,
//     user: null as { email: string } | null,
//   }),
//   getters: {
//     isAuthenticated: (state) => state.isLoggedIn,
//     getUserEmail: (state) => state.user?.email || '',
//   },
//   actions: {
//     login(email: string, password: string) {
//       const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]')
//       const user = registeredUsers.find(
//         (u: { email: string; password: string }) => u.email === email && u.password === password,
//       )

//       if (user) {
//         this.isLoggedIn = true
//         this.user = { email: user.email }
//         localStorage.setItem('loginStatus', JSON.stringify({ email: user.email, loggedIn: true }))
//         return { success: true, message: 'Login successful!' }
//       } else {
//         return { success: false, message: 'Invalid email or password!' }
//       }
//     },
//     logout() {
//       this.isLoggedIn = false
//       this.user = null
//       localStorage.removeItem('loginStatus')
//       ElMessage({
//         message: 'Logged out successfully!',
//         grouping: true,
//         type: 'success',
//       })
//     },
//     checkLoginStatus() {
//       const loginStatus = JSON.parse(localStorage.getItem('loginStatus') || '{}')
//       if (loginStatus.loggedIn) {
//         this.isLoggedIn = true
//         this.user = { email: loginStatus.email }
//       } else {
//         this.isLoggedIn = false
//         this.user = null
//       }
//     },
//   },
// })

import { defineStore } from 'pinia'
import { reactive } from 'vue'

export interface userRegistration {
  Id?: string
  username?: string
  email?: string
  contact?: string
  password?: string
  confirmPassword?: string
  balance?: number // New balance field
}

export interface User {
  email: string
  password: string
  balance: number // New balance field
}

export const userRegistration = defineStore('registration', {
  state: () => ({
    users: JSON.parse(localStorage.getItem('users') || '[]') as userRegistration[], // Load users from localStorage
    currentUser: '',
    isLoggedIn: false,

    ruleForm: reactive({
      Id: '',
      username: '',
      email: '',
      contact: '',
      password: '',
      confirmPassword: '',
    }),
  }),

  getters: {
    getUsers: (state) => state.users,
  },

  actions: {
    AddUser() {
      const newUser = {
        ...this.ruleForm,
        Id: crypto.randomUUID(),
        balance: 0, // Initialize balance to 0
      }
      this.users.push(newUser)
    
      localStorage.setItem('users', JSON.stringify(this.users))
    },

    loadUsers() {
      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]')
      this.users = storedUsers.map((user: userRegistration) => ({
        ...user,
        balance: user.balance ?? 0, // Ensure balance is initialized
      }))
    },
  },
})

export const useAuthenticationStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: JSON.parse(localStorage.getItem('loginStatus') || '{}').loggedIn || false,
    user: JSON.parse(localStorage.getItem('loginStatus') || '{}').email
      ? JSON.parse(localStorage.getItem('users') || '[]').find(
          (u: User) => u.email === JSON.parse(localStorage.getItem('loginStatus') || '{}').email,
        )
      : null,
  }),

  getters: {
    isAuthenticated: (state) => state.isLoggedIn,
    getUserEmail: (state) => state.user?.email || '',
   getUserBalance: (state) => state.user?.balance ?? 0, // Default to 0 if balance is undefined
  },

  actions: {
    login(email: string, password: string) {
      const registeredUsers = JSON.parse(localStorage.getItem('users') || '[]')
      const user = registeredUsers.find(
        (u: User) => u.email === email && u.password === password,
      )
      if (user) {
        this.isLoggedIn = true
        this.user = { ...user, balance: user.balance ?? 0 } // Ensure balance is initialized
        localStorage.setItem('loginStatus', JSON.stringify({ email: user.email, loggedIn: true }))
        return { success: true, message: 'Login successful!' }
      } else {
        return { success: false, message: 'Invalid email or password!' }
      }
    },

    logout() {
      this.isLoggedIn = false
      this.user = null
      localStorage.removeItem('loginStatus')
    },

    checkLoginStatus() {
      const loginStatus = JSON.parse(localStorage.getItem('loginStatus') || '{}')
      if (loginStatus.loggedIn) {
        this.isLoggedIn = true
        this.user = JSON.parse(localStorage.getItem('users') || '[]').find(
          (u: User) => u.email === loginStatus.email,
        )
      } else {
        this.isLoggedIn = false
        this.user = null
      }
    },

    updateBalance(amount: number) {
      if (this.user) {
        this.user.balance = (this.user.balance ?? 0) + amount // Ensure balance is initialized
        const users = JSON.parse(localStorage.getItem('users') || '[]')
        const userIndex = users.findIndex((u: User) => u.email === this.user?.email)
        if (userIndex !== -1) {
          users[userIndex].balance = this.user.balance
          localStorage.setItem('users', JSON.stringify(users)) // Save updated balance to localStorage
        }
      }
    },
  },
})