import { GridItem, HStack, SimpleGrid, Stack } from '@chakra-ui/react'
import { t } from 'i18next'

import { SkeletonLayout } from '@/shared/components/layouts'
import { H3 } from '@/shared/components/typography'
import { useProjectRewardsTrendingWeeklyGetQuery } from '@/types'

import { ProjectRowLayout } from '../components/ProjectRowLayout'
import { TrendingRewardCard, TrendingRewardCardSkeleton } from '../components/TrendingRewardCard'

export const TrendingRewards = () => {
  const { data, loading } = useProjectRewardsTrendingWeeklyGetQuery({
    fetchPolicy: 'network-only',
  })

  const rewards = data?.projectRewardsTrendingWeeklyGet || []

  if (loading) {
    return <TrendingRewardsSkeleton />
  }

  if (rewards.length === 0) {
    return null
  }

  return (
    <ProjectRowLayout
      title={
        <HStack>
          <H3 size="2xl" dark bold>
            {t('Trending in rewards')}
          </H3>
        </HStack>
      }
      width="100%"
    >
      <SimpleGrid w="full" columns={{ base: 1, lg: 4 }} spacing={4}>
        {rewards.map((reward) => {
          return (
            <GridItem key={reward.projectReward.id}>
              <TrendingRewardCard reward={reward.projectReward} />
            </GridItem>
          )
        })}
      </SimpleGrid>
    </ProjectRowLayout>
  )
}

const TrendingRewardsSkeleton = () => {
  return (
    <ProjectRowLayout title={<SkeletonLayout height="38px" width="250px" />} width="100%">
      <Stack width="100%" direction={{ base: 'column', lg: 'row' }} spacing="20px">
        {[1, 2, 3, 4].map((id) => {
          return <TrendingRewardCardSkeleton key={id} />
        })}
      </Stack>
    </ProjectRowLayout>
  )
}
