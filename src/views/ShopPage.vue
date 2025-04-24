<template>
  <div
    :style="{
      background: 'linear-gradient(to bottom, #400e32, black)',
      height: '100vh',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    }"
  >
    <el-row
      :gutter="20"
      style="width: 100%; justify-content: center; align-items: center; margin-bottom: 20px"
    >
      <el-col :span="4.5">
        <el-button
          size="large"
          :style="{
            width: '100%',
            backgroundColor: COLORS.dark,
            borderRadius: '15px',
            fontFamily: 'bold',
            color: 'white',
            borderColor: '#2a2c32',
          }"
          >Common
        </el-button>
      </el-col>
      <el-col :span="4.5">
        <el-button
          size="large"
          :style="{
            width: '100%',
            backgroundColor: COLORS.dark,
            borderRadius: '15px',
            fontFamily: 'bold',
            color: 'white',
            borderColor: '#2a2c32',
          }"
          >Rare
        </el-button>
      </el-col>
      <el-col :span="4.5">
        <el-button
          size="large"
          :style="{
            width: '100%',
            backgroundColor: COLORS.dark,
            borderRadius: '15px',
            fontFamily: 'bold',
            color: 'white',
            borderColor: '#2a2c32',
          }"
          >Epic
        </el-button>
      </el-col>
      <el-col :span="4.5">
        <el-button
          size="large"
          :style="{
            width: '100%',
            backgroundColor: COLORS.dark,
            borderRadius: '15px',
            fontFamily: 'bold',
            color: 'white',
            borderColor: '#2a2c32',
          }"
          >Legendary
        </el-button>
      </el-col>
      <el-col :span="4">
        <el-input
          v-model="search"
          :style="{ width: '100%', backgroundColor: '#C0C0C0', borderRadius: '15px' }"
          placeholder="Search..."
          :input-style="{ fontFamily: 'regular', color: COLORS.dark }"
          :prefix-icon="Search"
        />
      </el-col>
      <el-col :span="2">
        <el-button
          size="large"
          :icon="Sort"
          circle
          :style="{
            backgroundColor: COLORS.dark,
            color: 'white',
            borderColor: '#2a2c32',
          }"
        />
      </el-col>
    </el-row>
    <div style="width: 100%; display: flex; justify-content: center; align-items: center">
      <PogShopCard1 />
      <PogShopCard2 />
      <PogShopCard3 />
      <PogShopCard4 />
    </div>
  </div>
</template>

<script setup lang="ts">
import { COLORS } from '@/assets/theme'
import PogShopCard1 from '@/components/Shop/PogShopCard1.vue'
import PogShopCard2 from '@/components/Shop/PogShopCard2.vue'
import PogShopCard3 from '@/components/Shop/PogShopCard3.vue'
import PogShopCard4 from '@/components/Shop/PogShopCard4.vue'
import { Search, Sort } from '@element-plus/icons-vue'
import { ref } from 'vue'

const search = ref('')
</script>

<style scoped></style>
