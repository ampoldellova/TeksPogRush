<template>
  <el-dialog v-model="withdrawAmountDialog" width="400" align-center>
    <span>Open the dialog from the center from the screen</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="withdrawAmountDialog = false">Cancel</el-button>
        <el-button type="primary" @click="withdrawAmountDialog = false"> Confirm </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const withdrawAmountDialog = ref(false)
</script>

<style scoped></style>
