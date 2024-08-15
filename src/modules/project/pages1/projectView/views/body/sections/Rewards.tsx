import { Button, HStack, SimpleGrid } from '@chakra-ui/react'
import { forwardRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { useProjectRewardsAPI } from '@/modules/project/API/useProjectRewardsAPI'
import { getPath } from '@/shared/constants'

import { isActive } from '../../../../../../../utils'
import { useProjectAtom, useRewardsAtom } from '../../../../../hooks/useProjectAtom'
import { RewardCardSkeleton, RewardCardWithBuy } from '../../rewards/shared'
import { BodySectionLayout } from '../components'

export const Rewards = forwardRef<HTMLDivElement>((_, ref) => {
  const { t } = useTranslation()

  const { project, loading: projectLoading } = useProjectAtom()
  const { rewards } = useRewardsAtom()

  const { queryProjectRewards } = useProjectRewardsAPI(true)

  const loading = projectLoading || queryProjectRewards.loading

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

  const hasMoreRewards = activeProjectRewards.length > 4

  const rewardsToRender = hasMoreRewards ? activeProjectRewards.slice(0, 4) : activeProjectRewards

  if (!rewardsToRender.length) {
    return null
  }

  return (
    <BodySectionLayout ref={ref} title={t('Rewards')}>
      <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4} width={'100%'}>
        {rewardsToRender.map((reward) => {
          return <RewardCardWithBuy key={reward.id} width="100%" reward={reward} />
        })}
      </SimpleGrid>
      {hasMoreRewards && (
        <HStack w="full" justifyContent="center">
          <Button
            as={Link}
            to={getPath('projectRewards', project.name)}
            size="sm"
            variant="outline"
            colorScheme="neutral1"
          >
            {t('See all')}
          </Button>
        </HStack>
      )}
    </BodySectionLayout>
  )
})
