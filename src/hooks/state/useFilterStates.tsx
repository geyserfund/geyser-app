import { useState } from 'react'

import { ProjectsOrderByInput, ProjectStatus, ProjectType } from '../../types'
import { checkKeyValueExists } from '../../utils'

export type FilterType = {
  countryCode?: string
  region?: string
  search?: string
  status?: ProjectStatus
  type?: ProjectType
  tagIds?: number[]
  recent?: boolean
  sort: ProjectsOrderByInput & { recent?: boolean }
}

export const useFilterStates = (): [
  FilterType,
  (value: Partial<FilterType>) => void,
] => {
  const [filters, setFilters] = useState<FilterType>({
    sort: { createdAt: 'desc' },
  } as FilterType)

  const updateFilter = (value: Partial<FilterType>) => {
    if (
      checkKeyValueExists(
        value,
        ['tagIds', 'search', 'region', 'countryCode', 'status', 'type'],
        'any',
      )
    ) {
      setFilters({ ...filters, recent: false, ...value })
    } else {
      setFilters({ ...filters, ...value })
    }
  }

  return [filters, updateFilter]
}

export interface FilterState {
  filters: FilterType
  updateFilter: (value: Partial<FilterType>) => void
}
