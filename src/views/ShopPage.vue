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
    <div v-for="chip in chips">
      <PogShopCard :chip="chip" />
    </div>
  </div>
</template>

<script setup lang="ts">
import PogShopCard from '@/components/Shop/PogShopCard.vue'
import buy50 from '@/assets/shop/50.png'
import buy150 from '@/assets/shop/150.png'
import buy350 from '@/assets/shop/350.png'
import buy500 from '@/assets/shop/500.png'
import { ref } from 'vue'

const chips = ref([
  {
    id: '001',
    name: '50 Chips',
    price: 100,
    image: buy50,
  },
  {
    id: '002',
    name: '150 Chips',
    price: 150,
    image: buy150,
  },
  {
    id: '003',
    name: '350 Chips',
    price: 350,
    image: buy350,
  },
  {
    id: '004',
    name: '500 Chips',
    price: 500,
    image: buy500,
  },
])
</script>

<style scoped></style>
