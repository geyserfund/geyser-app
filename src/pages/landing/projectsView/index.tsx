import { useCallback } from 'react'

import { useFilterContext } from '../../../context'
import { checkKeyValueExists } from '../../../utils'
import { PaginatedView, TrendingView } from './FilteredProjectList'
import { LandingProjectList } from './LandingProjectList'

export const ProjectsView = () => {
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
  }, [filters])

  if (checkIfRenderFilter()) {
    if (checkIfRecent()) {
      return <TrendingView />
    }

    return <PaginatedView />
  }

  return <LandingProjectList />
}
