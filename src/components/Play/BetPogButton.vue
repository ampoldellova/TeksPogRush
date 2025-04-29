<template>
  <motion.button
    @click="emit('click')"
    :whileHover="{ scale: 1.1, transition: { duration: 0.3 } }"
    :whilePress="{ scale: 0.9 }"
    :style="{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }"
  >
    <el-row>
      <el-col :span="24">
        <el-image
          :src="iconSrc"
          fit="contain"
          :style="{
            width: '100px',
            height: '100px',
            borderWidth: '1px',
            borderColor: 'white',
            borderStyle: 'solid',
            borderRadius: '50%',
          }"
        />
      </el-col>
      <el-col :span="24" style="margin-top: 10px">
        <el-text :style="{ fontFamily: 'regular', color: 'white' }">{{ label }}</el-text>
      </el-col>
      <el-col :span="24" style="margin-top: 10px; display: flex; justify-content: center">
        <div
          :style="{
            backgroundColor: COLORS.dark,
            height: '30px',
            width: 'auto',
            borderRadius: '99px',
            borderWidth: '1px',
            borderColor: '#2a2c32',
            borderStyle: 'solid',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 10px',
            gap: '10px',
          }"
        >
          <el-image :src="currency" fit="cover" style="height: 20px; width: 20px" />
          <el-text :style="{ fontFamily: 'regular', color: 'white' }">
            {{ displayValue }}
          </el-text>
        </div>
      </el-col>
    </el-row>
  </motion.button>
</template>

<script setup lang="ts">
import currency from '@/assets/currency.png'
import { COLORS } from '@/assets/theme'
import { motion } from 'motion-v'
import heads1 from '@/assets/pogs/Tikbalang.png'
import heads2 from '@/assets/pogs/Jeepney.png'
import heads3 from '@/assets/pogs/Festival.png'
import { computed } from 'vue'

const props = defineProps<{
  icon: string
  label: string
  displayValue: number
}>()

const iconSrc = computed(() => {
  if (props.icon === 'heads1') {
    return heads1
  } else if (props.icon === 'heads2') {
    return heads2
  } else if (props.icon === 'heads3') {
    return heads3
  }
  return ''
})

const emit = defineEmits(['click'])
</script>

<style scoped></style>
