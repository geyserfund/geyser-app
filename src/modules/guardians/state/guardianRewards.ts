import { atom } from 'jotai'

import { GuardianProjectRewardFragment } from '@/types'

import { guardianRewardUUIDs } from '../pages/character/characterAssets'

export const guardianRewardsAtom = atom<GuardianProjectRewardFragment[]>([])

export const guardianRewardsLoadingAtom = atom<boolean>(true)

export const guardianRewardsDiscountItemsAtom = atom<number>((get) => {
  const guardianRewards = get(guardianRewardsAtom)

  let discountItemNumber = 0

  Object.values(guardianRewardUUIDs).forEach((rewardUUIDs) => {
    const discountReward = guardianRewards.find((reward) => reward.uuid === rewardUUIDs.discount)
    if (discountReward && discountReward.maxClaimable) {
      discountItemNumber += discountReward.maxClaimable - discountReward.sold
    }
  })

  return discountItemNumber
})
