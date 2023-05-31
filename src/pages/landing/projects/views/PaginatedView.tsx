import { ID } from '../../../../constants'
import { useFilterContext } from '../../../../context'
import { QUERY_PROJECTS_FOR_LANDING_PAGE } from '../../../../graphql'
import { ScrollInvoke } from '../../../../helpers'
import { useQueryWithPagination } from '../../../../hooks'
import {
  OrderByOptions,
  ProjectForLandingPageFragment,
  ProjectStatus,
} from '../../../../types'
import { useMobileMode } from '../../../../utils'
import { FilteredProjectList } from '../components/FilteredProjectList'

const TOTAL_PROJECTS_TO_FETCH = 20

export const PaginatedView = () => {
  const isMobile = useMobileMode()

  const {
    filters: { recent, tagIds, sort, ...restFilters },
  } = useFilterContext()

  const {
    isLoading,
    isLoadingMore,
    noMoreItems,
    data: projects,
    error,
    fetchNext,
  } = useQueryWithPagination<ProjectForLandingPageFragment>({
    itemLimit: TOTAL_PROJECTS_TO_FETCH,
    queryName: ['projects', 'projects'],
    query: QUERY_PROJECTS_FOR_LANDING_PAGE,
    where: {
      tagIds: tagIds?.length ? tagIds : undefined,
      status: ProjectStatus.Active,
      ...restFilters,
    },
    orderBy: sort ? [{ [sort]: OrderByOptions.Desc }] : undefined,
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
