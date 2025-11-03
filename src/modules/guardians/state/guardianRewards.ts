import { atom } from 'jotai'

import { GuardianProjectRewardFragment } from '@/types'

import { GuardianRewardDetails, guardianRewardsMap, RewardDetails, RewardMap } from '../utils/constants.ts'
import { guardianRewardUUIDs } from '../utils/characterAssets.ts'

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

export type GuardianRewardsPhysicalItems = {
  rewards: GuardianProjectRewardFragment[]
  rewardsMap: RewardMap[]
  details: RewardDetails
}

export const guardianRewardsPhysicalItemsAtom = atom<GuardianRewardsPhysicalItems[]>((get) => {
  const guardianRewards = get(guardianRewardsAtom)

  const physicalRewards: GuardianRewardsPhysicalItems[] = GuardianRewardDetails.map((details) => {
    const rewardsMap = guardianRewardsMap.filter((rewardMap) => rewardMap.type === details.rewardType)

    const rewards = guardianRewards.filter((reward) =>
      rewardsMap.some((rewardmap) => rewardmap.rewardUUID === reward.uuid),
    )

    return {
      details,
      rewards,
      rewardsMap,
    }
  })
  return physicalRewards
})
