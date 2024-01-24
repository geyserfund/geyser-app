import { atom, useAtom } from 'jotai'

import { OrderFragment } from '../../../../../../../types'
import { RewardStatus } from './RewardTable'

type RewardsTableTypes = {
  [RewardStatus.todo]: OrderFragment[]
  [RewardStatus.shipped]: OrderFragment[]
  [RewardStatus.delivered]: OrderFragment[]
}

type RewardsTableCountTypes = {
  [RewardStatus.todo]: number
  [RewardStatus.shipped]: number
  [RewardStatus.delivered]: number
}

export const rewardsAtom = atom<RewardsTableTypes>({
  [RewardStatus.todo]: [],
  [RewardStatus.shipped]: [],
  [RewardStatus.delivered]: [],
})

export const rewardsCountAtom = atom<RewardsTableCountTypes>({
  [RewardStatus.todo]: 0,
  [RewardStatus.shipped]: 0,
  [RewardStatus.delivered]: 0,
})

const rewardsSetAtom = atom(
  (get) => get(rewardsAtom),
  (get, set, update: Partial<RewardsTableTypes>) => {
    const rewards = get(rewardsAtom)

    set(rewardsAtom, {
      ...rewards,
      ...update,
    })
  },
)

export const useRewardsAtom = () => useAtom(rewardsSetAtom)

const rewardCountSetAtom = atom(
  (get) => get(rewardsCountAtom),
  (get, set, update: Partial<RewardsTableCountTypes>) => {
    const rewardsCount = get(rewardsCountAtom)

    set(rewardsCountAtom, {
      ...rewardsCount,
      ...update,
    })
  },
)

export const useRewardCountAtom = () => useAtom(rewardCountSetAtom)
