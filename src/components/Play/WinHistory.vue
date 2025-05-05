<template>
  <div class="winHistory">
    <el-table :data="winHistoryStore.history" height="250" style="width: 100%">
      <!-- Header with Pog Images -->
      <el-table-column label="Round" width="70">
        <template #header>
          <span>Round</span>
        </template>
        <template #default="{ row }">
          <span>{{ row.round }}</span>
        </template>
      </el-table-column>

      <el-table-column label="Pog1" width="70">
        <template #header>
          <img src="@/assets/pogs/Tikbalang.png" width="50" />
        </template>
        <template #default="{ row }">
          <span v-if="row.winner === 'Pog1'" class="win-indicator"></span>
        </template>
      </el-table-column>

      <el-table-column label="Equalizer" width="70">
        <template #header>
          <img src="@/assets/pogs/Jeepney.png" alt="Equalizer" width="50" />
        </template>
        <template #default="{ row }">
          <span v-if="row.winner === 'Equalizer'" class="win-indicator"></span>
        </template>
      </el-table-column>

      <el-table-column label="Pog2" width="70">
        <template #header>
          <img src="@/assets/pogs/Festival.png" alt="Pog2" width="50" />
        </template>
        <template #default="{ row }">
          <span v-if="row.winner === 'Pog2'" class="win-indicator"></span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { useWinHistoryStore } from '@/stores/winHistoryStore'

const winHistoryStore = useWinHistoryStore()
</script>

<style scoped>
.winHistory {
  position: absolute;
  bottom: 10px;
  right: 0;
  height: 300px;
  width: 320px;
  color: white;
  font-size: 20px;
  font-weight: bold;
  border: 2px solid white;
  border-radius: 15px;
  padding: 10px;
  background-color: rgba(122, 129, 129, 0.6);
}

.el-table {
  border: 1px solid black;
  border-radius: 15px;
  width: 100%;
}

.win-indicator {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15px;
  height: 15px;
  background-color: red;
  border-radius: 50%;
  margin: 5px auto;
}

.el-table-column,
header {
  text-align: center;
  background-color: blue;
}
</style>
