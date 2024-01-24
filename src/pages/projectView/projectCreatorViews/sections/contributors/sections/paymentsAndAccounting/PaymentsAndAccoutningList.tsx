import { Button, HStack, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { SkeletonLayout } from '../../../../../../../components/layouts'
import { useProjectContext } from '../../../../../../../context'
import { usePaginationHook } from '../../../../../../../hooks/usePaginationHook'
import { standardPadding } from '../../../../../../../styles'
import {
  FundingTxOrderFragment,
  FundingTxsWhereFundingStatus,
  GetFundingTxsOrderByInput,
  GetFundingTxsWhereInput,
  OrderByOptions,
  useFundingTxsOrderGetQuery,
} from '../../../../../../../types'
import { EmptyContainer } from '../../components'
import { PaymentsAndAccountingTable } from './PaymentsAndAccountingTable'

const MAXIMUM_ACCOUNTING_ITEMS = 15

export const PaymentsAndAccoutningList = () => {
  const { t } = useTranslation()
  const { project } = useProjectContext()

  const where: GetFundingTxsWhereInput = {
    projectId: project?.id,
    status: FundingTxsWhereFundingStatus.Paid,
  }

  const orderBy: GetFundingTxsOrderByInput = {
    createdAt: OrderByOptions.Desc,
  }

  const { fetchMore, loading } = useFundingTxsOrderGetQuery({
    skip: !project?.id,
    fetchPolicy: 'no-cache',
    variables: {
      input: {
        where,
        orderBy,
        pagination: {
          take: MAXIMUM_ACCOUNTING_ITEMS,
        },
      },
    },
    onCompleted(data) {
      handleDataUpdate(data.fundingTxsGet?.fundingTxs || [])
    },
  })

  const {
    handleDataUpdate,
    data: ordersData,
    isLoadingMore,
    noMoreItems,
    fetchNext,
  } = usePaginationHook<FundingTxOrderFragment>({
    fetchMore,
    queryName: ['fundingTxsGet', 'fundingTxs'],
    itemLimit: MAXIMUM_ACCOUNTING_ITEMS,
    where,
    orderBy,
  })

  if (loading) return <PaymentsAndAccoutningListSkeleton />

  return (
    <VStack
      width="100%"
      flexGrow={1}
      pt={'10px'}
      spacing="10px"
      alignItems="center"
    >
      {ordersData.length === 0 ? (
        <EmptyContainer text={t('No payments received yet')} />
      ) : (
        <PaymentsAndAccountingTable data={ordersData} />
      )}
      {!noMoreItems.current && (
        <HStack w="full" px={standardPadding}>
          <Button
            width="100%"
            variant="secondary"
            isLoading={isLoadingMore.current}
            onClick={() => fetchNext()}
          >
            {t('Show more')}...
          </Button>
        </HStack>
      )}
    </VStack>
  )
}

export const PaymentsAndAccoutningListSkeleton = () => {
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
