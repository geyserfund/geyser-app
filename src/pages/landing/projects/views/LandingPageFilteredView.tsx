import { useCallback } from 'react'

import { useFilterContext } from '../../../../context'
import { checkKeyValueExists } from '../../../../utils'
import { PaginatedView } from './PaginatedView'
import { TrendingView } from './TrendingView'

export const LandingPageFilteredView = () => {
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

  if (checkIfRenderFilter()) {
    if (checkIfRecent()) {
      return <TrendingView />
    }

    return <PaginatedView />
  }

  return <div>no filter so no show</div>
}
