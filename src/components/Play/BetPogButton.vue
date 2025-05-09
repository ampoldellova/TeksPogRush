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
            width: pogSize,
            height: pogSize,
            borderWidth: '1px',
            borderColor: 'white',
            borderStyle: 'solid',
            borderRadius: '50%',
          }"
        />
      </el-col>
      <el-col :span="24" :style="{ marginTop: betMargin }">
        <el-text :style="{ fontFamily: 'regular', color: 'white', fontSize: betLabel }">
          {{ label }}
        </el-text>
      </el-col>
      <el-col
        :span="24"
        :style="{ marginTop: betMargin, display: 'flex', justifyContent: 'center' }"
      >
        <div
          :style="{
            backgroundColor: COLORS.dark,
            height: currencyContainer,
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
          <el-image
            :src="currency"
            fit="cover"
            :style="{ height: currencySize, width: currencySize }"
          />
          <el-text :style="{ fontFamily: 'regular', color: 'white', fontSize: betValueSize }">
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
import { computed, onMounted, onUnmounted, ref } from 'vue'

const pogSize = ref('100px')
const betLabel = ref('20px')
const betMargin = ref('10px')
const currencyContainer = ref('30px')
const currencySize = ref('20px')
const betValueSize = ref('10px')

const updatePogSize = () => {
  const width = window.innerWidth
  if (width < 600) {
    pogSize.value = '50px'
    betLabel.value = '8px'
    betMargin.value = '5px'
    currencyContainer.value = '15px'
    currencySize.value = '10px'
    betValueSize.value = '8px'
  } else {
    pogSize.value = '100px'
    betLabel.value = '12px'
    betMargin.value = '10px'
    currencyContainer.value = '30px'
    currencySize.value = '20px'
    betValueSize.value = '10px'
  }
}

onMounted(() => {
  updatePogSize()
  window.addEventListener('resize', updatePogSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', updatePogSize)
})

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
