import { Button, HStack, Text, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { SkeletonLayout } from '../../../../../../../../../../components/layouts'
import { usePaginationHook } from '../../../../../../../../../../hooks/usePaginationHook'
import { standardPadding } from '../../../../../../../../../../styles'
import {
  FundingConfirmInput,
  FundingTxOrderFragment,
  FundingTxsWhereFundingStatus,
  GetFundingTxsOrderByInput,
  GetFundingTxsWhereInput,
  OrderByOptions,
  useFundingConfirmMutation,
  useFundingTxsOrderGetQuery,
} from '../../../../../../../../../../types'
import { useNotification } from '../../../../../../../../../../utils'
import { useProjectContext } from '../../../../../../../../context'
import { PendingPaymentsTable } from './PendingPaymentsTable'

const MAXIMUM_PARTIAL_PAYMENT_ITEMS = 15

export const PendingPaymentsList = () => {
  const { t } = useTranslation()
  const { project } = useProjectContext()
  const { toast } = useNotification()

  const [loading, setLoading] = useState(true)

  const [orderBy, setOrderBy] = useState<GetFundingTxsOrderByInput>({
    createdAt: OrderByOptions.Desc,
  })

  const where: GetFundingTxsWhereInput = {
    projectId: project?.id,
    status: FundingTxsWhereFundingStatus.PartiallyPaid,
  }

  const { fetchMore } = useFundingTxsOrderGetQuery({
    skip: !project?.id,
    fetchPolicy: 'no-cache',
    variables: {
      input: {
        where,
        orderBy,
        pagination: {
          take: MAXIMUM_PARTIAL_PAYMENT_ITEMS,
        },
      },
    },
    onCompleted(data) {
      handleDataUpdate(data.fundingTxsGet?.fundingTxs || [])
      setLoading(false)
    },
    onError(error) {
      toast({
        title: t('Error fetching payments'),
        description: `${error.message}`,
        status: 'error',
      })
      setLoading(false)
    },
  })

  const {
    handleDataUpdate,
    data: ordersData,
    isLoadingMore,
    noMoreItems,
    fetchNext,
    setData,
  } = usePaginationHook<FundingTxOrderFragment>({
    fetchMore,
    queryName: ['fundingTxsGet', 'fundingTxs'],
    itemLimit: MAXIMUM_PARTIAL_PAYMENT_ITEMS,
    where,
    orderBy,
  })

  const [confirmFunding] = useFundingConfirmMutation({
    onCompleted(data) {
      if (data.fundingConfirm?.id === undefined) return
      setData(ordersData.filter((order) => order.id !== data.fundingConfirm?.id))
      toast({ title: 'Transaction updated successfully', status: 'success' })
    },
    onError(error) {
      toast({
        title: 'Error updating transactions',
        status: 'error',
        description: `${error}`,
      })
    },
  })

  const handleUpdateFundingStatus = async (input: FundingConfirmInput) => {
    await confirmFunding({
      variables: {
        input,
      },
    })
  }

  if (loading) return <PendingPaymentsListSkeleton />

  return (
    <VStack width="100%" flexGrow={1} pt={'10px'} spacing="10px">
      {ordersData.length === 0 ? (
        <Text>{t('No items with this status.')}</Text>
      ) : (
        <PendingPaymentsTable
          data={ordersData}
          handleUpdate={handleUpdateFundingStatus}
          setOrderBy={setOrderBy}
          orderBy={orderBy}
        />
      )}
      {!noMoreItems.current && (
        <HStack w="full" px={standardPadding}>
          <Button width="100%" variant="secondary" isLoading={isLoadingMore.current} onClick={() => fetchNext()}>
            {t('Show more')}...
          </Button>
        </HStack>
      )}
    </VStack>
  )
}

export const PendingPaymentsListSkeleton = () => {
  return (
    <VStack width="100%" flexGrow={1} pt={'30px'} spacing="10px">
      <VStack w="full" spacing="10px">
        <SkeletonLayout borderRadius={0} height="30px" />
        <VStack w="full" spacing="60px">
          <SkeletonLayout borderRadius={0} height="60px" />
          <SkeletonLayout borderRadius={0} height="60px" />
          <SkeletonLayout borderRadius={0} height="60px" />
          <SkeletonLayout borderRadius={0} height="60px" />
        </VStack>
      </VStack>

      <HStack w="full" px={standardPadding}>
        <SkeletonLayout height="40px" />
      </HStack>
    </VStack>
  )
}
