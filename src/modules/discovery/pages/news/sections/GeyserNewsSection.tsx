import { Button, SimpleGrid, Skeleton, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useCallback, useMemo, useState } from 'react'

import { LandingPostCard } from '@/modules/discovery/pages/landing/views/mainView/defaultView/components/LandingPostCard.tsx'
import { H2 } from '@/shared/components/typography/index.ts'
import { OrderByOptions, useFeaturedProjectForLandingPageQuery, usePostsForLandingPageQuery } from '@/types/index.ts'

const GEYSER_PROJECT_NAME = 'geyser'
const PAGE_SIZE = 4

/** Displays posts published by the official Geyser project. */
export const GeyserNewsSection = () => {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  const { data: projectData } = useFeaturedProjectForLandingPageQuery({
    variables: { where: { name: GEYSER_PROJECT_NAME } },
  })

  const geyserProjectId = projectData?.projectGet?.id

  const { data, loading } = usePostsForLandingPageQuery({
    variables: {
      input: {
        orderBy: { publishedAt: OrderByOptions.Desc },
        pagination: { take: visibleCount + PAGE_SIZE },
        where: { projectId: geyserProjectId },
      },
    },
    skip: !geyserProjectId,
  })

  const posts = useMemo(() => data?.posts ?? [], [data?.posts])
  const displayedPosts = posts.slice(0, visibleCount)
  const hasMore = posts.length > visibleCount

  const handleViewMore = useCallback(() => {
    setVisibleCount((prev) => prev + PAGE_SIZE)
  }, [])

  if (!loading && !geyserProjectId) {
    return null
  }

  return (
    <VStack w="full" spacing={6} alignItems="start">
      <H2 size="2xl" bold textTransform="uppercase" letterSpacing="wide">
        {t('Geyser News')}
      </H2>

      {loading ? (
        <SimpleGrid w="full" columns={{ base: 1, md: 2 }} spacing={6}>
          {Array.from({ length: PAGE_SIZE }).map((_, i) => (
            <Skeleton key={i} height="280px" borderRadius="8px" />
          ))}
        </SimpleGrid>
      ) : (
        <>
          <SimpleGrid w="full" columns={{ base: 1, md: 2 }} spacing={6}>
            {displayedPosts.map((post) => (
              <LandingPostCard key={post.id} post={post} isMobile showProjectCategory />
            ))}
          </SimpleGrid>

          {hasMore && (
            <Button variant="outline" colorScheme="neutral1" alignSelf="center" onClick={handleViewMore}>
              {t('View more')}
            </Button>
          )}
        </>
      )}
    </VStack>
  )
}
