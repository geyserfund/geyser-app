import { GridItem, HStack, Icon, SimpleGrid, Stack, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiFire } from 'react-icons/pi'

import { Body } from '@/shared/components/typography/Body.tsx'
import { H3 } from '@/shared/components/typography/Heading.tsx'
import { useProjectRewardsTrendingMonthlyGetQuery } from '@/types/index.ts'
import { useNotification } from '@/utils/index.ts'

import {
  TrendingRewardCard,
  TrendingRewardCardSkeleton,
} from './landing/views/defaultView/components/TrendingRewardCard.tsx'

export const Products = () => {
  const toast = useNotification()
  const { data, loading } = useProjectRewardsTrendingMonthlyGetQuery({
    fetchPolicy: 'network-only',
    onError(error) {
      toast.error({ title: t('Failed to fetch recent products') })
    },
  })

  const rewards = data?.projectRewardsTrendingMonthlyGet || []

  return (
    <VStack w="full" height="full" spacing={6}>
      <HStack w="full" justifyContent={'start'} alignItems={'center'}>
        <H3 size="2xl" dark bold>
          {t('Trending products on Geyser this month')}
        </H3>
        <Icon as={PiFire} fontSize={'24px'} color="orange.9" />
      </HStack>
      {loading ? (
        <TrendingRewardsSkeleton />
      ) : rewards.length > 0 ? (
        <SimpleGrid w="full" columns={{ base: 1, lg: 4 }} spacing={4}>
          {rewards.map((reward) => {
            return (
              <GridItem key={reward.projectReward.id}>
                <TrendingRewardCard reward={reward.projectReward} sold={reward.count} />
              </GridItem>
            )
          })}
        </SimpleGrid>
      ) : (
        <Body>{t('No trending products found')}</Body>
      )}
    </VStack>
  )
}

const TrendingRewardsSkeleton = () => {
  return (
    <Stack width="100%" direction={{ base: 'column', lg: 'row' }} spacing="20px">
      {[1, 2, 3, 4].map((id) => {
        return <TrendingRewardCardSkeleton key={id} />
      })}
    </Stack>
  )
}
