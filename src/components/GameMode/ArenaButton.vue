<template>
  <el-col
    :xs="24"
    :sm="24"
    :md="12"
    :lg="12"
    :xl="12"
    style="display: flex; justify-content: center; align-items: center"
  >
    <el-popover
      class="box-item"
      title="Battle Arena"
      content="Battle Arena is a game mode where you can compete for chips. It's a great way to test your skills and earn rewards!"
      placement="top"
      width="300"
    >
      <template #reference>
        <motion.button
          @click="emit('buttonClick')"
          :whileHover="{
            scale: 1.2,
            transition: { duration: 0.3 },
          }"
          :whilePress="{ scale: 0.9 }"
          :style="{
            fontFamily: 'bold',
            width: '200px',
            backgroundColor: '#ffd200',
            color: 'black',
            borderWidth: 0,
            height: '50px',
            borderRadius: '15px',
            cursor: 'pointer',
            boxShadow: '5px 8px 0px 1px rgba(0, 0, 0, 1)',
            margin: '20px',
          }"
        >
          A R E N A
        </motion.button>
      </template>
    </el-popover>
  </el-col>
</template>

<script setup lang="ts">
import { motion } from 'motion-v'

const emit = defineEmits(['buttonClick'])
</script>

<style scoped></style>
