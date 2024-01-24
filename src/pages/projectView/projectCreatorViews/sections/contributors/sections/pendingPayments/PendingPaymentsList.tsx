import { Button, HStack, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { useProjectContext } from '../../../../../../../context'
import { usePaginationHook } from '../../../../../../../hooks/usePaginationHook'
import { standardPadding } from '../../../../../../../styles'
import {
  FundingConfirmInput,
  FundingTxOrderFragment,
  FundingTxsWhereFundingStatus,
  GetFundingTxsOrderByInput,
  GetFundingTxsWhereInput,
  OrderByOptions,
  useFundingConfirmMutation,
  useFundingTxsOrderGetQuery,
} from '../../../../../../../types'
import { useNotification } from '../../../../../../../utils'
import { EmptyContainer } from '../../components'
import { PendingPaymentsTable } from './PendingPaymentsTable'

const MAXIMUM_PARTIAL_PAYMENT_ITEMS = 15

export const PendingPaymentsList = () => {
  const { t } = useTranslation()
  const { project } = useProjectContext()
  const { toast } = useNotification()

  const where: GetFundingTxsWhereInput = {
    projectId: project?.id,
    status: FundingTxsWhereFundingStatus.PartiallyPaid,
  }

  const orderBy: GetFundingTxsOrderByInput = {
    createdAt: OrderByOptions.Desc,
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
      setData(
        ordersData.filter((order) => order.id !== data.fundingConfirm?.id),
      )
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

  return (
    <VStack width="100%" flexGrow={1} pt={'10px'} spacing="10px">
      {ordersData.length === 0 ? (
        <EmptyContainer text={t('No partial payments yet')} />
      ) : (
        <PendingPaymentsTable
          data={ordersData}
          handleUpdate={handleUpdateFundingStatus}
        />
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
