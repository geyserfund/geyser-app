import { MutationHookOptions, QueryHookOptions } from '@apollo/client'
import { useAtom, useSetAtom } from 'jotai'
import { useEffect, useState } from 'react'

import { RewardStatus } from '../../../../../../../../constants'
import { usePaginationAtomHook } from '../../../../../../../../hooks'
import {
  Exact,
  OrderByDirection,
  OrderFragment,
  OrdersGetInput,
  OrdersGetOrderByField,
  OrdersGetOrderByInput,
  OrdersGetQuery,
  OrdersGetWhereInput,
  OrderStatusUpdateInput,
  OrderStatusUpdateMutation,
  UpdatableOrderStatus,
  useOrdersGetQuery,
  useOrderStatusUpdateMutation,
} from '../../../../../../../../types'
import { rewardsCountAtom, rewardsFamily, rewardStatusUpdateAtom } from '../state/rewardsAtom'

interface UseRewardByStatusProps {
  status: RewardStatus
  projectId: number
  getRewardQueryProps: QueryHookOptions<
    OrdersGetQuery,
    Exact<{
      input: OrdersGetInput
    }>
  >
  statusUpdateMutationProps: MutationHookOptions<
    OrderStatusUpdateMutation,
    Exact<{
      input: OrderStatusUpdateInput
    }>
  >
}

const MAXIMUM_REWARD_ITEMS = 6

export const useRewardByStatus = ({
  status,
  projectId,
  getRewardQueryProps,
  statusUpdateMutationProps,
}: UseRewardByStatusProps) => {
  const [rewardsCount, setRewardsCount] = useAtom(rewardsCountAtom)

  const [rewards, setRewards] = useAtom(rewardsFamily({ status }))

  const updateStatus = useSetAtom(rewardStatusUpdateAtom)

  const [isLoading, setIsLoading] = useState(true)

  const [orderBy, setOrderBy] = useState<OrdersGetOrderByInput[]>([
    {
      direction: OrderByDirection.Desc,
      field: OrdersGetOrderByField.ConfirmedAt,
    },
  ])

  useEffect(() => {
    const orderBy = {
      direction: OrderByDirection.Desc,
      field: OrdersGetOrderByField.ConfirmedAt,
    }

    if (status === RewardStatus.shipped) {
      orderBy.field = OrdersGetOrderByField.ShippedAt
    } else if (status === RewardStatus.delivered) {
      orderBy.field = OrdersGetOrderByField.DeliveredAt
    }

    setOrderBy([orderBy])
  }, [status])

  const where: OrdersGetWhereInput = {
    status,
    projectId,
  }

  const { fetchMore } = useOrdersGetQuery({
    skip: !projectId,
    fetchPolicy: 'network-only',
    variables: {
      input: {
        where,
        orderBy,
        pagination: {
          take: MAXIMUM_REWARD_ITEMS,
        },
      },
    },
    ...getRewardQueryProps,
    onCompleted(data) {
      handleDataUpdate(data.ordersGet?.orders || [])
      setRewardsCount((prev) => ({
        ...prev,
        [status]: data.ordersGet?.pagination?.count,
      }))
      setIsLoading(false)
      if (getRewardQueryProps.onCompleted) getRewardQueryProps.onCompleted(data)
    },
    onError(error) {
      setIsLoading(false)
      if (getRewardQueryProps.onError) getRewardQueryProps.onError(error)
    },
  })

  const { handleDataUpdate, isLoadingMore, noMoreItems, fetchNext } = usePaginationAtomHook<OrderFragment>({
    fetchMore,
    queryName: ['ordersGet', 'orders'],
    itemLimit: MAXIMUM_REWARD_ITEMS,
    where,
    orderBy,
    setData: setRewards,
  })

  const [orderStatusUpdate] = useOrderStatusUpdateMutation({
    ...statusUpdateMutationProps,
    onCompleted(data) {
      if (data.orderStatusUpdate?.id === undefined) return

      updateStatus({ status, update: data.orderStatusUpdate })

      if (statusUpdateMutationProps.onCompleted) statusUpdateMutationProps.onCompleted(data)
    },
  })

  const updateOrderStatus = (orderId: string, newStatus: UpdatableOrderStatus) => {
    if (`${newStatus}` === `${status}`) return
    orderStatusUpdate({
      variables: {
        input: {
          orderId,
          status: newStatus,
        },
      },
    })
  }

  return {
    isLoading,
    isLoadingMore,
    noMoreItems,
    fetchNext,
    rewards,
    rewardsCount: rewardsCount[status],
    updateOrderStatus,
    orderBy,
    setOrderBy,
  }
}
