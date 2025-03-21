import { Button, HStack, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { SkeletonLayout } from '@/shared/components/layouts'
import { Body, H2 } from '@/shared/components/typography'
import { RewardStatusLabel } from '@/shared/constants'
import { standardPadding } from '@/shared/styles'
import { OrdersGetStatus } from '@/types'
import { useNotification } from '@/utils'

import { RewardTable } from './components/RewardTable'
import { useRewardByStatus } from './hooks/useRewardByStatus'

export const RewardByStatus = ({ status }: { status: OrdersGetStatus }) => {
  const { t } = useTranslation()
  const { project } = useProjectAtom()
  const { toast } = useNotification()

  const {
    isLoading,
    isLoadingMore,
    noMoreItems,
    rewards,
    rewardsCount,
    updateOrderStatus,
    fetchNext,
    orderBy,
    setOrderBy,
  } = useRewardByStatus({
    status,
    projectId: project?.id,
    getRewardQueryProps: {
      onError(error) {
        toast({
          title: t('Error fetching rewards'),
          status: 'error',
          description: `${error}`,
        })
      },
    },
    statusUpdateMutationProps: {
      onCompleted() {
        toast({ title: t('Order status updated'), status: 'success' })
      },
      onError(error) {
        toast({
          title: t('Error updating order status'),
          status: 'error',
          description: `${error}`,
        })
      },
    },
  })

  if (isLoading || !rewards) {
    return <RewardByStatusSkeleton />
  }

  return (
    <VStack width="100%" flexGrow={1} spacing={0}>
      <HStack w="full" px={standardPadding}>
        <H2 size="xl" dark medium>
          {t(RewardStatusLabel[status])}
        </H2>
        <Body muted>{rewardsCount ? `(${rewardsCount})` : ''}</Body>
      </HStack>
      {rewards.length > 0 ? (
        <RewardTable
          status={status}
          data={rewards}
          updateOrderStatus={updateOrderStatus}
          orderBy={orderBy}
          setOrderBy={setOrderBy}
        />
      ) : (
        <HStack w="full" px={standardPadding}>
          <Body size="xs">{t('No items with this status.')}</Body>
        </HStack>
      )}
      {!noMoreItems.current && (
        <HStack w="full" px={standardPadding}>
          <Button
            size="sm"
            width="100%"
            variant="outline"
            colorScheme="neutral1"
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

export const RewardByStatusSkeleton = () => {
  return (
    <VStack width="100%" flexGrow={1} spacing="10px" paddingX={6}>
      <HStack w="full">
        <SkeletonLayout width="200px" height="25px" />
      </HStack>
      <VStack w="full" spacing="10px">
        <SkeletonLayout borderRadius={0} height="30px" />
        <VStack w="full" spacing="20px">
          <SkeletonLayout borderRadius={0} height="24px" />
          <SkeletonLayout borderRadius={0} height="24px" />
          <SkeletonLayout borderRadius={0} height="24px" />
        </VStack>
      </VStack>
    </VStack>
  )
}
