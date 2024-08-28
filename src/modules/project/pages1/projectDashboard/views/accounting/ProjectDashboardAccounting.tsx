import { Button, HStack, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'

import { SkeletonLayout } from '../../../../../../shared/components/layouts'
import { ProjectNoTransactionImageUrl } from '../../../../../../shared/constants'
import { usePaginationHook } from '../../../../../../shared/hooks/usePaginationHook'
import { standardPadding } from '../../../../../../shared/styles'
import {
  FundingTxOrderFragment,
  FundingTxsWhereFundingStatus,
  GetFundingTxsOrderByInput,
  GetFundingTxsWhereInput,
  OrderByOptions,
  useFundingTxsOrderGetQuery,
} from '../../../../../../types'
import { useNotification } from '../../../../../../utils'
import { DashboardLayout, ExportComponent } from '../../common'
import { EmptyContainer } from '../../components'
import { PaymentsAndAccountingTable } from './PaymentsAndAccountingTable'

const MAXIMUM_ACCOUNTING_ITEMS = 15

export const ProjectDashboardAccounting = () => {
  const { t } = useTranslation()
  const { project } = useProjectAtom()
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

  if (isLoading) return <ProjectDashboardAccountingSkeleton />

  return (
    <DashboardLayout desktopTitle={t('Accounting')} position="relative">
      <VStack width="100%" flexGrow={1} spacing="10px" alignItems="center" marginTop={'-48px'}>
        <HStack w="full" justifyContent={'end'} px={{ base: 3, lg: 6 }} top={6}>
          <ExportComponent />
        </HStack>
        {ordersData.length === 0 ? (
          <EmptyContainer image={ProjectNoTransactionImageUrl} text={t('No payments received yet')} />
        ) : (
          <PaymentsAndAccountingTable data={ordersData} setOrderBy={setOrderBy} orderBy={orderBy} />
        )}
        {!noMoreItems.current && (
          <HStack w="full" px={standardPadding}>
            <Button
              width="100%"
              variant="outline"
              colorScheme="neutral1"
              isLoading={isLoadingMore.current}
              onClick={() => fetchNext()}
            >
              {t('Show more')}...
            </Button>
          </HStack>
        )}
      </VStack>
    </DashboardLayout>
  )
}

export const ProjectDashboardAccountingSkeleton = () => {
  return (
    <DashboardLayout>
      <VStack width="100%" flexGrow={1} spacing="10px" paddingX={standardPadding} marginTop={{ base: '-48px', lg: 0 }}>
        <HStack w="full" justifyContent={'end'}>
          <SkeletonLayout width="140px" height="30px" />
        </HStack>
        <VStack w="full" spacing="10px">
          <SkeletonLayout borderRadius={0} height="30px" />
          <VStack w="full" spacing="24px">
            <SkeletonLayout borderRadius={0} height="24px" />
            <SkeletonLayout borderRadius={0} height="24px" />
            <SkeletonLayout borderRadius={0} height="24px" />
            <SkeletonLayout borderRadius={0} height="24px" />
          </VStack>
        </VStack>
      </VStack>
    </DashboardLayout>
  )
}
