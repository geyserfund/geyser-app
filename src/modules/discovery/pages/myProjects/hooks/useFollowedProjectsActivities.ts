import { useMemo, useState } from 'react'

import { ActivityFeedName, ProjectActivitiesCount, useActivitiesCountGroupedByProjectQuery } from '@/types'

export const useFollowedProjectsActivities = () => {
  const [followedProjectsActivities, setFollowedProjectsActivities] = useState<ProjectActivitiesCount[]>([])

  const dateRange = useMemo(() => {
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

    const oneMonthAgo = new Date()
    oneMonthAgo.setDate(oneMonthAgo.getDate() - 30)

    return {
      endDateTime: Date.now(),
      startDateTime: oneWeekAgo.getTime(),
    }
  }, [])
  // TODO: change the feed to FollowedProjects once the backend fix is ready
  useActivitiesCountGroupedByProjectQuery({
    variables: {
      input: {
        feed: ActivityFeedName.MyProjects,
        createdAt: dateRange,
      },
    },
    onCompleted(data) {
      setFollowedProjectsActivities(data.activitiesCountGroupedByProject as ProjectActivitiesCount[])
    },
  })

  return {
    followedProjectsActivities,
  }
}
