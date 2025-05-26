<template>
  <div
    :style="{
      background: 'linear-gradient(to bottom, #400e32, black)',
      height: '100vh',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }"
  >
    <el-row
      :gutter="20"
      style="
        width: 50%;
        height: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 50px;
        border: 1px solid #fff;
      "
    >
      <el-row v-for="transaction in transactions" :key="transaction.id"></el-row>
      <el-row
        v-for="transaction in transactions"
        :key="transaction.id"
        style="
          width: 100%;
          display: flex;
          justify-content: space-between;
          padding: 10px;
          border-bottom: 1px solid #ccc;
          color: white;
        "
      >
        <div>
          <img
            :src="profilePicture"
            alt="Profile Picture"
            style="width: 50px; height: 50px; border-radius: 50%"
          />
          <span>{{ transaction.userName }}</span>
        </div>
        <div>
          <span>{{ transaction.amount }} USD</span>
          <span>{{ transaction.date }}</span>
        </div>
        <div>
          <span>{{ transaction.type }}</span>
          <span>{{ transaction }}</span>
        </div>
      </el-row>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import profilePicture from '@/assets/profile/profileImage.jpg'
import backgrounds from '@/assets//background.png'
import { useAuthenticationStore } from '@/stores/userStore'
import { useMoneyTransactionsStore } from '@/stores/moneyTransaction'
import { useWalletStore } from '@/stores/walletStore'

const transactionHistory = ref(false)
const moneyTransactionsStore = useMoneyTransactionsStore()

const transactions = computed(() => moneyTransactionsStore.userTransactions)
</script>

<style scoped></style>
