import { useCallback } from 'react'

import { StickToTop } from '../../../components/layouts'
import { ID } from '../../../constants'
import { SortType, useFilterContext } from '../../../context'
import { useMobileMode } from '../../../utils'
import { checkIfRenderFilter } from '../../../utils/helpers'
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
            scrollContainerId={ID.root}
            width="100%"
            _onStick={{ width: 'calc(100% - 28px)' }}
            backgroundColor="neutral.50"
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
