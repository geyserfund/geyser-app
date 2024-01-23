import { Button, HStack, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { Body1, H2 } from '../../../../../../../components/typography'
import { useProjectContext } from '../../../../../../../context'
import { usePaginationHook } from '../../../../../../../hooks/usePaginationHook'
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
    },
  })

  const {
    handleDataUpdate,
    data: ordersData,
    isLoadingMore,
    noMoreItems,
    fetchNext,
    setData,
  } = usePaginationHook<OrderFragment>({
    fetchMore,
    queryName: ['ordersGet', 'orders'],
    itemLimit: MAXIMUM_REWARD_ITEMS,
    where,
    orderBy,
  })

  const [updateOrderStatus] = useOrderStatusUpdateMutation({
    onCompleted(data) {
      if (data.orderStatusUpdate?.id === undefined) return
      setData(
        ordersData.map((order) =>
          order.id === data.orderStatusUpdate?.id
            ? { ...order, ...data.orderStatusUpdate }
            : order,
        ),
      )
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
        <H2>{t(RewardStatusLabel[status])}</H2>
      </HStack>
      {ordersData.length === 0 ? (
        <HStack w="full" px={standardPadding}>
          <Body1>{t('No data')}</Body1>
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
