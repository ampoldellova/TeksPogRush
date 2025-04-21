<template>
  <div
    :style="{
      background: 'linear-gradient(to bottom, #400e32, black)',
      height: '100vh',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }"
  >
    <PogShopCard1 />
    <PogShopCard2 />
    <PogShopCard3 />
    <PogShopCard4 />
  </div>
</template>

<script setup lang="ts">
import PogShopCard1 from '@/components/PogShopCard1.vue'
import PogShopCard2 from '@/components/PogShopCard2.vue'
import PogShopCard3 from '@/components/PogShopCard3.vue'
import PogShopCard4 from '@/components/PogShopCard4.vue'
</script>

<style scoped></style>
