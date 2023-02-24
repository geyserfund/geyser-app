import { useCallback } from 'react'

import { FilterState } from '../../../hooks/state'
import { checkKeyValueExists } from '../../../utils'
import { PaginatedView, TrendingView } from './FilteredProjectList'
import { LandingProjectList } from './LandingProjectList'

type ProjectsViewProps = FilterState

export const ProjectsView = ({ filters, updateFilter }: ProjectsViewProps) => {
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
    if (filters.sort && filters.sort.recent) {
      return true
    }

    return false
  }, [filters])

  if (checkIfRenderFilter()) {
    if (checkIfRecent()) {
      return <TrendingView {...{ filters, updateFilter }} />
    }

    return <PaginatedView {...{ filters, updateFilter }} />
  }

  return <LandingProjectList {...{ filters, updateFilter }} />
}
