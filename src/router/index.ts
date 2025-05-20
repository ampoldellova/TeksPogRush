import WalletDialog from '@/components/NavigationBar/WalletDialog.vue'

import FriendlyPlayPage from '@/views/FriendlyPlayPage.vue'
import GameMode from '@/views/GameMode.vue'
import HomePage from '@/views/HomePage.vue'
import PlayPage from '@/views/PlayPage.vue'
import ProfilePage from '@/views/ProfilePage.vue'
import ShopPage from '@/views/ShopPage.vue'
import { Wallet } from '@element-plus/icons-vue'
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthenticationStore } from '@/stores/userStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/play',
      name: 'play',
      component: GameMode,
    },
    {
      path: '/arena',
      name: 'arena',
      component: PlayPage,
    },
    {
      path: '/friendly-arena',
      name: 'friendlyArena',
      component: FriendlyPlayPage,
    },
    {
      path: '/shop',
      name: 'shop',
      component: ShopPage,
    },
    {
      path: '/wallet',
      name: 'wallet',
      component: WalletDialog,
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfilePage,
    },
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthenticationStore()
  const protectedRoutes = ['/arena', '/shop', '/wallet', '/profile']

  if (protectedRoutes.includes(to.path) && !authStore.isAuthenticated) {
    next('/')
  } else {
    next()
  }
})

export default router
