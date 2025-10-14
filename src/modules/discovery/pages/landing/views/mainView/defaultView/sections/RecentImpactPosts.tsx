import { HStack, SimpleGrid, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { Link } from 'react-router'

import { DiscoverMoreButton } from '@/modules/discovery/components/DiscoverMoreButton.tsx'
import { getPath } from '@/shared/constants/index.ts'
import {
  OrderByOptions,
  PostType,
  useLandingPageFeaturedContributionsGetQuery,
  usePostsForLandingPageQuery,
} from '@/types/index.ts'

import { ContributionCard } from '../components/FeaturedContributions.tsx'
import { LandingPageSectionTitle } from '../components/LandingPageSectionTitle.tsx'
import { LandingPostCard } from '../components/LandingPostCard.tsx'
import { ProjectRowLayout } from '../components/ProjectRowLayout.tsx'

export const RecentImpactPosts = () => {
  const { data, loading } = usePostsForLandingPageQuery({
    variables: {
      input: {
        orderBy: {
          publishedAt: OrderByOptions.Desc,
        },
        pagination: {
          take: 4,
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
          take: 12,
        },
      },
    },
  })

  const posts = data?.posts || []

  if (loading || !posts.length) {
    return null
  }

  return (
    <ProjectRowLayout
      title={t("What's happening")}
      subtitle={t('Discover the latest activity')}
      width="100%"
      rightContent={<DiscoverMoreButton as={Link} to={getPath('discoveryActivity')} />}
    >
      <HStack alignItems="stretch" flexDirection={{ base: 'column', lg: 'row' }}>
        <VStack flex={2} w="full" alignItems="start" justifyContent="start">
          <LandingPageSectionTitle>{t('Impact Posts')}</LandingPageSectionTitle>
          <SimpleGrid w="full" columns={{ base: 1, md: 1 }} spacingY={0}>
            {posts.map((post) => {
              return <LandingPostCard key={post.id} post={post} />
            })}
          </SimpleGrid>
        </VStack>

        <VStack w="full" flex={1} alignItems="start" justifyContent="start" spacing={8}>
          <LandingPageSectionTitle>{t('Latest Contributions')}</LandingPageSectionTitle>
          <VStack w="full" alignItems="start" spacing={6}>
            {!contributionsLoading &&
              contributionsData?.contributionsGet?.contributions.map((contribution) => {
                return (
                  <ContributionCard key={contribution.id} contribution={contribution} textMaxWidth="100px" size="lg" />
                )
              })}
          </VStack>
        </VStack>
      </HStack>
    </ProjectRowLayout>
  )
}
