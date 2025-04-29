<template>
  <el-dialog v-model="paymentDialog" width="400" align-center>
    <template #header>
      <el-text :style="{ fontFamily: 'bold', color: COLORS.dark }">Payment</el-text>
    </template>

    <div
      :style="{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: '10px',
        gap: '10px',
        marginBottom: '10px',
      }"
    >
      <div
        v-for="payment in paymentMethods"
        :style="{
          borderWidth: '1px',
          borderColor: paymentSelected === payment.name ? COLORS.dark : COLORS.gray2,
          borderStyle: 'solid',
          borderRadius: '10px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '2px 10px',
        }"
      >
        <el-image
          @click="paymentSelected = payment.name"
          :src="payment.image"
          fit="contain"
          :style="{ width: '50px', height: '50px', cursor: 'pointer' }"
        />
      </div>
    </div>

    <!-- <el-text :style="{ fontFamily: 'regular', fontSize: '12px', color: COLORS.gray }">
      Amount Due: Php.{{ props.chip.price }}.00
    </el-text> -->

    <el-divider :style="{ margin: 0, marginBottom: '10px' }" />
    <div v-if="paymentSelected === 'GCash'">
      <el-text :style="{ fontFamily: 'regular', fontSize: '12px', color: COLORS.dark }">
        Login to pay with GCash
      </el-text>
    </div>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="paymentDialog = false">Cancel</el-button>
        <el-button type="primary" @click="paymentDialog = false"> Confirm </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { COLORS } from '@/assets/theme'
import gcash from '@/assets/shop/gcash.png'
import mastercard from '@/assets/shop/mastercard.png'
import { ref } from 'vue'

const paymentDialog = ref(false)
const paymentMethods = ref([
  {
    id: '001',
    name: 'GCash',
    image: gcash,
  },
  {
    id: '002',
    name: 'MasterCard',
    image: mastercard,
  },
])
const paymentSelected = ref('GCash')

const props = defineProps<{
  chip: {
    id: string
    name: string
    price: number
    image: string
  }
}>()
</script>

<style scoped></style>
