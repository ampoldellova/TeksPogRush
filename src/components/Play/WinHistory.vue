<template>
  <el-col :span="8" class="responsive-menu" v-if="windowWidth <= 980">
    <el-button plain @click="dialogVisible = true" size="large" color="#A61F69" :icon="Menu" circle>
    </el-button>
  </el-col>

  <el-dialog
    v-model="dialogVisible"
    width="400"
    class="winHistory"
    v-if="windowWidth <= 980"
    style="max-height: 500px"
  >
    <h2>Match History</h2>
    <el-table
      :data="winHistoryStore.getHistory(gameMode)"
      height="auto"
      style="width: 100%; padding: 12px"
    >
      <el-table-column label="Round" width="42">
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
  </el-dialog>

  <div v-if="windowWidth > 980" class="winHistory">
    <h2>Match History</h2>
    <el-table
      :data="winHistoryStore.getHistory(gameMode)"
      style="width: 100%; padding: 12px; height: 330px"
    >
      <el-table-column label="Round" width="42">
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
import { ref, onMounted, onUnmounted } from 'vue'
import { Menu } from '@element-plus/icons-vue'

const dialogVisible = ref(false)
const winHistoryStore = useWinHistoryStore()
const windowWidth = ref(window.innerWidth)

// const gameMode = ref(localStorage.getItem('gameMode') || 'arena')
const gameMode = ref<'arena' | 'friendly'>(
  (localStorage.getItem('gameMode') as 'arena' | 'friendly') || 'arena',
)

const updateWidth = () => {
  windowWidth.value = window.innerWidth
}

onMounted(() => {
  window.addEventListener('resize', updateWidth)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateWidth)
})
</script>

<style scoped>
.winHistory {
  position: absolute;
  bottom: 10px;
  right: 0;
  height: 400px;
  width: 320px;
  color: white;
  font-size: 20px;
  font-weight: bold;
  border: 2px solid white;
  border-radius: 15px;
  padding: 10px;
  background-color: rgba(122, 129, 129, 0.6);
  text-align: center;
}

.el-table {
  border: 1px solid black;
  border-radius: 15px;
  width: 100%;
  line-height: none;
}

.win-indicator {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15px;
  height: 15px;
  background-color: red;
  border-radius: 50%;
  margin-left: 18px;
}

:deep(.el-table .cell) {
  line-height: none;
  padding: 0%;
  overflow: none;
}

.responsive-menu {
  display: none;
  position: absolute;
  bottom: 0;
  right: 0;
}

@media (max-width: 980px) {
  .responsive-menu {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
}
</style>
