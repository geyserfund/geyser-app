import { useMemo, useState } from 'react'

import {
  ActivityFeedName,
  Project,
  ProjectActivitiesCount,
  ProjectStatus,
  useActivitiesCountGroupedByProjectQuery,
  useMeProjectFollowsQuery,
} from '@/types'

const sortByActiveAndCount = (a: ProjectActivitiesCount, b: ProjectActivitiesCount) => {
  // First, sort by active status
  if (a.project.status === ProjectStatus.Active && b.project.status !== ProjectStatus.Active) return -1
  if (a.project.status !== ProjectStatus.Active && b.project.status === ProjectStatus.Active) return 1

  // If both have the same active status, sort by count
  return b.count - a.count
}

export const useFollowedProjectsActivities = () => {
  const [followedProjects, setFollowedProjects] = useState<Project[]>([])
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

  useMeProjectFollowsQuery({
    onCompleted(data) {
      setFollowedProjects(data.me?.projectFollows as Project[])
    },
  })

  useActivitiesCountGroupedByProjectQuery({
    variables: {
      input: {
        feed: ActivityFeedName.FollowedProjects,
        createdAt: dateRange,
      },
    },
    onCompleted(data) {
      setFollowedProjectsActivities(data.activitiesCountGroupedByProject as ProjectActivitiesCount[])
    },
  })

  const filteredProjectsActivities = useMemo(() => {
    return followedProjects
      .map((project) => {
        const activityCount = followedProjectsActivities.find((activity) => activity.project.id === project.id)
        return {
          project,
          count: activityCount ? activityCount.count : 0,
        }
      })
      .sort(sortByActiveAndCount)
  }, [followedProjects, followedProjectsActivities])

  return {
    followedProjectsActivities: filteredProjectsActivities,
  }
}
