<template>
  <el-drawer
    v-model="cartDrawer"
    direction="rtl"
    :with-header="false"
    :size="drawerSize"
    :style="{ backgroundColor: COLORS.dark }"
  >
    <el-button
      @click="emit('closeDrawer')"
      :icon="Close"
      circle
      :style="{ backgroundColor: 'transparent', borderWidth: 0, color: 'white', fontSize: '1rem' }"
      style="position: absolute; z-index: 1"
    />
    <el-row style="display: flex; justify-content: center; align-items: center; margin-top: 30px">
      <el-image
        :src="cartLogo"
        fit="cover"
        style="height: 140px; width: 180px; margin-top: -20px"
      />
    </el-row>
  </el-drawer>
</template>

<script setup lang="ts">
import cartLogo from '@/assets/cart/yourCart.png'
import { COLORS } from '@/assets/theme'
import { Close } from '@element-plus/icons-vue'
import { onMounted, onUnmounted, ref } from 'vue'

const cartDrawer = ref(false)
const drawerSize = ref('300px')
const emit = defineEmits(['closeDrawer'])

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

onMounted(() => {
  updateDrawerSize()
  window.addEventListener('resize', updateDrawerSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateDrawerSize)
})
</script>

<style scoped></style>
