import { Box, HStack, Image, Link as ChakraLink, SimpleGrid } from '@chakra-ui/react'
import { t } from 'i18next'
import { useMemo } from 'react'
import ReactPlayer from 'react-player'
import { Link } from 'react-router'

import { filterPostsByUniqueProjects } from '@/helpers/filterPostsByUniqueProjects.ts'
import { DiscoverMoreButton } from '@/modules/discovery/components/DiscoverMoreButton.tsx'
import { getPath } from '@/shared/constants/index.ts'
import { OrderByOptions, PostType, usePostsForLandingPageQuery } from '@/types/index.ts'

import { TwitterAnnouncementImageUrl, TwitterAnnouncementLinkUrl } from '../../../../constants.ts'
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
          take: 15,
        },
        where: {
          postType: [PostType.Impact, PostType.Announcement],
        },
      },
    },
  })

  const allPosts = useMemo(() => data?.posts || [], [data?.posts])

  const posts = useMemo(() => filterPostsByUniqueProjects(allPosts, 3), [allPosts])

  if (loading || !posts.length) {
    return null
  }

  return (
    <ProjectRowLayout
      title={t("What's happening")}
      width="100%"
      rightContent={<DiscoverMoreButton as={Link} to={getPath('discoveryActivity')} />}
    >
      <HStack w="full" gap={4} flexWrap="wrap"></HStack>
      <SimpleGrid w="full" columns={{ base: 1, lg: 3 }} spacing={{ base: 4, lg: 8 }} paddingTop={4}>
        <Box as={ChakraLink} href={TwitterAnnouncementLinkUrl} isExternal flex={1} borderRadius="8px" overflow="hidden">
          <Image
            src={TwitterAnnouncementImageUrl}
            alt="Recent Impact Post"
            width="100%"
            height="100%"
            objectFit="cover"
          />
        </Box>
        <Box flex={1} borderRadius="8px" overflow="hidden">
          <ReactPlayer url="https://www.youtube.com/watch?v=e5PTRMz27vA" controls={true} width="100%" height="100%" />
        </Box>
        <Box flex={1} borderRadius="8px" overflow="hidden">
          <ReactPlayer url="https://www.youtube.com/watch?v=i6FIvDddrdw" controls={true} width="100%" height="100%" />
        </Box>
        {posts.map((post) => {
          return <LandingPostCard key={post.id} post={post} isMobile />
        })}
      </SimpleGrid>
    </ProjectRowLayout>
  )
}
