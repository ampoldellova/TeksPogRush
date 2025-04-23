<template>
    <el-drawer
    :model-value="isOpen"
    direction="ltr"
    :with-header="false"
    :size="drawerSize"
    :style="{ backgroundColor: COLORS.dark }"
  >
    <el-button
      @click="handleClose"
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
      <el-row style="display: flex; justify-content: center; align-items: center; cursor: pointer">
        <el-icon :style="{ fontSize: '20px', marginRight: '10px', color: 'white' }">
          <House />
        </el-icon>
        <el-text
          :style="{ fontFamily: 'regular', color: 'white', fontSize: '16px', marginTop: '2px' }"
        >
          Home
        </el-text>
      </el-row>

      <el-row style="display: flex; justify-content: center; align-items: center; cursor: pointer">
        <el-icon :style="{ fontSize: '20px', marginRight: '10px', color: 'white' }">
          <SwitchFilled />
        </el-icon>
        <el-text :style="{ fontFamily: 'regular', color: 'white', fontSize: '16px' }">
          Play
        </el-text>
      </el-row>

      <el-row style="display: flex; justify-content: center; align-items: center; cursor: pointer">
        <el-icon :style="{ fontSize: '20px', marginRight: '10px', color: 'white' }">
          <TakeawayBox />
        </el-icon>
        <el-text :style="{ fontFamily: 'regular', color: 'white', fontSize: '16px' }">
          Shop
        </el-text>
      </el-row>

      <el-row style="display: flex; justify-content: center; align-items: center; cursor: pointer">
        <el-icon :style="{ fontSize: '20px', marginRight: '10px', color: 'white' }">
          <CreditCard />
        </el-icon>
        <el-text :style="{ fontFamily: 'regular', color: 'white', fontSize: '16px' }">
          Deposit
        </el-text>
      </el-row>
    </el-row>
  </el-drawer>
</template>

<script setup lang="ts">
import logo from '@/assets/TeksPogRush-Logo-small.png'
import { COLORS } from '@/assets/theme'
import {
  Back,
  Close,
  CreditCard,
  House,
  SwitchFilled,
  TakeawayBox,

} from '@element-plus/icons-vue'
import { onMounted, onUnmounted, ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const drawer = ref(false)

defineProps({
    isOpen : Boolean,
})

const emits = defineEmits(['closeDrawer'])

const handleClose = () => {
    emits('closeDrawer')
}


const drawerSize = ref('300px')

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