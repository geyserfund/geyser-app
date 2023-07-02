import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { StickToTop } from '../../../components/layouts'
import { SortType, useFilterContext } from '../../../context'
import { useMobileMode } from '../../../utils'
import { checkIfRenderFilter } from '../../../utils/helpers'
import { FilterBySearch } from '../filters/FilterBySearch'
import { MobileTopBar } from '../filters/mobile/MobileTopBar'
import { DefaultView, PaginatedView, TrendingView } from './views'

export const LandingPageProjects = () => {
  const { t } = useTranslation()
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
            backgroundColor="neutral.50"
            bias={10}
            buffer={10}
          >
            <MobileTopBar title={t('Projects')} />
          </StickToTop>
          <FilterBySearch />
        </>
      )}
      {renderView()}
    </>
  )
}
