import { VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { ProjectRewardsImageUrl } from '../../../../../../shared/constants'
import { OrdersGetStatus } from '../../../../../../types'
import { EmptyContainer } from '../../components'
import { RewardByStatus } from './RewardByStatus'
import { useRewardEmptyAtom } from './state/rewardsAtom'

export const ProjectDashboardSales = () => {
  const { t } = useTranslation()
  const isRewardEmpty = useRewardEmptyAtom()

  if (isRewardEmpty) {
    return <EmptyContainer image={ProjectRewardsImageUrl} text={t('No rewards sold yet')} />
  }

  return (
    <VStack w="full" alignItems="flex-start" spacing="4">
      <RewardByStatus status={OrdersGetStatus.Confirmed} />
      <RewardByStatus status={OrdersGetStatus.Shipped} />
      <RewardByStatus status={OrdersGetStatus.Delivered} />
    </VStack>
  )
}
