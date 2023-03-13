import { useCallback } from 'react'

import { StickToTop } from '../../../components/layouts'
import { useFilterContext } from '../../../context'
import { checkKeyValueExists, useMobileMode } from '../../../utils'
import { FilterBySearch } from '../filters/FilterBySearch'
import { MobileTopBar } from '../filters/mobile/MobileTopBar'
import { DefaultView, PaginatedView, TrendingView } from './views'

export const LandingPageProjects = () => {
  const isMobileMode = useMobileMode()
  const { filters, sort } = useFilterContext()

  const checkIfRenderFilter = useCallback(() => {
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
  }, [filters])

  const checkIfRecent = useCallback(() => {
    if (sort.recent) {
      return true
    }

    return false
  }, [sort])

  const renderView = () => {
    if (checkIfRenderFilter()) {
      if (checkIfRecent()) {
        return <TrendingView />
      }

      return <PaginatedView />
    }

    return <DefaultView />
  }

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
