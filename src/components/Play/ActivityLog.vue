<template>
    <el-col :span="8" class="responsive-menu" v-if="windowWidth <= 980">
      <el-button plain @click="dialogVisible = true" size="large" color="#A61F69" :icon="Menu" circle />
    </el-col>
  
    <el-dialog
      v-model="dialogVisible"
      width="260"
      class="wallet-balance"
      v-if="windowWidth <= 980"
      style="max-height: 500px; border-radius: 25px; text-align: center; background-color: rgba(0, 0, 0, 0.75) ;"
    >
      <div v-if="showWallet" class="wallet-balance">
        <p>Activity Log:</p>
        <br>
        <p>Wallet Balance: ₱{{ walletStore.userWalletBalance }}</p>
        <p v-if="Pog1BetDisplay">POG1: ₱{{ Pog1BetDisplay }}</p>
        <p v-if="EqualizerBetDisplay">EQUALIZER: ₱{{ EqualizerBetDisplay }}</p>
        <p v-if="Pog2BetDisplay">POG2: ₱{{ Pog2BetDisplay }}</p>
        <hr />
        <p>Total Bet: ₱{{ Pog1BetDisplay + EqualizerBetDisplay + Pog2BetDisplay }}</p>
      </div>
    </el-dialog>

    <div v-if="windowWidth > 980" class="wallet-balance2">
        <p>Wallet Balance: ₱{{ walletStore.userWalletBalance }}</p>
        <p v-if="Pog1BetDisplay">POG1: ₱{{ Pog1BetDisplay }}</p>
        <p v-if="EqualizerBetDisplay">EQUALIZER: ₱{{ EqualizerBetDisplay }}</p>
        <p v-if="Pog2BetDisplay">POG2: ₱{{ Pog2BetDisplay }}</p>
        <hr />
        <p>Total Bet: ₱{{ Pog1BetDisplay + EqualizerBetDisplay + Pog2BetDisplay }}</p>
      </div>




  </template>
  
  <script lang="ts" setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue'
  import { useWalletStore } from '@/stores/walletStore'
  import { Menu } from '@element-plus/icons-vue'
  
  const dialogVisible = ref(false)
  const showWallet = ref(true)
  const walletStore = useWalletStore()
  
  const Pog1BetDisplay = ref(0)
  const EqualizerBetDisplay = ref(0)
  const Pog2BetDisplay = ref(0)
  
  const windowWidth = ref(window.innerWidth)
  
  const updateWindowWidth = () => {
    windowWidth.value = window.innerWidth
  }
  
  onMounted(() => {
    window.addEventListener('resize', updateWindowWidth)
  })
  
  onBeforeUnmount(() => {
    window.removeEventListener('resize', updateWindowWidth)
  })
  </script>
  
  <style scoped>
  .wallet-balance {
    margin: auto;
    max-width: 260px;
    color: white;
    font-size: 15px;
    font-weight: bold;
    border: 2px solid white;
    border-radius: 10px;
    padding: 16px 20px;
    line-height: 1.5;
    background-color: rgba(0, 0, 0, 0.75);
    z-index: 100;
    text-align: center;
  }
  .wallet-balance2 {
  position: fixed;
  bottom: 20px;
  left: 20px;
  max-width: 260px;
  color: white;
  font-size: 15px;
  font-weight: bold;
  border: 2px solid white;
  border-radius: 10px;
  padding: 16px 20px;
  line-height: 1.5;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 2000;
}

  .wallet-balance p {
    margin: 4px 0;
  }
  
  .wallet-balance hr {
    margin: 10px 0;
    border: 0;
    height: 1px;
    background: #ffffff40;
  }
  
  .responsive-menu {
    display: none;
    position: absolute;
    bottom: 0;
    left: 0;
  }
  
  @media (max-width: 980px) {
    .responsive-menu {
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }
  }


  </style>
  