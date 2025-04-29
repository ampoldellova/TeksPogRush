import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { v4 as uuidv4 } from 'uuid' // Import UUID library for unique ID generation
import router from '@/router'

export const useRegistrationStore = defineStore('registration', {
  state: () => ({
    registeredUsers: JSON.parse(localStorage.getItem('registeredUsers') || '[]') as Array<{
      id: string
      username: string
      email: string
      contact: string
      password: string
      wallet: number
    }>,
    ruleForm: reactive({
      username: '',
      email: '',
      contact: '',
      password: '',
      confirmPassword: '',
    }),
  }),
  getters: {
    getUsers: (state) => state.registeredUsers,
  },
  actions: {
    registerUser(formEl: any) {
      const { username, email, contact, password } = this.ruleForm

      // Generate a unique ID for the user
      const id = uuidv4()

      // Initialize wallet balance to 0
      const wallet = 0

      // Add the new user to the registeredUsers array
      this.registeredUsers.push({ id, username, email, contact, password, wallet })

      // Save the updated array to localStorage
      localStorage.setItem('registeredUsers', JSON.stringify(this.registeredUsers))

      // Show success message
      ElMessage({
        message: 'User registered successfully!',
        grouping: true,
        type: 'success',
      })
      // Reset the form and validators
      this.resetForm(formEl)
    },
    resetForm(formEl: any) {
      this.ruleForm.username = ''
      this.ruleForm.email = ''
      this.ruleForm.contact = ''
      this.ruleForm.password = ''
      this.ruleForm.confirmPassword = ''

      if (formEl) {
        formEl.resetFields()
      }
    },
    logUserWallets() {
      this.registeredUsers.forEach((user) => {
        console.log(`User: ${user.username}, Wallet: ${user.wallet}`)
      })
    },
  },
})

export const useAuthenticationStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false,
    user: ref<{ email: string; wallet: number } | null>(null),
  }),
  getters: {
    isAuthenticated: (state) => state.isLoggedIn,
    getUserEmail: (state) => state.user?.email || '',
  },
  actions: {
    login(email: string, password: string) {
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]')
      const user = registeredUsers.find(
        (u: { email: string; password: string }) => u.email === email && u.password === password,
      )

      if (user) {
        this.isLoggedIn = true
        this.user = { email: user.email, wallet: user.wallet } // Include wallet property
        localStorage.setItem(
          'loginStatus',
          JSON.stringify({ email: user.email, wallet: user.wallet, loggedIn: true }),
        )
        return { success: true, message: 'Login successful!' }
      } else {
        return { success: false, message: 'Invalid email or password!' }
      }
    },
    logout() {
      this.isLoggedIn = false
      this.user = null
      localStorage.removeItem('loginStatus')
      ElMessage({
        message: 'Logged out successfully!',
        grouping: true,
        type: 'success',
      })
    },
    checkLoginStatus() {
      const loginStatus = JSON.parse(localStorage.getItem('loginStatus') || '{}')
      if (loginStatus.loggedIn) {
        this.isLoggedIn = true
        this.user = { email: loginStatus.email, wallet: loginStatus.wallet }
      } else {
        this.isLoggedIn = false
        this.user = null
      }
    },
  },
})
