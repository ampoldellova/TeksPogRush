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
    <!-- <motion.div
      style="
        width: 220px;
        height: 330px;
        border-width: 2px;
        border-color: #2a2c32;
        border-radius: 15px;
        margin: 10px;
      "
    >
      <el-row>
        <el-col
          :span="24"
          :style="{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',

            background: 'linear-gradient(to bottom, transparent, rgba(239, 176, 7, 0.5))',
          }"
        >
          <el-image
            :src="buy50"
            :style="{ borderRadius: 99, width: '150px', height: '150px' }"
            fit="contain"
          />
        </el-col>
      </el-row>
    </motion.div> -->

    <!-- <el-row
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
    </el-row> -->
    <!-- <div style="width: 100%; display: flex; justify-content: center; align-items: center">
      <PogShopCard1 />
      <PogShopCard2 />
      <PogShopCard3 />
      <PogShopCard4 />
    </div> -->
  </div>
</template>

<script setup lang="ts">
import buy50 from '@/assets/shop/50.png'
import buy150 from '@/assets/shop/150.png'
import buy350 from '@/assets/shop/350.png'
import buy500 from '@/assets/shop/500.png'

import { motion } from 'motion-v'
import { ref } from 'vue'

const search = ref('')
</script>

<style scoped></style>
