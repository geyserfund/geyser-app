import { UpdatableOrderStatus } from '../../types'

export enum RewardStatus {
  todo = UpdatableOrderStatus.Confirmed,
  shipped = UpdatableOrderStatus.Shipped,
  delivered = UpdatableOrderStatus.Delivered,
}

export type RewardStatusOption = {
  label: string
  value: RewardStatus
}

export const RewardStatusOptions: RewardStatusOption[] = [
  {
    label: 'Todo',
    value: RewardStatus.todo,
  },
  {
    label: 'Shipped',
    value: RewardStatus.shipped,
  },
  {
    label: 'Delivered',
    value: RewardStatus.delivered,
  },
]

export const RewardStatusLabel = {
  [RewardStatus.todo]: 'To do',
  [RewardStatus.shipped]: 'Shipped',
  [RewardStatus.delivered]: 'Delivered',
}
