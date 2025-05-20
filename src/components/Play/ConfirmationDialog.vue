<template>
  <el-dialog v-model="confirmationDialog" title="Warning" width="400" align-center>
    <template #header>
      <el-text :style="{ fontFamily: 'bold', color: COLORS.dark }">Oops!</el-text>
    </template>

    <el-result
      icon="warning"
      title="Warning Tip"
      :sub-title="
        authenticationStore.isAuthenticated
          ? `It seems you don't have enough chips to enter the arena, you can buy chips from the shop or
      would you like to try friendly arena instead?`
          : `Please login to your account first before entering the arena`
      "
      :style="{
        fontFamily: 'regular',
        color: COLORS.dark,
        textAlign: 'center',
      }"
    >
      <template #extra>
        <el-button
          v-if="authenticationStore.isAuthenticated"
          @click="emit('onClose')"
          size="large"
          :style="{
            backgroundColor: COLORS.secondary,
            color: 'white',
            fontFamily: 'bold',
          }"
        >
          Back
        </el-button>
        <el-button
          v-if="authenticationStore.isAuthenticated"
          @click="emit('onFriendlyButtonClick')"
          size="large"
          :style="{
            backgroundColor: COLORS.secondary,
            color: 'white',
            fontFamily: 'bold',
          }"
        >
          Friendly Arena
        </el-button>
      </template>
    </el-result>
  </el-dialog>
</template>

<script setup lang="ts">
import { COLORS } from '@/assets/theme'
import { useAuthenticationStore } from '@/stores/userStore'
import { ref } from 'vue'
const confirmationDialog = ref(false)
const authenticationStore = useAuthenticationStore()

const emit = defineEmits(['onClose', 'onFriendlyButtonClick'])
</script>

<style scoped></style>
