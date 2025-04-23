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

import {defineStore} from 'pinia'
import { reactive } from 'vue'

export interface userRegistration {
  Id?:string
  username?: string
  email?: string
  contact?: string
  password?: string
  confirmPassword?:string
}



export const userRegistration = defineStore('registration', {
  state: () => ({
    users: [] as userRegistration[],
    currentUser: '',
    isLoggedIn: false,

    ruleForm: reactive({
      Id:'',
      username: '',
      email: '',
      contact: '',
      password: '',
      confirmPassword: '',
    }),
  }),
  

  actions: {
    AddUser(){      
      this.users.push({
        ...this.ruleForm, Id:crypto.randomUUID(),

      })
    }
  }
})