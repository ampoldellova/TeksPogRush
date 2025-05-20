<template>
  <el-row
    @click="handleClick"
    style="display: flex; justify-content: center; align-items: center; cursor: pointer"
  >
    <el-icon :style="{ fontSize: '20px', marginRight: '10px', color: 'white' }">
      <component :is="icon" />
    </el-icon>
    <el-text :style="{ fontFamily: 'regular', color: 'white', fontSize: '16px', marginTop: '2px' }">
      {{ label }}
    </el-text>
  </el-row>
</template>

<script setup lang="ts">
const props = defineProps<{
  label: string
  icon: any
  onclick: () => void
}>()

function handleClick() {
  props.onclick()
}
</script>

<style scoped></style>
