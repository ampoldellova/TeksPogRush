import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { ElMessage } from 'element-plus'

export const useRegistrationStore = defineStore('registration', {
  state: () => ({
    registeredUsers: JSON.parse(localStorage.getItem('registeredUsers') || '[]') as Array<{
      username: string
      email: string
      contact: string
      password: string
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

      // Add the new user to the registeredUsers array
      this.registeredUsers.push({ username, email, contact, password })

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
  },
})
