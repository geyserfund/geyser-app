import { useCallback } from 'react'
import { Outlet } from 'react-router-dom'

import { StickToTop } from '../../../components/layouts'
import { useFilterContext } from '../../../context'
import { checkKeyValueExists, useMobileMode } from '../../../utils'
import { FilterBySearch } from '../filters/FilterBySearch'
import { MobileTopBar } from '../filters/mobile/MobileTopBar'
import { LandingPageDefaultView, PaginatedView, TrendingView } from './views'

export const LandingPageProjects = () => {
  const isMobileMode = useMobileMode()

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
      <Outlet />
    </>
  )
}
