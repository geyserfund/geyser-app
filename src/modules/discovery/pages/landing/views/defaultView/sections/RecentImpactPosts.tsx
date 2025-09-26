import { SimpleGrid } from '@chakra-ui/react'
import { t } from 'i18next'

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
          take: 4,
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
    <ProjectRowLayout title={t('Recent Impact Posts')} width="100%">
      <SimpleGrid w="full" columns={{ base: 1, md: 2 }} spacing={{ base: 4, lg: 8 }}>
        {posts.map((post) => {
          return <LandingPostCard key={post.id} post={post} isMobile />
        })}
      </SimpleGrid>
    </ProjectRowLayout>
  )
}
