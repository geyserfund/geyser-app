import { useState } from 'react'

import { ProjectForProfilePageFragment, ProjectStatus, useUserProfileProjectsQuery } from '@/types'
import { useNotification } from '@/utils'

export const useMyProjects = (userId: number) => {
  const { toast } = useNotification()

  const [isLoading, setLoading] = useState(true)
  const [activeProjects, setActiveProjects] = useState<ProjectForProfilePageFragment[]>([])
  const [inDraftProjects, setInDraftProjects] = useState<ProjectForProfilePageFragment[]>([])
  const [inReviewProjects, setInReviewProjects] = useState<ProjectForProfilePageFragment[]>([])

  useUserProfileProjectsQuery({
    variables: {
      where: {
        id: userId,
      },
    },
    skip: !userId,
    onCompleted(data) {
      setActiveProjects(
        data.user.ownerOf
          ?.filter((val) => val?.project?.status === ProjectStatus.Active)
          .map((val) => val.project)
          .filter((project): project is ProjectForProfilePageFragment => project !== null) ?? [],
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
