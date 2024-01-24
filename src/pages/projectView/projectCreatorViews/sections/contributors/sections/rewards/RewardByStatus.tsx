import { Button, HStack, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { Body1, H2, H3 } from '../../../../../../../components/typography'
import { useProjectContext } from '../../../../../../../context'
import { usePaginationAtomHook } from '../../../../../../../hooks'
import { standardPadding } from '../../../../../../../styles'
import {
  OrderByDirection,
  OrderFragment,
  OrdersGetOrderByField,
  OrdersGetWhereInput,
  UpdatableOrderStatus,
  useOrdersGetQuery,
  useOrderStatusUpdateMutation,
} from '../../../../../../../types'
import { useNotification } from '../../../../../../../utils'
import {
  useRewardCountAtom,
  useRewardsAtom,
  useRewardStatusChangeAtom,
} from './rewardsAtom'
import { RewardStatus, RewardTable } from './RewardTable'

export const RewardStatusLabel = {
  [RewardStatus.todo]: 'To do',
  [RewardStatus.shipped]: 'Shipped',
  [RewardStatus.delivered]: 'Delivered',
}

const MAXIMUM_REWARD_ITEMS = 6

export const RewardByStatus = ({ status }: { status: RewardStatus }) => {
  const { t } = useTranslation()
  const { project } = useProjectContext()
  const { toast } = useNotification()

  const [rewardsData, setRewardsData] = useRewardsAtom()
  const [rewardCount, setRewardCount] = useRewardCountAtom()
  const updateRewardStatus = useRewardStatusChangeAtom()

  const ordersData = rewardsData[status]

  const where: OrdersGetWhereInput = {
    status,
    projectId: project?.id,
  }
  const orderBy = [
    {
      direction: OrderByDirection.Desc,
      field: OrdersGetOrderByField.ConfirmedAt,
    },
  ]

  const { fetchMore } = useOrdersGetQuery({
    skip: !project?.id,
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
    onCompleted(data) {
      handleDataUpdate(data.ordersGet?.orders || [])
      setRewardCount({ [status]: data.ordersGet?.pagination?.count })
    },
  })

  const { handleDataUpdate, isLoadingMore, noMoreItems, fetchNext } =
    usePaginationAtomHook<OrderFragment>({
      fetchMore,
      queryName: ['ordersGet', 'orders'],
      itemLimit: MAXIMUM_REWARD_ITEMS,
      where,
      orderBy,
      list: ordersData,
      setList: (newList) => setRewardsData({ [status]: newList }),
    })

  const [updateOrderStatus] = useOrderStatusUpdateMutation({
    onCompleted(data) {
      if (data.orderStatusUpdate?.id === undefined) return

      updateRewardStatus({ status, update: data.orderStatusUpdate })

      toast({ title: 'Order status updated', status: 'success' })
    },
    onError(error) {
      toast({
        title: 'Error updating order status',
        status: 'error',
        description: `${error}`,
      })
    },
  })

  const handlleUpdateOrderStatus = (
    orderId: string,
    status: UpdatableOrderStatus,
  ) => {
    updateOrderStatus({
      variables: {
        input: {
          orderId,
          status,
        },
      },
    })
  }

  return (
    <VStack width="100%" flexGrow={1} pt={'10px'} spacing="10px">
      <HStack w="full" px={standardPadding}>
        <H2 color="neutral.900">{t(RewardStatusLabel[status])}</H2>
        <H3 color="neutral.600">
          {rewardCount[status] ? `(${rewardCount[status]})` : ''}
        </H3>
      </HStack>
      {ordersData.length === 0 ? (
        <HStack w="full" px={standardPadding}>
          <Body1>{t("This group doesn't have any items yet.")}</Body1>
        </HStack>
      ) : (
        <RewardTable
          data={ordersData}
          handlleUpdateOrderStatus={handlleUpdateOrderStatus}
        />
      )}
      {!noMoreItems.current && (
        <HStack w="full" px={standardPadding}>
          <Button
            width="100%"
            variant="secondary"
            onClick={() => fetchNext()}
            isLoading={isLoadingMore.current}
          >
            {t('Show more')}...
          </Button>
        </HStack>
      )}
    </VStack>
  )
}
