import { atom, useAtomValue } from 'jotai'
import { atomFamily } from 'jotai/utils'

import { OrderFragment } from '../../../../../../../../types'
import { RewardStatus } from '../components/RewardTable'

type RewardsTableCountTypes = {
  [RewardStatus.todo]: number
  [RewardStatus.shipped]: number
  [RewardStatus.delivered]: number
}

export const rewardsCountAtom = atom<Partial<RewardsTableCountTypes>>({})

export const rewardsFamily = atomFamily(
  ({ value }: { status: RewardStatus; value?: OrderFragment[] }) =>
    atom(value || []),
  (a, b) => a.status === b.status,
)

export const rewardStatusUpdateAtom = atom(
  null,
  (
    get,
    set,
    {
      status,
      update,
    }: { status: RewardStatus; update: Partial<OrderFragment> },
  ) => {
    const newStatus = update.status as RewardStatus

    const rewardsFromPrevStatus = get(rewardsFamily({ status }))
    const rewardsFromNewStatus = get(rewardsFamily({ status: newStatus }))
    const rewardsCount = get(rewardsCountAtom)

    const oldRewardItem = rewardsFromPrevStatus.find(
      (order) => order.id === update.id,
    )

    if (!oldRewardItem) {
      return
    }

    const newRewardItem = {
      ...oldRewardItem,
      ...update,
    }

    const newRewardsFromPrevStatus = rewardsFromPrevStatus.filter(
      (r) => r.id !== update.id,
    )

    const newRewardsFromNewStatus =
      newStatus === RewardStatus.delivered
        ? [newRewardItem, ...rewardsFromNewStatus]
        : [...rewardsFromNewStatus, newRewardItem]

    set(rewardsFamily({ status }), newRewardsFromPrevStatus)
    set(rewardsFamily({ status: newStatus }), newRewardsFromNewStatus)

    const newRewardsCount = {
      ...rewardsCount,
      [status]: (rewardsCount[status] || 0) - 1,
      [newStatus]: (rewardsCount[newStatus] || 0) + 1,
    }

    set(rewardsCountAtom, newRewardsCount)
  },
)

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
