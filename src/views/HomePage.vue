<template>
  <div
    style="
      display: flex;
      align-items: center;
      justify-content: center;
      height: 80vh;
      flex-direction: column;
    "
  >
    <el-image :src="logo" fit="contain" style="width: auto" />

    <el-row :gutter="20" style="width: 50%">
      <el-col :span="12" style="display: flex; align-items: center; justify-content: end">
        <el-button
          size="large"
          :style="{ backgroundColor: COLORS.tertiary, color: 'white' }"
          style="width: 200px"
          >Button</el-button
        >
      </el-col>
      <el-col :span="12" style="display: flex; align-items: center; justify-content: start">
        <el-button
          size="large"
          :style="{ backgroundColor: COLORS.secondary, color: 'white' }"
          style="width: 200px"
        >
          Button
        </el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import logo from '@/assets/TeksPogRush-Logo.png'
import { COLORS } from '@/assets/theme'
</script>

<style scoped></style>
