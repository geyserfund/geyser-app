import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { useFilterContext } from '../../../context'
import { StickToTop } from '../../../shared/components/layouts'
import { useMobileMode } from '../../../utils'
import { checkIfRenderFilter } from '../../../utils/helpers'
import { FilterBySearch } from '../filters/FilterBySearch'
import { MobileTopBar } from '../filters/mobile/MobileTopBar'
import { DefaultView, PaginatedView } from './views'

export const LandingPageProjects = () => {
  const { t } = useTranslation()
  const isMobileMode = useMobileMode()

  const { filters } = useFilterContext()

  const renderView = useCallback(() => {
    if (checkIfRenderFilter(filters)) {
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
            <MobileTopBar title={t('Projects')} />
          </StickToTop>
          <FilterBySearch />
        </>
      )}
      {renderView()}
    </>
  )
}
