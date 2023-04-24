import { useCallback } from 'react'

import { StickToTop } from '../../../components/layouts'
import { FilterType, SortType, useFilterContext } from '../../../context'
import { checkKeyValueExists, useMobileMode } from '../../../utils'
import { FilterBySearch } from '../filters/FilterBySearch'
import { MobileTopBar } from '../filters/mobile/MobileTopBar'
import { DefaultView, PaginatedView, TrendingView } from './views'

export const LandingPageProjects = () => {
  const isMobileMode = useMobileMode()

  const { filters } = useFilterContext()

  const renderView = useCallback(() => {
    if (checkIfRenderFilter(filters)) {
      if (filters.sort === SortType.recent) {
        return <TrendingView />
      }

      return <PaginatedView />
    }

    return <DefaultView />
  }, [filters])

  return (
    <>
      {isMobileMode && (
        <>
          <StickToTop
            id="landing-page-mobile-projects-sort-filter"
            width="100%"
            _onStick={{ width: 'calc(100% - 20px)' }}
            bias={10}
            buffer={10}
          >
            <MobileTopBar title="Projects" />
          </StickToTop>
          <FilterBySearch />
        </>
      )}
      {renderView()}
    </>
  )
}

export const checkIfRenderFilter = (filters: FilterType) => {
  if (
    checkKeyValueExists(
      filters,
      ['countryCode', 'region', 'search', 'status', 'type', 'recent'],
      'any',
    ) ||
    (filters.tagIds && filters.tagIds.length > 0)
  ) {
    return true
  }

  return false
}
