<template>
  <div>
    <nav v-if="showNavbar">
      <NavigationBar />
    </nav>
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import NavigationBar from './components/NavigationBar/NavigationBar.vue'
import { ref, watch, onMounted } from 'vue'
import { useAuthenticationStore } from '@/stores/userStore'

const showNavbar = ref(true)
const route = useRoute()
const authenticationStore = useAuthenticationStore()

watch(route, (newRoute) => {
  showNavbar.value = newRoute.name !== 'gamePage'
})

onMounted(() => {
  authenticationStore.checkLoginStatus()
})
</script>

<style scoped></style>
