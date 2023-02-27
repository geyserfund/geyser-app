import { QueryHookOptions, useQuery } from '@apollo/client'

import { QUERY_TRENDING_PROJECTS_FOR_LANDING_PAGE } from '../../pages/landing/projects.graphql'
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
  take?: number
  tagIds?: number[]
}

const DEFAULT_NUMBER_OF_PROJECTS = 3

export const useMostFundedOfTheWeekProjectsState = ({
  take = DEFAULT_NUMBER_OF_PROJECTS,
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
