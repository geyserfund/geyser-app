import { HStack, SimpleGrid, VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import {
  OrderByOptions,
  PostType,
  useLandingPageFeaturedContributionsGetQuery,
  usePostsForLandingPageQuery,
} from '@/types/index.ts'

import { ContributionCard } from '../components/FeaturedContributions.tsx'
import { LandingPageSectionTitle } from '../components/LandingPageSectionTitle.tsx'
import { LandingPostCard } from '../components/LandingPostCard.tsx'

export const RecentImpactPosts = () => {
  const { data, loading } = usePostsForLandingPageQuery({
    variables: {
      input: {
        orderBy: {
          publishedAt: OrderByOptions.Desc,
        },
        pagination: {
          take: 2,
        },
        where: {
          postType: [PostType.Impact, PostType.RewardUpdate, PostType.Announcement, PostType.GoalReached],
        },
      },
    },
  })

  const { data: contributionsData, loading: contributionsLoading } = useLandingPageFeaturedContributionsGetQuery({
    variables: {
      input: {
        orderBy: {
          createdAt: OrderByOptions.Desc,
        },
        pagination: {
          take: 10,
        },
      },
    },
  })

  const posts = data?.posts || []

  if (loading || !posts.length) {
    return null
  }

  return (
    <HStack alignItems="stretch">
      <VStack flex={2} w="full" alignItems="start" justifyContent="start">
        <LandingPageSectionTitle color="utils.text">{t('Impact Posts')}</LandingPageSectionTitle>
        <SimpleGrid w="full" columns={{ base: 1, md: 1 }}>
          {posts.map((post) => {
            return <LandingPostCard key={post.id} post={post} />
          })}
        </SimpleGrid>
      </VStack>

      <VStack w="full" flex={1} alignItems="start" justifyContent="start" spacing={10}>
        <LandingPageSectionTitle color="utils.text">{t('Latest Contributions')}</LandingPageSectionTitle>
        <VStack w="full" alignItems="start" spacing={4}>
          {!contributionsLoading &&
            contributionsData?.contributionsGet?.contributions.map((contribution) => {
              return <ContributionCard key={contribution.id} contribution={contribution} textMaxWidth="100px" />
            })}
        </VStack>
      </VStack>
    </HStack>
  )
}
