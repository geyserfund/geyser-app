import { useState } from 'react'

import { ProjectStatus } from '../../types'

export type FilterType = {
  countryCode: string
  region: string
  search: string
  status?: ProjectStatus
  tagIds: number[]
}

const defaultFilter = {
  countryCode: '',
  region: '',
  search: '',
  tagIds: [],
}

export const useFilterStates = (): [
  FilterType,
  (value: Partial<FilterType>) => void,
] => {
  const [filters, setFilters] = useState<FilterType>(defaultFilter)

  const updateFilter = (value: Partial<FilterType>) => {
    setFilters({ ...filters, ...value })
  }

  return [filters, updateFilter]
}

export interface FilterState {
  filters: FilterType
  updateFilter: (value: Partial<FilterType>) => void
}
