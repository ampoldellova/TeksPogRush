<template>
  <el-col :span="8" class="responsive-menu" v-if="windowWidth <= 980">
    <el-button plain @click="dialogVisible = true" size="large" color="#A61F69" :icon="Menu" circle>
    </el-button>
  </el-col>

  <el-dialog
    v-model="dialogVisible"
    width="500"
    class="winHistory"
    v-if="windowWidth <= 600"
    style="max-height: 500px"
  >
    <h2>Match History</h2>
    <el-table
      :data="winHistoryStore.getHistory(gameMode)"
      height="auto"
      style="width: 100%; padding: 12px; height: 400px"
    >
      <el-table-column label="Round" width="80">
        <template #header>
          <span>Round</span>
        </template>
        <template #default="{ row }">
          <span>{{ row.round }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Pog1" width="90">
        <template #header>
          <img src="@/assets/pogs/Tikbalang.png" width="50" />
        </template>
        <template #default="{ row }">
          <span v-if="row.winner === 'Pog1'" class="win-indicator"></span>
        </template>
      </el-table-column>

      <el-table-column label="Equalizer" width="90">
        <template #header>
          <img src="@/assets/pogs/Jeepney.png" alt="Equalizer" width="50" />
        </template>
        <template #default="{ row }">
          <span v-if="row.winner === 'Equalizer'" class="win-indicator"></span>
        </template>
      </el-table-column>

      <el-table-column label="Pog2" width="90">
        <template #header>
          <img src="@/assets/pogs/Festival.png" alt="Pog2" width="50" />
        </template>
        <template #default="{ row }">
          <span v-if="row.winner === 'Pog2'" class="win-indicator"></span>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>

  <div v-if="windowWidth > 600" class="winHistory-container">
    <el-text class="match-history-label">MATCH HISTORY</el-text>
    <el-table :data="winHistoryStore.getHistory(gameMode)" class="winHistory-table">
      <el-table-column label="Round" width="80">
        <template #header>
          <el-text style="font-size: 20px; font-weight: bold">Round</el-text>
        </template>
        <template #default="{ row }">
          <span>{{ row.round }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Pog1" width="100">
        <template #header>
          <img src="@/assets/pogs/Tikbalang.png" width="80" />
        </template>
        <template #default="{ row }">
          <el-tooltip v-if="row.winner === 'Pog1'" effect="dark" placement="top" trigger="click">
            <template #content>
              <div>
                <div>
                  <strong>Result: </strong>
                  <span v-if="Array.isArray(row.result)">
                    {{ row.result.join(', ') }}
                  </span>
                  <span v-else>
                    {{ row.result }}
                  </span>
                </div>
                <div><strong>Total Bet:</strong> {{ row.totalBet }}</div>
                <div><strong>Date/Time:</strong> {{ row.dateTime }}</div>
                <div><strong>Total Win:</strong> {{ row.amount }}</div>
              </div>
            </template>
            <span class="win-indicator" style="cursor: pointer"></span>
          </el-tooltip>
        </template>
      </el-table-column>

      <el-table-column label="Equalizer" width="120">
        <template #header>
          <img src="@/assets/pogs/Jeepney.png" alt="Equalizer" width="80" />
        </template>
        <template #default="{ row }">
          <el-tooltip
            v-if="row.winner === 'Equalizer'"
            effect="dark"
            placement="top"
            trigger="click"
          >
            <template #content>
              <div>
                <
                <div>
                  <strong>Result: </strong>
                  <span v-if="Array.isArray(row.result)">
                    {{ row.result.join(', ') }}
                  </span>
                  <span v-else>
                    {{ row.result }}
                  </span>
                </div>
                <div><strong>Total Bet:</strong> {{ row.totalBet }}</div>
                <div><strong>Date/Time:</strong> {{ row.dateTime }}</div>
                <div><strong>Total Win:</strong> {{ row.amount }}</div>
              </div>
            </template>
            <span class="win-indicator" style="cursor: pointer"></span>
          </el-tooltip>
        </template>
      </el-table-column>

      <el-table-column label="Pog2" width="120">
        <template #header>
          <img src="@/assets/pogs/Festival.png" alt="Pog2" width="80" />
        </template>
        <template #default="{ row }">
          <el-tooltip v-if="row.winner === 'Pog2'" effect="dark" placement="top" trigger="click">
            <template #content>
              <div>
                <div>
                  <strong>Result: </strong>
                  <span v-if="Array.isArray(row.result)">
                    {{ row.result.join(', ') }}
                  </span>
                  <span v-else>
                    {{ row.result }}
                  </span>
                </div>
                <div><strong>Total Bet:</strong> {{ row.totalBet }}</div>
                <div><strong>Date/Time:</strong> {{ row.dateTime }}</div>
                <div><strong>Total Win:</strong> {{ row.amount }}</div>
              </div>
            </template>
            <span class="win-indicator" style="cursor: pointer"></span>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { useWinHistoryStore } from '@/stores/winHistoryStore'
import { ref, onMounted, onUnmounted } from 'vue'
import { Menu } from '@element-plus/icons-vue'

const Pog1BetDisplay = ref(0)
const EqualizerBetDisplay = ref(0)
const Pog2BetDisplay = ref(0)

const totalBet = Pog1BetDisplay.value + EqualizerBetDisplay.value + Pog2BetDisplay.value

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
.winHistory-container {
  position: absolute;
  bottom: 10px;
  right: 0;
  height: 400px;
  width: 470px;
  border: 2px solid white;
  border-radius: 15px;
  background-color: rgba(122, 129, 129, 0.6);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 40px;
  z-index: 10;
}

.match-history-label {
  position: absolute;
  top: 10px;
  font-family: bold;
  color: white;
  font-size: 20px;
  z-index: 20;
}

.winHistory-table {
  width: 450px;
  height: 350px;
  padding: 12px;
  z-index: 5;
}

.el-table {
  border: 1px solid black;
  border-radius: 15px;
  line-height: none;
}

.win-indicator {
  width: 15px;
  height: 15px;
  background-color: red;
  border-radius: 50%;
  margin: 0 auto;
}

:deep(.el-table .cell) {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  height: 100%;
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

.tooltip-base-box {
  width: 600px;
}
.tooltip-base-box .row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.tooltip-base-box .center {
  justify-content: center;
}
.tooltip-base-box .box-item {
  width: 110px;
  margin-top: 10px;
}
</style>
