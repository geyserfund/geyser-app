import { ID } from '../../../../constants'
import { useFilterContext } from '../../../../context'
import { ScrollInvoke } from '../../../../helpers'
import { useQueryWithPagination } from '../../../../hooks'
import { Project } from '../../../../types'
import { useMobileMode } from '../../../../utils'
import { QUERY_PROJECTS_FOR_LANDING_PAGE } from '../../projects.graphql'
import { FilteredProjectList } from '../components/FilteredProjectList'

const TOTAL_PROJECTS_TO_FETCH = 20

export const PaginatedView = () => {
  const isMobile = useMobileMode()

  const {
    filters: { recent, tagIds, ...restFilters },
    sort: restSort,
  } = useFilterContext()

  const {
    isLoading,
    isLoadingMore,
    noMoreItems,
    data: projects,
    error,
    fetchNext,
  } = useQueryWithPagination<Project>({
    itemLimit: TOTAL_PROJECTS_TO_FETCH,
    queryName: ['projects', 'projects'],
    query: QUERY_PROJECTS_FOR_LANDING_PAGE,
    where: { ...restFilters, tagIds: tagIds?.length ? tagIds : undefined },
    orderBy: [restSort],
  })

  return (
    <>
      <FilteredProjectList {...{ projects, error, loading: isLoading }} />
      {!isLoading && (
        <ScrollInvoke
          elementId={isMobile ? undefined : ID.root}
          onScrollEnd={fetchNext}
          isLoading={isLoadingMore}
          noMoreItems={noMoreItems}
        />
      )}
    </>
  )
}
