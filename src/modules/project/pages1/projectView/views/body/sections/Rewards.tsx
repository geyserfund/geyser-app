import { SimpleGrid } from '@chakra-ui/react'
import { forwardRef } from 'react'
import { useTranslation } from 'react-i18next'

import { useInitRewards } from '@/modules/project/hooks/useInitRewards'

import { isActive } from '../../../../../../../utils'
import { useProjectAtom, useRewardsAtom } from '../../../../../hooks/useProjectAtom'
import { RewardCard, RewardCardSkeleton } from '../../rewards/components'
import { BodySectionLayout } from '../components'

export const Rewards = forwardRef<HTMLDivElement>((_, ref) => {
  const { t } = useTranslation()

  const { project, loading: projectLoading } = useProjectAtom()
  const { rewards } = useRewardsAtom()

  const { rewardsLoading } = useInitRewards(true)

  const loading = projectLoading || rewardsLoading

  if (loading) {
    return (
      <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={4} width={'100%'}>
        {[1, 2, 3].map((i) => {
          return <RewardCardSkeleton key={i} />
        })}
      </SimpleGrid>
    )
  }

  if (!isActive(project.status) || rewards.length === 0 || loading) {
    return null
  }

  const activeProjectRewards = rewards.filter((reward) => reward && reward.isHidden === false)

  if (!activeProjectRewards.length) {
    return null
  }

  return (
    <BodySectionLayout ref={ref} title={t('Rewards')}>
      <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4} width={'100%'}>
        {rewards.map((reward) => {
          return <RewardCard key={reward.id} width="100%" reward={reward} />
        })}
      </SimpleGrid>
    </BodySectionLayout>
  )
})
