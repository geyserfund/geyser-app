import { SimpleGrid } from '@chakra-ui/react'
import { t } from 'i18next'
import { Link } from 'react-router'

import { DiscoverMoreButton } from '@/modules/discovery/components/DiscoverMoreButton.tsx'
import { getPath } from '@/shared/constants/index.ts'
import { standardPadding } from '@/shared/styles/reponsiveValues.ts'
import { OrderByOptions, PostType, usePostsForLandingPageQuery } from '@/types/index.ts'

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
          take: 9,
        },
        where: {
          postType: [PostType.Impact, PostType.RewardUpdate, PostType.Announcement, PostType.GoalReached],
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
      width="100%"
      rightContent={<DiscoverMoreButton as={Link} to={getPath('discoveryActivity')} />}
    >
      <SimpleGrid w="full" columns={{ base: 1, lg: 3 }} spacing={standardPadding}>
        {posts.map((post) => {
          return <LandingPostCard key={post.id} post={post} isMobile />
        })}
      </SimpleGrid>
    </ProjectRowLayout>
  )
}
