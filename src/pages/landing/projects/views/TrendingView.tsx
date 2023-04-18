import { useFilterContext } from '../../../../context'
import { useMostFundedOfTheWeekProjectsState } from '../../../../hooks/graphqlState'
import { FilteredProjectList } from '../components/FilteredProjectList'

const NO_OF_PROJECT_TO_LOAD_FILTER_VIEW = 20

export const TrendingView = () => {
  const {
    filters: { tagIds = [] },
  } = useFilterContext()

  const { projects, loading, error } = useMostFundedOfTheWeekProjectsState({
    tagIds,
    take: NO_OF_PROJECT_TO_LOAD_FILTER_VIEW,
  })

  return <FilteredProjectList {...{ projects, error, loading }} />
}
