import { QueryHookOptions, useQuery } from '@apollo/client'

import { QUERY_TRENDING_PROJECTS_FOR_LANDING_PAGE } from '../../pages/landing/projects/projects.graphql'
import {
  GetProjectsMostFundedOfTheWeekInput,
  ProjectsMostFundedOfTheWeekGet,
} from '../../types'

type TMostFundedOfTheWeekProjectsData = {
  projectsMostFundedOfTheWeekGet: ProjectsMostFundedOfTheWeekGet[]
}
type TMostFundedOfTheWeekProjectsVariables = {
  input: GetProjectsMostFundedOfTheWeekInput
}
interface UseMostFundedOfTheWeekProjectsStateProps
  extends QueryHookOptions<
    TMostFundedOfTheWeekProjectsData,
    TMostFundedOfTheWeekProjectsVariables
  > {
  take: number
  tagIds?: number[]
}

export const useMostFundedOfTheWeekProjectsState = ({
  take,
  tagIds,
  ...options
}: UseMostFundedOfTheWeekProjectsStateProps) => {
  const { data, ...rest } = useQuery<
    TMostFundedOfTheWeekProjectsData,
    TMostFundedOfTheWeekProjectsVariables
  >(QUERY_TRENDING_PROJECTS_FOR_LANDING_PAGE, {
    variables: {
      input: {
        tagIds: tagIds || [],
        take,
      },
    },
    ...options,
  })

  const projects =
    data?.projectsMostFundedOfTheWeekGet.map(
      (projectsData) => projectsData.project,
    ) || []

  return { projects, ...rest }
}
