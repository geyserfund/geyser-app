import { createContext, useContext, useState } from 'react'

import { ProjectsOrderByInput, ProjectStatus, ProjectType } from '../types'

export type FilterType = {
  countryCode?: string
  region?: string
  search?: string
  status?: ProjectStatus
  type?: ProjectType
  tagIds?: number[]
  recent?: boolean
}

export type SortType = { recent?: boolean } & ProjectsOrderByInput

export interface FilterState {
  filters: FilterType
  updateFilter: (value: Partial<FilterType>) => void
  sort: SortType
  updateSort: (value: Partial<SortType>) => void
}

const defaultFilterContext = {
  filters: {},
  updateFilter() {},
  sort: {},
  updateSort() {},
}

export const FilterContext = createContext<FilterState>(defaultFilterContext)

export const FilterProvider = ({ children }: { children: React.ReactNode }) => {
  const [filters, setFilters] = useState<FilterType>({} as FilterType)
  const [sort, setSort] = useState<SortType>({ createdAt: 'desc' } as SortType)

  const updateFilter = (value: Partial<FilterType>) => {
    setFilters({ ...filters, recent: false, ...value })
  }

  const updateSort = (value: Partial<SortType>) => {
    setSort({ ...value })
  }

  return (
    <FilterContext.Provider
      value={{
        filters,
        updateFilter,
        sort,
        updateSort,
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}

export const useFilterContext = () => useContext(FilterContext)
