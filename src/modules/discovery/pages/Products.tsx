import { GridItem, HStack, SimpleGrid, Stack, VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { SkeletonLayout } from '@/shared/components/layouts/SkeletonLayout.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { H3 } from '@/shared/components/typography/Heading.tsx'
import { ProjectSubCategoryLabel } from '@/shared/constants/platform/projectCategory.ts'
import {
  ProjectSubCategory,
  RewardForProductsPageFragment,
  useProjectRewardsTrendingQuarterlyGetQuery,
} from '@/types/index.ts'
import { useNotification } from '@/utils/index.ts'

import {
  TrendingRewardCard,
  TrendingRewardCardSkeleton,
} from './landing/views/defaultView/components/TrendingRewardCard.tsx'

export const Products = () => {
  const toast = useNotification()
  const { data, loading } = useProjectRewardsTrendingQuarterlyGetQuery({
    fetchPolicy: 'network-only',
    onError(error) {
      toast.error({ title: t('Failed to fetch recent products') })
    },
  })

  const rewards = data?.projectRewardsTrendingQuarterlyGet || []

  const rewardsBySubCategory = rewards.reduce((acc, reward) => {
    const { subCategory } = reward.projectReward.project
    if (!subCategory || !reward.projectReward) {
      return acc
    }

    if (!acc[subCategory]) {
      acc[subCategory] = []
    }

    if (reward.projectReward) {
      acc[subCategory].push(reward)
    }

    return acc
  }, {} as Record<ProjectSubCategory, { count: number; projectReward: RewardForProductsPageFragment }[]>)

  const rewardsBySubCategorySorted = Object.entries(rewardsBySubCategory)
    // Sort by length of each subcategory's rewards array (descending)
    .sort(([, rewardsA], [, rewardsB]) => rewardsB.length - rewardsA.length)
    // Map to the required format
    .map(([subCategory, rewards]) => ({
      subCategory,
      values: rewards
        // Transform rewards to include count property
        .map((reward) => ({
          count: reward.count || 1, // Use count if it exists, otherwise default to 1
          projectReward: reward.projectReward,
        }))
        // Sort values by count (descending)
        .sort((a, b) => b.count - a.count),
    }))

  if (loading) {
    return <TrendingRewardsSkeleton />
  }

  if (rewards.length === 0) {
    return <Body>{t('No trending products found')}</Body>
  }

  return (
    <VStack w="full" height="full" spacing={{ base: 6, lg: 12 }}>
      {rewardsBySubCategorySorted.map(({ subCategory, values }) => {
        return (
          <VStack w="full" key={subCategory} spacing={5}>
            <HStack w="full" justifyContent={'start'} alignItems={'center'}>
              <H3 size="2xl" dark bold>
                {t('Trending in')}{' '}
                <Body as="span" color="primary1.11" bold>
                  {' '}
                  {ProjectSubCategoryLabel[subCategory]}
                </Body>
              </H3>
            </HStack>
            <SimpleGrid w="full" columns={{ base: 1, lg: 4 }} spacing={{ base: 4, lg: 8 }}>
              {values.map((reward) => {
                return (
                  <GridItem key={reward.projectReward.id}>
                    <TrendingRewardCard reward={reward.projectReward} sold={reward.count} />
                  </GridItem>
                )
              })}
            </SimpleGrid>
          </VStack>
        )
      })}
    </VStack>
  )
}

const TrendingRewardsSkeleton = () => {
  return (
    <VStack w="full" spacing={4} alignItems="start">
      <SkeletonLayout w="200px" height="28px" />
      <Stack width="100%" direction={{ base: 'column', lg: 'row' }} spacing="20px">
        {[1, 2, 3, 4].map((id) => {
          return <TrendingRewardCardSkeleton key={id} />
        })}
      </Stack>
    </VStack>
  )
}
