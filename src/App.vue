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
import { ref, watch } from 'vue'

const showNavbar = ref(true)
const route = useRoute()

watch(route, (newRoute) => {
  showNavbar.value = newRoute.name !== 'gamePage'
})
</script>

<style scoped></style>
