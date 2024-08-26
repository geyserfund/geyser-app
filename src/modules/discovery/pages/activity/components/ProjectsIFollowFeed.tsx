import { VStack } from '@chakra-ui/react'

import { Activity, ActivityFeedName } from '@/types'

import { useActivityFeed } from '../hooks/useActivityFeed'
import ActivityItem from './ActivityFeedItem'

const ProjectsIFollow = () => {
  const { followedProjectsActivities } = useActivityFeed(ActivityFeedName.FollowedProjects)

  return (
    <VStack py={2} width="full" spacing={4}>
      {followedProjectsActivities.map((item) => (
        <ActivityItem key={item.id} {...(item as Activity)} />
      ))}
    </VStack>
  )
}

export default ProjectsIFollow
