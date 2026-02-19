import { Image, SimpleGrid, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { forwardRef, useMemo } from 'react'

import { useAuthContext } from '@/context'
import { useProjectRewardsAPI } from '@/modules/project/API/useProjectRewardsAPI'
import { useProjectAtom, useRewardsAtom } from '@/modules/project/hooks/useProjectAtom'
import { Body, H1 } from '@/shared/components/typography'
import { NoRewardsSoldUrl } from '@/shared/constants'

import { AonNotice } from './components/AonNotice.tsx'
import { CreatorRewardPageBottomBar, CreatorRewardPageTopBar } from './components/CreatorRewardPageBar.tsx'
import { ProjectVisitorBottomBar } from '../../components/ProjectVisitorBottomBar.tsx'
import { RewardCardSkeleton } from './components/RewardCard.tsx'
import { RewardCardWithBuy } from './components/RewardCardWithBuy.tsx'

export const ProjectRewards = forwardRef<HTMLDivElement>((_, ref) => {
  const { loading: userLoading } = useAuthContext()
  const { isProjectOwner, loading: projectLoading } = useProjectAtom()
  const { activeRewards, hiddenRewards, hasRewards } = useRewardsAtom()

  const { queryProjectRewards } = useProjectRewardsAPI(true)

  const loading = projectLoading || queryProjectRewards.loading || userLoading

  const sortedActiveRewards = useMemo(() => {
    if (activeRewards.length > 0) {
      return activeRewards.sort((a, b) => a.cost - b.cost)
    }

    return []
  }, [activeRewards])

  if (loading) {
    return (
      <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={4} width={'100%'}>
        {[1, 2, 3].map((i) => {
          return <RewardCardSkeleton key={i} />
        })}
      </SimpleGrid>
    )
  }

  return (
    <VStack w="full" spacing={8} alignItems="start" pb={28}>
      <CreatorRewardPageTopBar />
      <AonNotice />

      {!hasRewards && (
        <VStack w="full" alignItems={'center'}>
          <Image src={NoRewardsSoldUrl} alt="No products added yet." height="200px" width="200px" />
          <Body size="2xl" bold>
            {t('No products added yet.')}
          </Body>
        </VStack>
      )}

      {sortedActiveRewards.length > 0 && (
        <VStack w="full" alignItems={'start'}>
          <H1 size="2xl" bold display={{ base: 'unset', lg: 'none' }}>
            {t('Products')}
          </H1>
          <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={4} width={'100%'} pb={10}>
            {sortedActiveRewards.map((reward) => {
              return <RewardCardWithBuy key={reward.id} width="100%" reward={reward} />
            })}
          </SimpleGrid>
        </VStack>
      )}
      {isProjectOwner && hiddenRewards.length > 0 && (
        <VStack w="full" alignItems={'start'}>
          <Body size="2xl" bold>
            {t('Hidden products')}
          </Body>
          <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={4} width={'100%'}>
            {hiddenRewards.map((reward) => {
              return <RewardCardWithBuy hidden key={reward.id} width="100%" reward={reward} />
            })}
          </SimpleGrid>
        </VStack>
      )}
      <CreatorRewardPageBottomBar />
      <ProjectVisitorBottomBar />
    </VStack>
  )
})
