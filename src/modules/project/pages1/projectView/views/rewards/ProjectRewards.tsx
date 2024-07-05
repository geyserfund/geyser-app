import { SimpleGrid } from '@chakra-ui/react'
import { forwardRef } from 'react'

import { useInitRewards } from '@/modules/project/hooks/useInitRewards'
import { useProjectAtom, useRewardsAtom } from '@/modules/project/hooks/useProjectAtom'

import { RewardCardSkeleton } from './components/RewardCard'
import { RenderRewards } from './RenderRewards'

export const ProjectRewards = forwardRef<HTMLDivElement>((_, ref) => {
  const { isProjectOwner, loading: projectLoading } = useProjectAtom()
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

  const activeProjectRewards = isProjectOwner
    ? rewards
    : rewards.filter((reward) => reward && reward.isHidden === false)

  if (!activeProjectRewards.length) {
    return null
  }

  return (
    <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={4} width={'100%'} pb={'96px'}>
      <RenderRewards rewards={activeProjectRewards} />
    </SimpleGrid>
  )
})
