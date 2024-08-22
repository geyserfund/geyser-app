import { VStack } from '@chakra-ui/react'

import { Activity, ActivityFeedName } from '@/types'

import { useActivityFeed } from '../hooks/useActivityFeed'
import ActivityItem from './ActivityFeedItem'

const GlobalFeed = () => {
  const { activities } = useActivityFeed(ActivityFeedName.GlobalProjects)

  return (
    <VStack py={2} width="full" spacing={4}>
      {activities.map((item) => (
        <ActivityItem key={item.id} {...(item as Activity)} />
      ))}
    </VStack>
  )
}

export default GlobalFeed
