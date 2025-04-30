import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { v4 as uuidv4 } from 'uuid'
import type { userRegistrationStore } from '@/components/models/types'

//Nilagay sa models folder
// export interface useRegistrationStore {
//   id: string
//   username: string
//   email: string
//   contact: string
//   password: string
//   wallet: number
// }

// const ruleForm = reactive ({
//   username: '',
//   email: '',
//   contact: '',
//   password: '',
//   confirmPassword: '',
// })

//Nilagay ko sa register Dialog sinceyung pagstructure ng SignIn is ganu yung process

export const useRegistrationStore = defineStore('registration', {
  state: () => ({
    registeredUsers: JSON.parse(localStorage.getItem('registeredUsers') || '[]') as userRegistrationStore []
    
  }),
  getters: {
    getUsers: (state) => state.registeredUsers,
  },
  actions: {
    registerUser(userData: userRegistrationStore) {
      const { username, email, contact, password, confirmPassword} = userData

      const id = uuidv4()
      const wallet = 0
      this.registeredUsers.push({ id, username, email, contact, password, confirmPassword, wallet })
      localStorage.setItem('registeredUsers', JSON.stringify(this.registeredUsers))

      ElMessage({
        message: 'User registered successfully!',
        grouping: true,
        type: 'success',
      })
      // this.resetForm(formEl)
    },
    // resetForm(formEl: any) {
    //   ruleForm.username = ''
    //   ruleForm.email = ''
    //   ruleForm.contact = ''
    //   ruleForm.password = ''
    //   ruleForm.confirmPassword = ''

    //   if (formEl) {
    //     formEl.resetFields()
    //   }
    // },

    //there is a built in reset form in that I put in register Dialog
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
    user: ref<{ id:string; email: string; wallet: number; username: string} | null>(null),
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
      console.log(user)

      if (user) {
        this.isLoggedIn = true
        this.user = { id: user.id, username: user.username, email: user.email, wallet: user.wallet }
        localStorage.setItem(
          'loginStatus',
          JSON.stringify({ id: user.id, username: user.username, email: user.email, wallet: user.wallet, loggedIn: true }),
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
        this.user = {id: loginStatus.id, username: loginStatus.username, email: loginStatus.email, wallet: loginStatus.wallet } 
        console.log(this.user)
        console.log(loginStatus)
      } else {
        this.isLoggedIn = false
        this.user = null
      }
    },
  },
})
