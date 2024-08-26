import { useAtom } from 'jotai'
import { useState } from 'react'

import { ActivityFeedName, useActivityFeedQuery } from '@/types'

import { activityFeedFollowedProjectsAtom, activityFeedGlobalAtom } from '../state/activityFeedAtom'

const MAXIMUM_ACTIVITY_ITEMS = 32

export const useActivityFeed = (feed: ActivityFeedName) => {
  const [followedProjectsActivities, setFollowedProjectsActivities] = useAtom(activityFeedFollowedProjectsAtom)
  const [globalActivities, setGlobalActivities] = useAtom(activityFeedGlobalAtom)

  const [isLoading, setIsLoading] = useState(true)

  const { fetchMore } = useActivityFeedQuery({
    skip: !feed,
    fetchPolicy: 'network-only',
    variables: {
      input: {
        where: {
          feed,
        },
        pagination: {
          take: MAXIMUM_ACTIVITY_ITEMS,
        },
      },
    },
    onCompleted(data) {
      if (feed === ActivityFeedName.FollowedProjects) {
        setFollowedProjectsActivities(data.activitiesGet?.activities || [])
      } else {
        setGlobalActivities(data.activitiesGet?.activities || [])
      }

      setIsLoading(false)
    },
    onError(error) {
      setIsLoading(false)
    },
  })

  return {
    followedProjectsActivities,
    globalActivities,
    isLoading,
    fetchMore,
  }
}
