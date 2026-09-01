import { QueryHookOptions } from '@apollo/client'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'

import { usePaginationAtomHook } from '@/shared/hooks/utils/usePaginationAtomHook'

import {
  Exact,
  OrderByDirection,
  OrderFragment,
  OrdersGetInput,
  OrdersGetOrderByField,
  OrdersGetOrderByInput,
  OrdersGetQuery,
  OrdersGetStatus,
  OrdersGetWhereInput,
  useOrdersGetQuery,
} from '../../../../../../../types'
import { rewardsCountAtom, rewardsFamily } from '../state/rewardsAtom'

interface UseRewardByStatusProps {
  status: OrdersGetStatus
  projectId: number
  getRewardQueryProps: QueryHookOptions<
    OrdersGetQuery,
    Exact<{
      input: OrdersGetInput
    }>
  >
}

const MAXIMUM_REWARD_ITEMS = 6

export const useRewardByStatus = ({ status, projectId, getRewardQueryProps }: UseRewardByStatusProps) => {
  const [rewardsCount, setRewardsCount] = useAtom(rewardsCountAtom)

  const [rewards, setRewards] = useAtom(rewardsFamily({ status }))

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

    if (status === OrdersGetStatus.Shipped) {
      orderBy.field = OrdersGetOrderByField.ShippedAt
    } else if (status === OrdersGetStatus.Delivered) {
      orderBy.field = OrdersGetOrderByField.DeliveredAt
    }

    setOrderBy([orderBy])
  }, [status])

  const where: OrdersGetWhereInput = {
    status: status as OrdersGetStatus,
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

  return {
    isLoading,
    isLoadingMore,
    noMoreItems,
    fetchNext,
    rewards,
    rewardsCount: rewardsCount[status],
    orderBy,
    setOrderBy,
  }
}
