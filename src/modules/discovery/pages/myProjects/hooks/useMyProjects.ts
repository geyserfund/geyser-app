import { t } from 'i18next'
import { useEffect, useMemo, useState } from 'react'

import {
  ActivityFeedName,
  ProjectActivitiesCount,
  ProjectForMyProjectsFragment,
  ProjectStatus,
  useActivitiesCountGroupedByProjectQuery,
  useProjectsForMyProjectsQuery,
} from '@/types'
import { useNotification } from '@/utils'

export const sortProjectsByActivity = (
  projects: ProjectForMyProjectsFragment[],
  activities: ProjectActivitiesCount[],
): ProjectForMyProjectsFragment[] => {
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
  const [_activeProjects, _setActiveProjects] = useState<ProjectForMyProjectsFragment[]>([])
  const [activeProjects, setActiveProjects] = useState<ProjectForMyProjectsFragment[]>([])
  const [inDraftProjects, setInDraftProjects] = useState<ProjectForMyProjectsFragment[]>([])
  const [inReviewProjects, setInReviewProjects] = useState<ProjectForMyProjectsFragment[]>([])
  const [inPrelaunchProjects, setInPrelaunchProjects] = useState<ProjectForMyProjectsFragment[]>([])

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

  useProjectsForMyProjectsQuery({
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
          .filter((project): project is ProjectForMyProjectsFragment => project !== null) ?? []
      _setActiveProjects(filteredActiveProjects)
      setActiveProjects(filteredActiveProjects)

      // sortProjectsByActivity(
      //   data.user.ownerOf
      //     ?.filter((val) => val?.project?.status === ProjectStatus.Active)
      //     .map((val) => val.project)
      //     .filter((project): project is ProjectForMyProjectsFragment => project !== null) ?? [],
      //   myProjectsActivities,
      // )
      setInDraftProjects(
        data.user.ownerOf
          ?.filter((val) => val?.project?.status === ProjectStatus.Draft)
          .map((val) => val.project)
          .filter((project): project is ProjectForMyProjectsFragment => project !== null) ?? [],
      )
      setInReviewProjects(
        data.user.ownerOf
          ?.filter((val) => val?.project?.status === ProjectStatus.InReview)
          .map((val) => val.project)
          .filter((project): project is ProjectForMyProjectsFragment => project !== null) ?? [],
      )
      setInPrelaunchProjects(
        data.user.ownerOf
          ?.filter((val) => val?.project?.status === ProjectStatus.PreLaunch)
          .map((val) => val.project)
          .filter((project): project is ProjectForMyProjectsFragment => project !== null) ?? [],
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
    inPrelaunchProjects,
    isLoading,
  }
}
