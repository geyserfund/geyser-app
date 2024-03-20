import { OrdersGetStatus } from '../types'

export const getRewardShippingStatusBackgroundColor = (value: OrdersGetStatus, colors: any) => {
  switch (value) {
    case OrdersGetStatus.Confirmed:
      return {
        backgroundColor: colors.neutral[200],
        hoverBgColor: colors.neutral[400],
      }
    case OrdersGetStatus.Shipped:
      return {
        backgroundColor: colors.nostr[100],
        hoverBgColor: colors.nostr[300],
      }
    case OrdersGetStatus.Delivered:
      return {
        backgroundColor: colors.brand[100],
        hoverBgColor: colors.brand[300],
      }
    default:
      return {
        backgroundColor: colors.neutral[200],
        hoverBgColor: colors.neutral[400],
      }
  }
}
