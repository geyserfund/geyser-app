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

export const inDraftStatus = [
  ProjectStatus.Draft,
  ProjectStatus.InReview,
  ProjectStatus.PreLaunch,
  ProjectStatus.Accepted,
] as ProjectStatus[]

export const inactiveStatus = [ProjectStatus.Closed, ProjectStatus.Inactive]

export const useMyProjects = (userId: number) => {
  const { toast } = useNotification()

  const [isLoading, setLoading] = useState(true)
  const [_activeProjects, _setActiveProjects] = useState<ProjectForMyProjectsFragment[]>([])
  const [activeProjects, setActiveProjects] = useState<ProjectForMyProjectsFragment[]>([])
  const [inDraftProjects, setInDraftProjects] = useState<ProjectForMyProjectsFragment[]>([])
  const [inReviewProjects, setInReviewProjects] = useState<ProjectForMyProjectsFragment[]>([])
  const [inPrelaunchProjects, setInPrelaunchProjects] = useState<ProjectForMyProjectsFragment[]>([])
  const [inActiveProjects, setInActiveProjects] = useState<ProjectForMyProjectsFragment[]>([])

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
      input: {
        where: {
          ownerId: userId,
        },
      },
    } as any,
    skip: !userId,
    onCompleted(data: any) {
      const projects = (data.projectsGet?.projects ?? []) as ProjectForMyProjectsFragment[]
      const filteredActiveProjects = projects.filter((project) => project?.status === ProjectStatus.Active)
      _setActiveProjects(filteredActiveProjects)
      setActiveProjects(filteredActiveProjects)

      setInDraftProjects(projects.filter((project) => !project?.launchedAt))
      setInReviewProjects(
        projects.filter((project) => project?.launchedAt && project?.status === ProjectStatus.InReview),
      )
      setInPrelaunchProjects(projects.filter((project) => project?.status === ProjectStatus.PreLaunch))
      setInActiveProjects(projects.filter((project) => project?.status && inactiveStatus.includes(project.status)))

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
    inActiveProjects,
    isLoading,
  }
}
