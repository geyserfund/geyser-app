import { t } from 'i18next'
import { useEffect, useMemo, useState } from 'react'

import {
  ActivityFeedName,
  ProjectActivitiesCount,
  ProjectForProfilePageFragment,
  ProjectStatus,
  useActivitiesCountGroupedByProjectQuery,
  useUserProfileProjectsQuery,
} from '@/types'
import { useNotification } from '@/utils'

export const sortProjectsByActivity = (
  projects: ProjectForProfilePageFragment[],
  activities: ProjectActivitiesCount[],
): ProjectForProfilePageFragment[] => {
  const activityMap = {} as Record<string, number>
  activities.map((a) => {
    activityMap[a.project.id] = a.count
  })

  return [...projects]
    .sort((a, b) => {
      return b.balance - a.balance
    })
    .sort((a, b) => {
      const countA = activityMap[a.id] || 0
      const countB = activityMap[b.id] || 0
      return countB - countA
    })
}

export const useMyProjects = (userId: number) => {
  const { toast } = useNotification()

  const [isLoading, setLoading] = useState(true)
  const [_activeProjects, _setActiveProjects] = useState<ProjectForProfilePageFragment[]>([])
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
      const filteredActiveProjects =
        data.user.ownerOf
          ?.filter((val) => val?.project?.status === ProjectStatus.Active)
          .map((val) => val.project)
          .filter((project): project is ProjectForProfilePageFragment => project !== null) ?? []
      _setActiveProjects(filteredActiveProjects)
      setActiveProjects(filteredActiveProjects)

      // sortProjectsByActivity(
      //   data.user.ownerOf
      //     ?.filter((val) => val?.project?.status === ProjectStatus.Active)
      //     .map((val) => val.project)
      //     .filter((project): project is ProjectForProfilePageFragment => project !== null) ?? [],
      //   myProjectsActivities,
      // )
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
        title: t('Failed to fetch projects'),
        description: `${error.message}`,
      })
      setLoading(false)
    },
  })

  useEffect(() => {
    if (_activeProjects.length > 0 && myProjectsActivities.length > 0) {
      setActiveProjects(sortProjectsByActivity(_activeProjects, myProjectsActivities))
    }
  }, [_activeProjects, myProjectsActivities])

  return {
    activeProjects,
    inDraftProjects,
    inReviewProjects,
    isLoading,
  }
}
