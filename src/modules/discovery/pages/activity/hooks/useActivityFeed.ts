import { useAtom } from 'jotai'
import { useState } from 'react'

import { usePaginationAtomHook } from '@/shared/hooks/utils/usePaginationAtomHook'
import { ActivityFeedFragmentFragment, ActivityFeedName, ActivityResourceType, useActivityFeedQuery } from '@/types'

import { activityFeedFollowedProjectsAtom, activityFeedGlobalAtom } from '../state/activityFeedAtom'

const MAXIMUM_ACTIVITY_ITEMS = 20

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
          resourceType: ActivityResourceType.Post,
        },
        pagination: {
          take: MAXIMUM_ACTIVITY_ITEMS,
        },
      },
    },
    onCompleted(data) {
      handleDataUpdate(data.activitiesGet?.activities || [])
      setIsLoading(false)
    },
    onError(error) {
      setIsLoading(false)
    },
  })

  const { handleDataUpdate, isLoadingMore, noMoreItems, fetchNext } =
    usePaginationAtomHook<ActivityFeedFragmentFragment>({
      fetchMore,
      queryName: ['activitiesGet', 'activities'],
      itemLimit: MAXIMUM_ACTIVITY_ITEMS,
      where: {
        feed,
      },
      setData(data) {
        if (feed === ActivityFeedName.FollowedProjects) {
          setFollowedProjectsActivities(data)
        } else {
          setGlobalActivities(data)
        }
      },
    })

  return {
    followedProjectsActivities,
    globalActivities,
    isLoading,
    isLoadingMore,
    noMoreItems,
    fetchNext,
  }
}
