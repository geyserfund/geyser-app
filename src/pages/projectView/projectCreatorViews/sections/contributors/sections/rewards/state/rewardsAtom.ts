import { atom, useAtomValue } from 'jotai'
import { atomFamily } from 'jotai/utils'

import { OrderFragment, OrdersGetStatus } from '../../../../../../../../types'

type RewardsTableCountTypes = {
  [OrdersGetStatus.AwaitingPayment]: number
  [OrdersGetStatus.Confirmed]: number
  [OrdersGetStatus.Shipped]: number
  [OrdersGetStatus.Delivered]: number
}

export const rewardsCountAtom = atom<Partial<RewardsTableCountTypes>>({})

export const rewardsFamily = atomFamily(
  ({ value }: { status: OrdersGetStatus; value?: OrderFragment[] }) => atom(value || []),
  (a, b) => a.status === b.status,
)

export const rewardStatusUpdateAtom = atom(
  null,
  (get, set, { status, update }: { status: OrdersGetStatus; update: Partial<OrderFragment> }) => {
    const newStatus = update.status as OrdersGetStatus

    const rewardsFromPrevStatus = get(rewardsFamily({ status }))
    const rewardsFromNewStatus = get(rewardsFamily({ status: newStatus }))
    const rewardsCount = get(rewardsCountAtom)

    const oldRewardItem = rewardsFromPrevStatus.find((order) => order.id === update.id)

    if (!oldRewardItem) {
      return
    }

    const newRewardItem = {
      ...oldRewardItem,
      ...update,
    }

    const newRewardsFromPrevStatus = rewardsFromPrevStatus.filter((r) => r.id !== update.id)

    const newRewardsFromNewStatus =
      newStatus === OrdersGetStatus.Delivered
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
    rewardsCount[OrdersGetStatus.Confirmed] === 0 &&
    rewardsCount[OrdersGetStatus.Shipped] === 0 &&
    rewardsCount[OrdersGetStatus.Delivered] === 0
  ) {
    return true
  }

  return false
})
export const useRewardEmptyAtom = () => useAtomValue(rewardEmptyAtom)
