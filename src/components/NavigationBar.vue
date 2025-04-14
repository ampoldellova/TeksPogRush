<template>
  <div
    style="
      width: 100%;
      background-color: #400e32;
      height: 10vh;
      display: flex;
      align-items: center;
      justify-content: space-between;
    "
  >
    <el-row style="padding-left: 2%; padding-right: 2%; width: 100%">
      <el-col :span="8" style="display: flex; justify-content: start; align-items: center">
        <el-button size="large" color="#A61F69" :icon="Menu" circle />
      </el-col>

      <el-col :span="8" style="display: flex; justify-content: center; align-items: center">
        <RouterLink to="/">
          <el-image :src="logo" fit="cover" style="height: 10vh; width: 150px" />
        </RouterLink>
      </el-col>

      <el-col :span="8" class="responsive-button">
        <el-tooltip class="box-item" effect="dark" content="Shop" placement="bottom">
          <el-text
            :style="{ color: COLORS.quarternary, fontFamily: 'regular', cursor: 'pointer' }"
            style="margin-right: 30px"
          >
            Tindahan
          </el-text>
        </el-tooltip>

        <RouterLink to="/signIn" style="margin-right: 5px">
          <el-button
            size="large"
            color="#A61F69"
            :style="{
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
            size="large"
            color="#A61F69"
            :style="{
              color: 'white',
              fontFamily: 'regular',
            }"
            round
          >
            Register
          </el-button>
        </RouterLink>
      </el-col>

      <el-col :span="8" class="responsive-menu">
        <RouterLink to="/signIn" style="margin-right: 5px">
          <el-button
            size="large"
            color="#A61F69"
            :style="{
              color: 'white',
              fontFamily: 'regular',
            }"
            round
          >
            Sign In
          </el-button>
        </RouterLink>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import logo from '@/assets/TeksPogRush-Logo-small.png'
import { COLORS } from '@/assets/theme'
import { Menu } from '@element-plus/icons-vue'
</script>

<style scoped>
.responsive-button {
  display: flex;
  align-items: center;
  justify-content: end;
}

.responsive-menu {
  display: none;
}

@media (max-width: 800px) {
  .responsive-button {
    display: none;
  }
  .responsive-menu {
    display: flex;
    align-items: center;
    justify-content: end;
  }
}
</style>
