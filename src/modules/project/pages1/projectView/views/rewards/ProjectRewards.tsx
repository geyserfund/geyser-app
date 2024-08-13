import { SimpleGrid, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { forwardRef } from 'react'

import { useProjectRewardsAPI } from '@/modules/project/API/useProjectRewardsAPI'
import { useProjectAtom, useRewardsAtom } from '@/modules/project/hooks/useProjectAtom'
import { Body } from '@/shared/components/typography'

import { CreatorRewardPageBottomBar, CreatorRewardPageTopBar } from './components/CreatorRewardPageBar'
import { RewardCardSkeleton, RewardCardWithBuy } from './shared'

export const ProjectRewards = forwardRef<HTMLDivElement>((_, ref) => {
  const { isProjectOwner, loading: projectLoading } = useProjectAtom()
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

  const activeProjectRewards = rewards.filter((reward) => reward && reward.isHidden === false)

  const hiddenProjectRewards = rewards.filter((reward) => reward && reward.isHidden === true)

  if (!activeProjectRewards.length && (isProjectOwner || hiddenProjectRewards.length === 0)) {
    return null
  }

  return (
    <VStack w="full" spacing={8}>
      <CreatorRewardPageTopBar />
      <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={4} width={'100%'} pb={'96px'}>
        {activeProjectRewards.map((reward) => {
          return <RewardCardWithBuy key={reward.id} width="100%" reward={reward} />
        })}
      </SimpleGrid>
      {isProjectOwner && hiddenProjectRewards.length > 0 && (
        <VStack w="full" alignItems={'start'}>
          <Body size="2xl" bold>
            {t('Hidden rewards')}
          </Body>
          <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={4} width={'100%'} pb={'96px'}>
            {hiddenProjectRewards.map((reward) => {
              return <RewardCardWithBuy hidden key={reward.id} width="100%" reward={reward} />
            })}
          </SimpleGrid>
        </VStack>
      )}
      <CreatorRewardPageBottomBar />
    </VStack>
  )
})