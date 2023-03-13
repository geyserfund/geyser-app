import { useQuery } from '@apollo/client'

import { useFilterContext } from '../../../../context'
import {
  GetProjectsMostFundedOfTheWeekInput,
  ProjectsMostFundedOfTheWeekGet,
} from '../../../../types'
import { FilteredProjectList } from '../components/FilteredProjectList'
import { QUERY_TRENDING_PROJECTS_FOR_LANDING_PAGE } from '../projects.graphql'

const NO_OF_PROJECT_TO_LOAD_FILTER_VIEW = 20

export const TrendingView = () => {
  const {
    filters: { tagIds = [] },
  } = useFilterContext()

  const { data, loading, error } = useQuery<
    { projectsMostFundedOfTheWeekGet: ProjectsMostFundedOfTheWeekGet[] },
    { input: GetProjectsMostFundedOfTheWeekInput }
  >(QUERY_TRENDING_PROJECTS_FOR_LANDING_PAGE, {
    variables: {
      input: {
        tagIds,
        take: NO_OF_PROJECT_TO_LOAD_FILTER_VIEW,
      },
    },
  })
  const projects =
    data?.projectsMostFundedOfTheWeekGet.map(
      (returnvalue) => returnvalue.project,
    ) || []

  return <FilteredProjectList {...{ projects, error, loading }} />
}
