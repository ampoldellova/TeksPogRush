<template>
  <el-drawer
    v-model="drawer"
    direction="ltr"
    :with-header="false"
    :size="drawerSize"
    :style="{ backgroundColor: COLORS.dark }"
  >
    <el-button
      @click="closeDrawer"
      :icon="Close"
      circle
      :style="{ backgroundColor: 'transparent', borderWidth: 0, color: 'white', fontSize: '1rem' }"
      style="position: absolute; z-index: 1"
    />

    <el-row style="display: flex; justify-content: center; align-items: center; margin-top: 30px">
      <el-image :src="logo" fit="cover" style="height: 140px; width: 180px; margin-top: -20px" />
    </el-row>

    <el-row
      style="
        display: flex;
        flex-direction: column;
        gap: 20px;
        justify-content: center;
        align-items: center;
        margin-top: 20px;
      "
    >
      <DrawerNavItem label="Home" :icon="House" :onclick="() => navigateTo('/')" />
      <DrawerNavItem
        v-if="authenticationStore.isAuthenticated"
        label="Shop"
        :icon="TakeawayBox"
        :onclick="() => navigateTo('/shop')"
      />
      <DrawerNavItem
        v-if="!authenticationStore.isAuthenticated"
        label="Login"
        :icon="ArrowRight"
        :onclick="() => emit('loginDialog')"
      />
      <DrawerNavItem
        v-if="!authenticationStore.isAuthenticated"
        label="Register"
        :icon="Document"
        :onclick="() => emit('registerDialog')"
      />
      <DrawerNavItem
        v-if="authenticationStore.isAuthenticated"
        label="Logout"
        :icon="ArrowLeft"
        :onclick="() => authenticationStore.logout()"
      />
    </el-row>
  </el-drawer>
</template>

<script setup lang="ts">
import { COLORS } from '@/assets/theme'
import logo from '@/assets/TeksPogRush-Logo-small.png'
import {
  Close,
  ArrowLeft,
  House,
  SwitchFilled,
  TakeawayBox,
  ArrowRight,
  Document,
} from '@element-plus/icons-vue'
import { onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthenticationStore } from '@/stores/userStore'
import DrawerNavItem from './DrawerNavItem.vue'

const authenticationStore = useAuthenticationStore()
const drawer = ref(false)
const drawerSize = ref('300px')

const emit = defineEmits(['closeDrawer', 'logout', 'loginDialog', 'registerDialog'])
const router = useRouter()

const updateDrawerSize = () => {
  const width = window.innerWidth
  if (width < 768) {
    drawerSize.value = '100%'
  } else if (width < 992) {
    drawerSize.value = '300px'
  } else if (width < 1200) {
    drawerSize.value = '300px'
  } else {
    drawerSize.value = '300px'
  }
}

const closeDrawer = () => {
  emit('closeDrawer')
}

const navigateTo = (path: string) => {
  router.push(path)
  closeDrawer()
}

onMounted(() => {
  updateDrawerSize()
  window.addEventListener('resize', updateDrawerSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateDrawerSize)
})
</script>

<style scoped></style>
