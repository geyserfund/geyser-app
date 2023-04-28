import { QueryHookOptions, useQuery } from '@apollo/client'

import { QUERY_PROJECTS_FOR_LANDING_PAGE } from '../../pages/landing/projects/projects.graphql'
import { Project, ProjectsGetQueryInput, ProjectStatus } from '../../types'

type TProjectsData = {
  projects: Project[]
}

interface UseProjectsStateProps
  extends QueryHookOptions<TProjectsData, ProjectsGetQueryInput> {
  take: number
  tagIds?: number[]
}

export const useProjectsState = ({
  take,
  tagIds,
  ...options
}: UseProjectsStateProps) => {
  const { data, ...rest } = useQuery<TProjectsData, ProjectsGetQueryInput>(
    QUERY_PROJECTS_FOR_LANDING_PAGE,
    {
      variables: {
        where: {
          tagIds: tagIds || [],
          status: ProjectStatus.Active,
        },
        pagination: { take },
      },
      ...options,
    },
  )

  const projects = data?.projects

  return { projects, ...rest }
}
