import { Button, HStack, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { SkeletonLayout } from '../../../../../../../components/layouts'
import { Body1, H2, H3 } from '../../../../../../../components/typography'
import { RewardStatus, RewardStatusLabel } from '../../../../../../../constants'
import { useProjectContext } from '../../../../../../../context'
import { standardPadding } from '../../../../../../../styles'
import { useNotification } from '../../../../../../../utils'
import { RewardTable } from './components/RewardTable'
import { useRewardByStatus } from './hooks/useRewardByStatus'

export const RewardByStatus = ({ status }: { status: RewardStatus }) => {
  const { t } = useTranslation()
  const { project } = useProjectContext()
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
          title: 'Error fetching rewards',
          status: 'error',
          description: `${error}`,
        })
      },
    },
    statusUpdateMutationProps: {
      onCompleted() {
        toast({ title: 'Order status updated', status: 'success' })
      },
      onError(error) {
        toast({
          title: 'Error updating order status',
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
    <VStack width="100%" flexGrow={1} pt={'10px'} spacing="10px">
      <HStack w="full" px={standardPadding}>
        <H2 color="neutral.900">{t(RewardStatusLabel[status])}</H2>
        <H3 color="neutral.600">{rewardsCount ? `(${rewardsCount})` : ''}</H3>
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
          <Body1>{t('No items with this status.')}</Body1>
        </HStack>
      )}
      {!noMoreItems.current && (
        <HStack w="full" px={standardPadding}>
          <Button width="100%" variant="secondary" onClick={() => fetchNext()} isLoading={isLoadingMore.current}>
            {t('Show more')}...
          </Button>
        </HStack>
      )}
    </VStack>
  )
}

export const RewardByStatusSkeleton = () => {
  return (
    <VStack width="100%" flexGrow={1} pt={'20px'} spacing="10px">
      <HStack w="full" px={standardPadding}>
        <SkeletonLayout width="200px" height="30px" />
      </HStack>
      <VStack w="full" spacing="10px">
        <SkeletonLayout borderRadius={0} height="30px" />
        <VStack w="full" spacing="60px">
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
