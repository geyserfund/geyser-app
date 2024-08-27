import { Skeleton, VStack } from '@chakra-ui/react'

import { ScrollInvoke } from '@/helpers'
import { ID } from '@/shared/constants'
import { Activity, ActivityFeedName } from '@/types'
import { useMobileMode } from '@/utils'

import { useActivityFeed } from '../hooks/useActivityFeed'
import ActivityItem from './ActivityFeedItem'

const GlobalFeed = () => {
  const isMobile = useMobileMode()

  const { globalActivities, isLoading, isLoadingMore, noMoreItems, fetchNext } = useActivityFeed(
    ActivityFeedName.GlobalProjects,
  )

  if (isLoading) {
    return <GlobalFeedSkeleton />
  }

  return (
    <VStack h="full" py={2} width="full" spacing={4}>
      {globalActivities.map((item) => (
        <ActivityItem key={item.id} {...(item as Activity)} />
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

const GlobalFeedSkeleton = () => {
  return (
    <VStack h="full" py={2} width="full" spacing={4}>
      {[1, 2, 3, 4, 5, 6].map((item) => {
        return <ActivityItemSkeleton key={item} />
      })}
    </VStack>
  )
}

const ActivityItemSkeleton = () => {
  return <Skeleton />
}

export default GlobalFeed
