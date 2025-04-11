import ForgotPasswordPage from '@/views/ForgotPasswordPage.vue'
import HomePage from '@/views/HomePage.vue'
import RegisterPage from '@/views/RegisterPage.vue'
import SignInPage from '@/views/SignInPage.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/signIn',
      name: 'signIn',
      component: SignInPage,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPage,
    },
    {
      path: '/forgot-password',
      name: 'forgotPassword',
      component: ForgotPasswordPage,
    },
  ],
})

export default router
