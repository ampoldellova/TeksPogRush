<template>
  <motion.div
    style="
      width: 220px;
      height: 330px;
      border-width: 2px;
      border-color: #2a2c32;
      border-radius: 15px;
      display: inline-block;
      margin: 10px;
    "
    @mouseover="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <el-row :style="rowStyle">
      <el-image
        :src="buy350"
        :style="{ borderRadius: 99, width: '150px', height: '150px' }"
        fit="contain"
      />
    </el-row>

    <el-row :style="bottomRowStyle">
      <el-col :span="24">
        <el-row>
          <el-col :span="24">
            <el-text :style="{ fontFamily: 'regular', color: 'white' }">003 | 350 Chips</el-text>
          </el-col>
          <el-col :span="24">
            <el-text :style="{ fontFamily: 'bold', color: '#f2cd5c' }">Php.</el-text>
            <el-text :style="{ fontFamily: 'bold', color: 'white', marginLeft: '3px' }"
              >400.00</el-text
            >
          </el-col>
        </el-row>
      </el-col>

      <!-- <el-col :span="6">
        <el-row>
          <el-image :src="legendary" :style="{ width: '45px', height: '40px' }" />
        </el-row>
      </el-col> -->

      <el-col :span="24" style="margin-top: 5px">
        <el-button :style="buyButton">Buy Now</el-button>
      </el-col>
    </el-row>
  </motion.div>
</template>

<script setup lang="ts">
import buy350 from '@/assets/shop/350.png'
import legendary from '@/assets/rarities/Legendary.png'
import { motion } from 'motion-v'
import { computed, ref } from 'vue'

const isHovered = ref(false)

const rowStyle = computed(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: isHovered.value ? '65%' : '80%',
  background: isHovered.value
    ? 'linear-gradient(to bottom, #141414, rgba(19, 49, 96, 1))'
    : 'linear-gradient(to bottom, #141414, rgba(19, 49, 96, 0.5))',
  borderTopRightRadius: '15px',
  borderTopLeftRadius: '15px',
  transition: 'height 0.7s ease, background 0.5s ease',
}))

const bottomRowStyle = computed(() => ({
  height: isHovered.value ? '35%' : '20%',
  backgroundColor: '#141414',
  borderBottomRightRadius: '15px',
  borderBottomLeftRadius: '15px',
  padding: '10px',
  transition: 'height 0.7s ease',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}))

const buyButton = computed(() => ({
  display: isHovered.value ? 'flex' : 'none',
  width: '100%',
  background: 'linear-gradient(to right, #f2cd5c, #f2921d',
  borderWidth: 0,
  fontFamily: 'semiBold',
  color: 'white',
  borderRadius: '10px',
  transition: 'display 0.7s ease, opacity 0.7s ease',
}))
</script>

<style scoped></style>
