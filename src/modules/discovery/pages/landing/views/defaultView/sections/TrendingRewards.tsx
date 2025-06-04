import { Button, GridItem, HStack, Icon, SimpleGrid, Stack } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiFire } from 'react-icons/pi'
import { Link } from 'react-router-dom'

import { SkeletonLayout } from '@/shared/components/layouts'
import { H3 } from '@/shared/components/typography'
import { getPath } from '@/shared/constants/index.ts'
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
        <HStack w="full" justifyContent={'space-between'}>
          <HStack spacing={1}>
            <H3 size="2xl" dark bold>
              {t('Trending products')}
            </H3>
            <Icon as={PiFire} fontSize={'24px'} color="orange.9" />
          </HStack>
          <Button variant="outline" colorScheme="neutral1" as={Link} to={getPath('discoveryProducts')}>
            {t('See all')}
          </Button>
        </HStack>
      }
      width="100%"
    >
      <SimpleGrid w="full" columns={{ base: 1, lg: 4 }} spacing={6}>
        {rewards.slice(0, 4).map((reward) => {
          return (
            <GridItem key={reward.projectReward.id}>
              <TrendingRewardCard reward={reward.projectReward} sold={reward.count} />
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
