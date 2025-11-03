import { Box, Image, Skeleton, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

import { ScrollInvoke } from '@/helpers'
import { Body } from '@/shared/components/typography'
import { ID } from '@/shared/constants/components/id.ts'
import { getPath, TelescopeUrl } from '@/shared/constants/index.ts'
import { Activity, ActivityFeedName } from '@/types'
import { useMobileMode } from '@/utils'

import { useActivityFeed } from '../hooks/useActivityFeed'
import { ActivityFeedItem } from './ActivityFeedItem'

export const ProjectsIFollow = () => {
  const isMobile = useMobileMode()

  const { followedProjectsActivities, isLoadingMore, noMoreItems, fetchNext, isLoading } = useActivityFeed(
    ActivityFeedName.FollowedProjects,
  )

  if (isLoading) {
    return <ProjectsIFollowSkeleton />
  }

  if (followedProjectsActivities.length === 0) {
    return <EmptyFeed />
  }

  return (
    <VStack h="full" py={2} width="full" spacing={4}>
      {followedProjectsActivities.map((item) => (
        <ActivityFeedItem key={item.id} {...(item as Activity)} />
      ))}
      <ScrollInvoke
        elementId={!isMobile ? ID.root : undefined}
        onScrollEnd={fetchNext}
        isLoading={isLoadingMore}
        noMoreItems={noMoreItems}
      />
    </VStack>
  )
}

const ProjectsIFollowSkeleton = () => {
  return (
    <VStack h="full" py={2} width="full" spacing={4}>
      {[1, 2, 3, 4, 5, 6].map((item) => {
        return <ActivityItemSkeleton key={item} />
      })}
    </VStack>
  )
}

const ActivityItemSkeleton = () => {
  return (
    <Skeleton
      border={'1px solid'}
      borderRadius={'md'}
      borderColor={'neutralAlpha.6'}
      width={{ base: 'full', lg: '586px' }}
      height="150px"
    />
  )
}

const EmptyFeed = () => {
  const { t } = useTranslation()
  return (
    <VStack height={'full'} minH={'500px'} justifyContent={'center'} alignItems={'center'} spacing={6}>
      <Image height={'225px'} src={TelescopeUrl} alt="telescope" />
      <Box textAlign={'center'}>
        <Body size={'xl'} bold>
          {t('You are not following any projects yet.')}
        </Body>
        <Body size={'md'}>
          <Link to={getPath('projectDiscovery')}>
            <Body
              as={'span'}
              size={'md'}
              color={'primaryAlpha.11'}
              textDecoration={'underline'}
              lineHeight={'24px'}
              regular
            >
              {t('Explore projects')}
            </Body>
          </Link>{' '}
          {t('that match your interests!')}
        </Body>
      </Box>
    </VStack>
  )
}
