import { useMemo, useState } from 'react'

import {
  ActivityFeedName,
  ProjectActivitiesCount,
  ProjectForProfilePageFragment,
  ProjectStatus,
  useActivitiesCountGroupedByProjectQuery,
  useUserProfileProjectsQuery,
} from '@/types'
import { useNotification } from '@/utils'

const sortProjectsByActivity = (
  projects: ProjectForProfilePageFragment[],
  activities: ProjectActivitiesCount[],
): ProjectForProfilePageFragment[] => {
  const activityMap = new Map(activities.map((a) => [a.project.id, a.count]))

  return [...projects].sort((a, b) => {
    const countA = activityMap.get(a.id) || 0
    const countB = activityMap.get(b.id) || 0
    return countB - countA
  })
}

export const useMyProjects = (userId: number) => {
  const { toast } = useNotification()

  const [isLoading, setLoading] = useState(true)
  const [activeProjects, setActiveProjects] = useState<ProjectForProfilePageFragment[]>([])
  const [inDraftProjects, setInDraftProjects] = useState<ProjectForProfilePageFragment[]>([])
  const [inReviewProjects, setInReviewProjects] = useState<ProjectForProfilePageFragment[]>([])

  const [myProjectsActivities, setMyProjectsActivities] = useState<ProjectActivitiesCount[]>([])

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

  // TODO: change the feed to MyProjects once the backend fix is ready
  useActivitiesCountGroupedByProjectQuery({
    variables: {
      input: {
        feed: ActivityFeedName.FollowedProjects,
        createdAt: dateRange,
      },
    },
    onCompleted(data) {
      setMyProjectsActivities(data.activitiesCountGroupedByProject as ProjectActivitiesCount[])
    },
  })

  useUserProfileProjectsQuery({
    variables: {
      where: {
        id: userId,
      },
    },
    skip: !userId,
    onCompleted(data) {
      setActiveProjects(
        sortProjectsByActivity(
          data.user.ownerOf
            ?.filter((val) => val?.project?.status === ProjectStatus.Active)
            .map((val) => val.project)
            .filter((project): project is ProjectForProfilePageFragment => project !== null) ?? [],
          myProjectsActivities,
        ),
      )
      setInDraftProjects(
        data.user.ownerOf
          ?.filter((val) => val?.project?.status === ProjectStatus.Draft)
          .map((val) => val.project)
          .filter((project): project is ProjectForProfilePageFragment => project !== null) ?? [],
      )
      setInReviewProjects(
        data.user.ownerOf
          ?.filter((val) => val?.project?.status === ProjectStatus.InReview)
          .map((val) => val.project)
          .filter((project): project is ProjectForProfilePageFragment => project !== null) ?? [],
      )
      setLoading(false)
    },
    onError(error) {
      toast({
        status: 'error',
        title: 'Failed to fetch projects',
        description: `${error.message}`,
      })
      setLoading(false)
    },
  })

  return {
    activeProjects,
    inDraftProjects,
    inReviewProjects,
    isLoading,
  }
}
