<template>
  <div
    style="width: 100%; background-color: #400e32; height: 80px; display: flex; align-items: center"
  >
    <el-row style="padding-left: 2%; padding-right: 2%; width: 100%">
      <el-col :span="12">
        <el-tooltip class="box-item" effect="dark" content="Home Page" placement="bottom">
          <el-image :src="logo" fit="cover" style="height: 60px; width: 100px" />
        </el-tooltip>
      </el-col>
      <el-col :span="12" style="display: flex; align-items: center; justify-content: end">
        <el-tooltip class="box-item" effect="dark" content="Shop" placement="bottom">
          <el-button text :style="{ color: COLORS.quarternary }">Tindahan</el-button>
        </el-tooltip>
        <el-button :style="{ backgroundColor: COLORS.secondary, color: 'white' }" round>
          Sign In
        </el-button>
        <el-button :style="{ backgroundColor: COLORS.secondary, color: 'white' }" round>
          Register
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
