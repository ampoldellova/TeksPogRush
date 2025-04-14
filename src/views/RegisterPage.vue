<template>
  <div style="display: flex; justify-content: center; align-items: center; height: 80vh">
    <el-card style="max-width: 480px" shadow="hover">
      <div style="display: flex; align-items: center; justify-content: center">
        <el-image :src="logo" fit="cover" style="height: 110px; width: 200px" />
      </div>

      <el-row style="margin-top: 20px">
        <el-text :style="{ fontFamily: 'bold', color: 'black' }">Username</el-text>
        <el-col :span="24">
          <el-input
            v-model="username"
            style="width: 100%"
            placeholder="Enter your usename"
            input-style="font-family:regular"
          />
        </el-col>
      </el-row>

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

      <el-row style="margin-top: 20px">
        <el-text :style="{ fontFamily: 'bold', color: 'black' }">Contact</el-text>
        <el-col :span="24">
          <el-input
            v-model="contact"
            style="width: 100%"
            placeholder="Enter your contact number"
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

      <el-row style="margin-top: 5px">
        <el-text :style="{ fontFamily: 'bold', color: 'black' }" style="margin-top: 10px">
          Confirm Password
        </el-text>
        <el-col :span="24">
          <el-input
            v-model="confirmPassword"
            style="width: 100%"
            placeholder="Confirm your password"
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
            borderRadius: '5px',
          }"
          style="width: 100%"
        >
          Register
        </el-button>
      </el-row>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import logo from '@/assets/TeksPogRush-Logo-small.png'
import { ref } from 'vue'
import { COLORS } from '@/assets/theme'

const username = ref('')
const email = ref('')
const contact = ref('')
const password = ref('')
const confirmPassword = ref('')
</script>

<style scoped></style>
