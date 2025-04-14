<template>
  <div style="display: flex; justify-content: center; align-items: center; height: 80vh">
    <el-card style="max-width: 480px" shadow="hover">
      <div style="display: flex; align-items: center; justify-content: center">
        <el-image :src="logo" fit="cover" style="height: 110px; width: 200px" />
      </div>

      <el-row style="margin-top: 20px">
        <el-text :style="{ fontFamily: 'bold', color: 'black' }">Email</el-text>
        <el-col :span="24">
          <el-input
            v-model="email"
            style="width: 100%"
            placeholder="Enter your email"
            input-style="font-family:regular"
          />
        </el-col>
      </el-row>

      <el-row style="margin-top: 5px">
        <el-text :style="{ fontFamily: 'bold', color: 'black' }" style="margin-top: 10px">
          Password
        </el-text>
        <el-col :span="24">
          <el-input
            v-model="password"
            style="width: 100%"
            placeholder="Enter your password"
            input-style="font-family:regular"
            type="password"
            show-password
          />
        </el-col>
      </el-row>

      <el-row style="margin-top: 20px">
        <el-button
          :style="{
            backgroundColor: COLORS.dark,
            fontFamily: 'semiBold',
            color: 'white',
            borderRadius: '10px',
          }"
          style="width: 100%"
        >
          Sign In
        </el-button>
      </el-row>

      <el-row :gutter="10" style="margin-top: 10px">
        <el-col :span="12">
          <el-button
            width="100%"
            :style="{
              fontFamily: 'regular',
              color: 'white',
              fontSize: '12px',
              backgroundColor: COLORS.secondary,
              borderRadius: '10px',
            }"
            style="width: 100%"
          >
            <RouterLink to="/register" style="color: white"> Register </RouterLink>
          </el-button>
        </el-col>

        <el-col :span="12">
          <el-button
            width="100%"
            :style="{
              fontFamily: 'regular',
              color: 'white',
              fontSize: '12px',
              backgroundColor: COLORS.secondary,
              borderRadius: '10px',
            }"
            style="width: 100%"
          >
            <RouterLink to="/forgot-password" style="color: white"> Reset Password </RouterLink>
          </el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import logo from '@/assets/TeksPogRush-Logo-small.png'
import { ref } from 'vue'
import { COLORS } from '@/assets/theme'

const email = ref('')
const password = ref('')
</script>

<style scoped></style>
