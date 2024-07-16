import { Button, HStack, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { SkeletonLayout } from '../../../../../../../../../../shared/components/layouts'
import { ProjectNoTransactionImageUrl } from '../../../../../../../../../../shared/constants'
import { usePaginationHook } from '../../../../../../../../../../shared/hooks/usePaginationHook'
import { standardPadding } from '../../../../../../../../../../styles'
import {
  FundingTxOrderFragment,
  FundingTxsWhereFundingStatus,
  GetFundingTxsOrderByInput,
  GetFundingTxsWhereInput,
  OrderByOptions,
  useFundingTxsOrderGetQuery,
} from '../../../../../../../../../../types'
import { useNotification } from '../../../../../../../../../../utils'
import { useProjectContext } from '../../../../../../../../context'
import { EmptyContainer } from '../../components'
import { PaymentsAndAccountingTable } from './PaymentsAndAccountingTable'

const MAXIMUM_ACCOUNTING_ITEMS = 15

export const PaymentsAndAccoutningList = () => {
  const { t } = useTranslation()
  const { project } = useProjectContext()
  const { toast } = useNotification()

  const [isLoading, setIsLoading] = useState(true)
  const [orderBy, setOrderBy] = useState<GetFundingTxsOrderByInput>({
    createdAt: OrderByOptions.Desc,
  })

  const where: GetFundingTxsWhereInput = {
    projectId: project?.id,
    status: FundingTxsWhereFundingStatus.Paid,
  }

  const { fetchMore } = useFundingTxsOrderGetQuery({
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
      setIsLoading(false)
    },
    onError(error) {
      toast({
        title: t('Error fetching payments'),
        description: `${error.message}`,
        status: 'error',
      })
      setIsLoading(false)
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

  if (isLoading) return <PaymentsAndAccoutningListSkeleton />

  return (
    <VStack width="100%" flexGrow={1} pt={'10px'} spacing="10px" alignItems="center">
      {ordersData.length === 0 ? (
        <EmptyContainer image={ProjectNoTransactionImageUrl} text={t('No payments received yet')} />
      ) : (
        <PaymentsAndAccountingTable data={ordersData} setOrderBy={setOrderBy} orderBy={orderBy} />
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
