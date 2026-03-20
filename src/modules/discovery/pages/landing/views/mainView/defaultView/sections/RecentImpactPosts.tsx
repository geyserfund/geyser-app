import { Box, Button, Image, Link as ChakraLink, SimpleGrid, Skeleton, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useMemo } from 'react'
import ReactPlayer from 'react-player'
import { Link } from 'react-router'

import { filterPostsByUniqueProjects } from '@/helpers/filterPostsByUniqueProjects.ts'
import { DiscoverMoreButton } from '@/modules/discovery/components/DiscoverMoreButton.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { getPath } from '@/shared/constants/index.ts'
import { OrderByOptions, PostType, usePostsForLandingPageQuery } from '@/types/index.ts'

import { TwitterAnnouncementImageUrl, TwitterAnnouncementLinkUrl } from '../../../../constants.ts'
import { LandingPostCard } from '../components/LandingPostCard.tsx'
import { NewsletterSignupCard } from '../components/NewsletterSignupCard.tsx'
import { ProjectRowLayout } from '../components/ProjectRowLayout.tsx'

export const RecentImpactPosts = () => {
  const { data, loading, error, refetch } = usePostsForLandingPageQuery({
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

  if (!loading && !error && !posts.length) {
    return null
  }

  return (
    <ProjectRowLayout
      title={t("What's happening")}
      width="100%"
      mb={-16}
      rightContent={<DiscoverMoreButton as={Link} to={getPath('discoveryActivity')} />}
    >
      <VStack w="full" spacing={4} align="stretch" paddingTop={3}>
        {loading ? (
          <SimpleGrid w="full" columns={{ base: 1, lg: 3 }} spacing={{ base: 4, lg: 8 }}>
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} height={{ base: '240px', md: '280px' }} borderRadius="12px" />
            ))}
          </SimpleGrid>
        ) : error ? (
          <VStack
            w="full"
            spacing={3}
            align="start"
            border="1px solid"
            borderColor="neutral1.4"
            borderRadius="16px"
            p={5}
          >
            <Body medium>{t('Unable to load recent updates right now')}</Body>
            <Button onClick={() => refetch()} variant="outline">
              {t('Retry')}
            </Button>
          </VStack>
        ) : (
          <SimpleGrid w="full" columns={{ base: 1, lg: 3 }} spacing={{ base: 4, lg: 8 }}>
            <Box
              as={ChakraLink}
              href={TwitterAnnouncementLinkUrl}
              isExternal
              flex={1}
              borderRadius="8px"
              overflow="hidden"
            >
              <Image
                src={TwitterAnnouncementImageUrl}
                alt="Recent Impact Post"
                width="100%"
                height="100%"
                objectFit="cover"
              />
            </Box>
            <Box flex={1} borderRadius="8px" overflow="hidden">
              <ReactPlayer
                url="https://www.youtube.com/watch?v=e5PTRMz27vA"
                controls={true}
                width="100%"
                height="100%"
              />
            </Box>
            <Box flex={1} borderRadius="8px" overflow="hidden">
              <ReactPlayer
                url="https://www.youtube.com/watch?v=i6FIvDddrdw"
                controls={true}
                width="100%"
                height="100%"
              />
            </Box>
            {posts.map((post) => {
              return <LandingPostCard key={post.id} post={post} isMobile />
            })}
          </SimpleGrid>
        )}

        <NewsletterSignupCard />
      </VStack>
    </ProjectRowLayout>
  )
}
