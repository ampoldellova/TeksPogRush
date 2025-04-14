<template>
  <div
    style="width: 100%; background-color: #400e32; height: 10vh; display: flex; align-items: center"
  >
    <el-row style="padding-left: 2%; padding-right: 2%; width: 100%">
      <el-col :span="12">
        <el-tooltip class="box-item" effect="dark" content="Home Page" placement="bottom">
          <RouterLink to="/">
            <el-image :src="logo" fit="cover" style="height: 60px; width: 100px" />
          </RouterLink>
        </el-tooltip>
      </el-col>

      <el-col :span="12" style="display: flex; align-items: center; justify-content: end">
        <el-tooltip class="box-item" effect="dark" content="Shop" placement="bottom">
          <el-button
            text
            :style="{ color: COLORS.quarternary, fontFamily: 'regular' }"
            style="margin-right: 10px"
          >
            Tindahan
          </el-button>
        </el-tooltip>

        <RouterLink to="/signIn" style="margin-right: 5px">
          <el-button
            :style="{
              backgroundColor: COLORS.secondary,
              color: 'white',
              fontFamily: 'regular',
            }"
            round
          >
            Sign In
          </el-button>
        </RouterLink>

        <RouterLink to="/register" style="margin-right: 5px">
          <el-button
            :style="{
              backgroundColor: COLORS.secondary,
              color: 'white',
              fontFamily: 'regular',
            }"
            round
          >
            Register
          </el-button>
        </RouterLink>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import logo from '@/assets/TeksPogRush-Logo-small.png'
import { COLORS } from '@/assets/theme'
</script>

<style scoped></style>
