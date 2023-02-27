import { QueryHookOptions, useQuery } from '@apollo/client'

import { QUERY_PROJECTS_FOR_LANDING_PAGE } from '../../pages/landing/projects.graphql'
import { Project, ProjectsGetQueryInput } from '../../types'

type TProjectsData = {
  projects: Project[]
}

interface UseProjectsStateProps
  extends QueryHookOptions<TProjectsData, ProjectsGetQueryInput> {
  take?: number
  tagIds?: number[]
}

const DEFAULT_NUMBER_OF_PROJECTS = 3

export const useProjectsState = ({
  take = DEFAULT_NUMBER_OF_PROJECTS,
  tagIds,
  ...options
}: UseProjectsStateProps) => {
  const { data, ...rest } = useQuery<TProjectsData, ProjectsGetQueryInput>(
    QUERY_PROJECTS_FOR_LANDING_PAGE,
    {
      variables: {
        where: {
          tagIds: tagIds || [],
        },
        pagination: { take },
      },
      ...options,
    },
  )

  const projects = data?.projects

  return { projects, ...rest }
}
