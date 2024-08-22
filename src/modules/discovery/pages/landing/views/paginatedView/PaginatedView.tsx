import { VStack } from '@chakra-ui/react'

import { useFilterContext } from '@/context/filter'
import { ScrollInvoke } from '@/helpers'
import { QUERY_PROJECTS_FOR_LANDING_PAGE } from '@/modules/discovery/graphql/queries/projectsQuery'
import { ID } from '@/shared/constants'
import { useQueryWithPagination } from '@/shared/hooks'
import { OrderByOptions, ProjectForLandingPageFragment, ProjectStatus } from '@/types'
import { useMobileMode } from '@/utils'

import { FilteredProjectList } from './sections/FilteredProjectList'
import { FilterTopBar } from './sections/FilterTopBar'

const TOTAL_PROJECTS_TO_FETCH = 20

export const PaginatedView = () => {
  const isMobile = useMobileMode()

  const {
    filters: { tagIds, ...restFilters },
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
    queryName: ['projectsGet', 'projects'],
    query: QUERY_PROJECTS_FOR_LANDING_PAGE,
    where: {
      status: !restFilters.search ? ProjectStatus.Active : undefined,
      tagIds: tagIds?.length ? tagIds : undefined,
      ...restFilters,
    },
    orderBy: {
      direction: OrderByOptions.Desc,
      field: 'balance',
    },
    skipPagination: Boolean(restFilters.search),
  })

  return (
    <VStack w="full" spacing={6}>
      <FilterTopBar isLoading={isLoading} />
      <FilteredProjectList {...{ projects, error, loading: isLoading }} />
      {!isLoading && (
        <ScrollInvoke
          elementId={isMobile ? undefined : ID.root}
          onScrollEnd={fetchNext}
          isLoading={isLoadingMore}
          noMoreItems={noMoreItems}
        />
      )}
    </VStack>
  )
}
