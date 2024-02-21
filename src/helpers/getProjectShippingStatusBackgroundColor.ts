import { RewardStatus } from '../constants'

export const getRewardShippingStatusBackgroundColor = (value: RewardStatus, colors: any) => {
  switch (value) {
    case RewardStatus.todo:
      return {
        backgroundColor: colors.neutral[200],
        hoverBgColor: colors.neutral[400],
      }
    case RewardStatus.shipped:
      return {
        backgroundColor: colors.nostr[100],
        hoverBgColor: colors.nostr[300],
      }
    case RewardStatus.delivered:
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
