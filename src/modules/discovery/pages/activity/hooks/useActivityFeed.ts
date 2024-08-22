import { useState } from 'react'

import { ActivityFeedFragmentFragment, ActivityFeedName, useActivityFeedQuery } from '@/types'

const MAXIMUM_ACTIVITY_ITEMS = 32

export const useActivityFeed = (feed: ActivityFeedName) => {
  const [activities, setActivities] = useState<ActivityFeedFragmentFragment[]>([])
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
      setActivities(data.activitiesGet?.activities || [])
      setIsLoading(false)
    },
    onError(error) {
      setIsLoading(false)
    },
  })

  return {
    activities,
    isLoading,
    fetchMore,
  }
}
