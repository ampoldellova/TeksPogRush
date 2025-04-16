<template>
  <div
    :style="{
      backgroundImage: `url(${backgrounds})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh',
      width: '100%',
    }"
  >
    <div
      :style="{
        background: 'linear-gradient(to bottom, black, transparent)',
        height: '100vh',
        width: '100%',
      }"
    ></div>
  </div>
</template>

<script setup lang="ts">
import backgrounds from '@/assets/Background.png'
</script>

<style scoped></style>
