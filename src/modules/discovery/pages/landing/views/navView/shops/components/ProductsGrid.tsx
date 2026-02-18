import { GridItem, SimpleGrid, Stack, VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { SkeletonLayout } from '@/shared/components/layouts/SkeletonLayout.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { ProjectRewardsMostSoldRange, useProjectRewardsMostSoldGetQuery } from '@/types/index.ts'
import { useNotification } from '@/utils/index.ts'

import {
  TrendingRewardCard,
  TrendingRewardCardSkeleton,
} from '../../../mainView/defaultView/components/TrendingRewardCard.tsx'

type ProductsGridProps = {
  category?: string
}

export const ProductsGrid = ({ category }: ProductsGridProps) => {
  const toast = useNotification()
  const { data, loading } = useProjectRewardsMostSoldGetQuery({
    fetchPolicy: 'network-only',
    variables: {
      input: {
        category,
        range: ProjectRewardsMostSoldRange.Quarter,
        take: 24,
      },
    },
    onError() {
      toast.error({ title: t('Failed to fetch products') })
    },
  })

  const rewards = data?.projectRewardsMostSoldGet || []

  if (loading) {
    return <ProductsGridSkeleton />
  }

  if (!rewards.length) {
    return <Body>{t('No products found')}</Body>
  }

  return (
    <SimpleGrid w="full" columns={{ base: 1, lg: 4 }} spacing={{ base: 4, lg: 8 }}>
      {rewards.map((reward) => {
        return (
          <GridItem key={reward.projectReward.id}>
            <TrendingRewardCard reward={reward.projectReward} sold={reward.count} />
          </GridItem>
        )
      })}
    </SimpleGrid>
  )
}

const ProductsGridSkeleton = () => {
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
