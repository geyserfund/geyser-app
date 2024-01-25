import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai'

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

export const rewardsCountAtom = atom<Partial<RewardsTableCountTypes>>({})

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

const rewardStatusChange = atom(
  null,
  (
    get,
    set,
    {
      status,
      update,
    }: { status: RewardStatus; update: Partial<OrderFragment> },
  ) => {
    const rewards = get(rewardsAtom)
    const rewardsCount = get(rewardsCountAtom)

    const newRewardItem = {
      ...rewards[status].find((order) => order.id === update.id),
      ...update,
    }

    const newStatus = newRewardItem.status as RewardStatus

    const newRewards = {
      ...rewards,
      [status]: rewards[status].filter((r) => r.id !== update.id),
      [newStatus]: [newRewardItem, ...rewards[newStatus]],
    }

    const newRewardsCount = {
      ...rewardsCount,
      [status]: (rewardsCount[status] || 0) - 1,
      [newStatus]: (rewardsCount[newStatus] || 0) + 1,
    }

    set(rewardsAtom, newRewards)
    set(rewardsCountAtom, newRewardsCount)
  },
)

export const useRewardStatusChangeAtom = () => useSetAtom(rewardStatusChange)

const rewardEmptyAtom = atom((get) => {
  const rewardsCount = get(rewardsCountAtom)

  if (
    rewardsCount[RewardStatus.todo] === 0 &&
    rewardsCount[RewardStatus.shipped] === 0 &&
    rewardsCount[RewardStatus.delivered] === 0
  ) {
    return true
  }

  return false
})

export const useRewardEmptyAtom = () => useAtomValue(rewardEmptyAtom)
