import { SimpleGrid, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { forwardRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuthContext } from '@/context'
import { useProjectRewardsAPI } from '@/modules/project/API/useProjectRewardsAPI'
import { useProjectAtom, useRewardsAtom } from '@/modules/project/hooks/useProjectAtom'
import { Body, H1 } from '@/shared/components/typography'
import { getPath } from '@/shared/constants'

import { CreatorRewardPageBottomBar, CreatorRewardPageTopBar } from './components/CreatorRewardPageBar'
import { RewardCardSkeleton, RewardCardWithBuy } from './shared'

export const ProjectRewards = forwardRef<HTMLDivElement>((_, ref) => {
  const { loading: userLoading } = useAuthContext()
  const { project, isProjectOwner, loading: projectLoading } = useProjectAtom()
  const { activeRewards, hiddenRewards, hasRewards } = useRewardsAtom()

  const navigate = useNavigate()

  const { queryProjectRewards } = useProjectRewardsAPI(true)

  const loading = projectLoading || queryProjectRewards.loading || userLoading

  useEffect(() => {
    let number: any

    if (!loading && !hasRewards) {
      number = setInterval(() => {
        navigate(getPath('project', project.name))
      }, 500)
    }

    return () => {
      clearInterval(number)
    }
  }, [hasRewards, navigate, project, loading])

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
    <VStack w="full" spacing={8} alignItems="start">
      <CreatorRewardPageTopBar />

      {activeRewards.length > 0 && (
        <VStack w="full" alignItems={'start'}>
          <H1 size="2xl" bold display={{ base: 'unset', lg: 'none' }}>
            {t('Rewards')}
          </H1>
          <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={4} width={'100%'} pb={'96px'}>
            {activeRewards.map((reward) => {
              return <RewardCardWithBuy key={reward.id} width="100%" reward={reward} />
            })}
          </SimpleGrid>
        </VStack>
      )}
      {isProjectOwner && hiddenRewards.length > 0 && (
        <VStack w="full" alignItems={'start'}>
          <Body size="2xl" bold>
            {t('Hidden rewards')}
          </Body>
          <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={4} width={'100%'} pb={'96px'}>
            {hiddenRewards.map((reward) => {
              return <RewardCardWithBuy hidden key={reward.id} width="100%" reward={reward} />
            })}
          </SimpleGrid>
        </VStack>
      )}
      <CreatorRewardPageBottomBar />
    </VStack>
  )
})
