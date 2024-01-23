import { Button, HStack, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { Body1 } from '../../../../../../../components/typography'
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

  const { fetchMore } = useFundingTxsOrderGetQuery({
    skip: !project?.id,
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

  return (
    <VStack width="100%" flexGrow={1} pt={'10px'} spacing="10px">
      {ordersData.length === 0 ? (
        <HStack w="full" px={standardPadding}>
          <Body1>{t('No data')}</Body1>
        </HStack>
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
