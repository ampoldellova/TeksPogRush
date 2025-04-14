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

    <el-image :src="star" fit="contain" class="star star1 spin" />
    <el-image :src="star" fit="contain" class="star star2 spin" />
    <el-image :src="star" fit="contain" class="star star3 spin" />

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
import logo from '@/assets/TeksPogRush.png'
import star from '@/assets/star.png'
import { COLORS } from '@/assets/theme'
</script>

<style scoped>
.star {
  position: absolute;
  height: 8%;
}

.star1 {
  right: 37%;
  bottom: 44%;
}

.star2 {
  left: 35%;
  bottom: 40%;
}

.star3 {
  bottom: 30%;
}

@media (max-width: 1600px) {
  .star1 {
    right: 35%;
    bottom: 44%;
  }

  .star2 {
    left: 33%;
    bottom: 40%;
  }

  .star3 {
    bottom: 30%;
  }
}

@media (max-width: 1500px) {
  .star1 {
    right: 33%;
    bottom: 44%;
  }

  .star2 {
    left: 31%;
    bottom: 40%;
  }

  .star3 {
    bottom: 30%;
  }
}

@media (max-width: 1400px) {
  .star1 {
    right: 33%;
    bottom: 44%;
  }

  .star2 {
    left: 30%;
    bottom: 40%;
  }

  .star3 {
    bottom: 30%;
  }
}

@media (max-width: 1300px) {
  .star1 {
    right: 33%;
    bottom: 44%;
  }

  .star2 {
    left: 28%;
    bottom: 40%;
  }

  .star3 {
    bottom: 30%;
  }
}

@media (max-width: 1200px) {
  .star1 {
    right: 31%;
    bottom: 44%;
  }

  .star2 {
    left: 27%;
    bottom: 40%;
  }

  .star3 {
    bottom: 30%;
  }
}

@media (max-width: 1100px) {
  .star1 {
    right: 28%;
    bottom: 44%;
  }

  .star2 {
    left: 24%;
    bottom: 41%;
  }

  .star3 {
    bottom: 30%;
  }
}

@media (max-width: 1000px) {
  .star1 {
    right: 25%;
    bottom: 44%;
  }

  .star2 {
    left: 22%;
    bottom: 40%;
  }

  .star3 {
    bottom: 30%;
  }
}

@media (max-width: 900px) {
  .star1 {
    right: 23%;
    bottom: 44%;
  }

  .star2 {
    left: 19%;
    bottom: 40%;
  }

  .star3 {
    bottom: 30%;
  }
}

@media (max-width: 800px) {
  .star1 {
    right: 22%;
    bottom: 44%;
  }

  .star2 {
    left: 15%;
    bottom: 40%;
  }

  .star3 {
    bottom: 30%;
  }
}

@media (max-width: 700px) {
  .star1 {
    right: 18%;
    bottom: 44%;
  }

  .star2 {
    left: 11%;
    bottom: 40%;
  }

  .star3 {
    bottom: 31%;
  }
}

@media (max-width: 600px) {
  .star1 {
    right: 17%;
    bottom: 47%;
    height: 5%;
  }

  .star2 {
    left: 10%;
    bottom: 44%;
    height: 5%;
  }

  .star3 {
    bottom: 35%;
    height: 5%;
  }
}

.spin {
  animation: spin 2s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
