import { QueryHookOptions } from '@apollo/client'

import {
  ProjectForLandingPageFragment,
  ProjectsMostFundedOfTheWeekGetQuery,
  ProjectsMostFundedOfTheWeekGetQueryVariables,
  useProjectsMostFundedOfTheWeekGetQuery,
} from '../../types'
import { truthyFilter } from '../../utils/array'

interface UseMostFundedOfTheWeekProjectsStateProps
  extends QueryHookOptions<
    ProjectsMostFundedOfTheWeekGetQuery,
    ProjectsMostFundedOfTheWeekGetQueryVariables
  > {
  take: number
  tagIds?: number[]
}

export const useMostFundedOfTheWeekProjectsState = ({
  take,
  tagIds,
  ...options
}: UseMostFundedOfTheWeekProjectsStateProps) => {
  const { data, ...rest } = useProjectsMostFundedOfTheWeekGetQuery({
    variables: {
      input: {
        tagIds: tagIds || [],
        take,
      },
    },
    ...options,
  })

  const projects =
    data?.projectsMostFundedOfTheWeekGet
      .filter<{ project: ProjectForLandingPageFragment }>(truthyFilter)
      .map((projectsData) => projectsData.project) || []

  return { projects, ...rest }
}
