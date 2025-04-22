import ForgotPasswordPage from '@/views/ForgotPasswordPage.vue'
import HomePage from '@/views/HomePage.vue'
import PlayPage from '@/views/PlayPage.vue'
import ShopPage from '@/views/ShopPage.vue'
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
      path: '/forgot-password',
      name: 'forgotPassword',
      component: ForgotPasswordPage,
    },
    {
      path: '/play',
      name: 'play',
      component: PlayPage,
    },
    {
      path: '/shop',
      name: 'shop',
      component: ShopPage,
    },
  ],
})

export default router
