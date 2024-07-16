import { OrdersGetStatus } from '../../../types'

export type RewardStatusOption = {
  label: string
  value: OrdersGetStatus
}

export const RewardStatusOptions: RewardStatusOption[] = [
  {
    label: 'Todo',
    value: OrdersGetStatus.Confirmed,
  },
  {
    label: 'Shipped',
    value: OrdersGetStatus.Shipped,
  },
  {
    label: 'Delivered',
    value: OrdersGetStatus.Delivered,
  },
]

export const RewardStatusLabel = {
  [OrdersGetStatus.AwaitingPayment]: 'Pending',
  [OrdersGetStatus.Confirmed]: 'To do',
  [OrdersGetStatus.Shipped]: 'Shipped',
  [OrdersGetStatus.Delivered]: 'Delivered',
}
