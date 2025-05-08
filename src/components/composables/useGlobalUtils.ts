import { ElMessage } from 'element-plus'

export const MaxBetMessage = () => {
  ElMessage({
    message: 'You can only bet a maximum of ₱500',
    grouping: true,
    type: 'error',
  })
}

export const LoggedInMessageToBet = () => {
  ElMessage({
    message: 'You must log in to place a bet.',
    grouping: true,
    type: 'error',
  })
}

export const MustLogInFirst = () => {
  ElMessage({
    message: 'You must be logged in first',
    grouping: true,
    type: 'error',
  })
}

export const InsufficientBalanceMessage = () => {
  ElMessage({
    message: 'Insufficient wallet balance!',
    grouping: true,
    type: 'error',
  })
}

export const NoBetUndoMessage = () => {
  ElMessage({
    message: 'No bets to undo!',
    grouping: true,
    type: 'warning',
  })
}

export const NoBetToClearMessage = () => {
  ElMessage({
    message: 'No bets to clear!',
    grouping: true,
    type: 'warning',
  })
}
