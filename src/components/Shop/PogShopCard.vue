<template>
  <motion.div
    style="
      width: 220px;
      height: 330px;
      border-width: 2px;
      border-color: #2a2c32;
      border-radius: 15px;
      margin: 10px;
    "
    @mouseover="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <el-row :style="rowStyle">
      <el-image
        :src="props.chip.image"
        :style="{ borderRadius: 99, width: '150px', height: '150px' }"
        fit="contain"
      />
    </el-row>

    <el-row :style="bottomRowStyle">
      <el-col :span="24">
        <el-row>
          <el-col :span="24">
            <el-text :style="{ fontFamily: 'regular', color: 'white' }"
              >{{ props.chip.id }} | {{ props.chip.name }}</el-text
            >
          </el-col>
          <el-col :span="24">
            <el-text :style="{ fontFamily: 'bold', color: '#f2cd5c' }">Php.</el-text>
            <el-text :style="{ fontFamily: 'bold', color: 'white', marginLeft: '3px' }">
              {{ props.chip.price }}.00
            </el-text>
          </el-col>
        </el-row>
      </el-col>

      <el-col :span="24" style="margin-top: 5px">
        <el-button @click="paymentDialog = true" :style="buyButton">Buy Now</el-button>
      </el-col>
    </el-row>
  </motion.div>

  <PaymentDialog v-model="paymentDialog" :chip="props.chip" />
</template>

<script setup lang="ts">
import { motion } from 'motion-v'
import { computed, ref } from 'vue'
import PaymentDialog from './PaymentDialog.vue'

const paymentDialog = ref(false)

const props = defineProps<{
  chip: {
    id: string
    name: string
    price: number
    image: string
  }
}>()

const isHovered = ref(false)

const rowStyle = computed(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: isHovered.value ? '65%' : '80%',
  background: isHovered.value
    ? 'linear-gradient(to bottom, #141414, rgba(239, 176, 7, 1))'
    : 'linear-gradient(to bottom, #141414, rgba(239, 176, 7, 0.5))',
  borderTopRightRadius: '15px',
  borderTopLeftRadius: '15px',
  transition: 'height 0.7s ease, background 0.5s ease',
}))

const bottomRowStyle = computed(() => ({
  height: isHovered.value ? '35%' : '20%',
  backgroundColor: '#141414',
  borderBottomRightRadius: '15px',
  borderBottomLeftRadius: '15px',
  padding: '10px',
  transition: 'height 0.7s ease',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}))

const buyButton = computed(() => ({
  display: isHovered.value ? 'flex' : 'none',
  width: '100%',
  background: 'linear-gradient(to right, #f2cd5c, #f2921d',
  borderWidth: 0,
  fontFamily: 'semiBold',
  color: 'white',
  borderRadius: '10px',
  transition: 'display 0.7s ease, opacity 0.7s ease',
}))
</script>

<style scoped></style>
