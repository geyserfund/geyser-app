import { createContext, useContext, useEffect, useState } from 'react'
import {
  useLocation,
  useMatch,
  useNavigate,
  useSearchParams,
} from 'react-router-dom'

import { getPath } from '../constants'
import { checkIfRenderFilter } from '../pages/landing'
import { disableSortByTrending } from '../pages/landing/filters/sort'
import { ActivityResourceType, ProjectStatus, ProjectType } from '../types'
import { toInt } from '../utils'

export type FilterType = {
  countryCode?: string
  region?: string
  search?: string
  status?: ProjectStatus
  type?: ProjectType
  tagIds?: number[]
  recent?: boolean
  activity?: ActivityResourceType
  sort?: SortType
}

export enum SortType {
  recent = 'recent',
  balance = 'balance',
  createdAt = 'createdAt',
}

export interface FilterState {
  filters: FilterType
  updateFilter: (value: Partial<FilterType>) => void
  clearFilter: () => void
}

const defaultFilterContext = {
  filters: {},
  updateFilter() {},
  clearFilter() {},
}

export const FilterContext = createContext<FilterState>(defaultFilterContext)

export const FilterProvider = ({
  children,
  isLoggedIn,
}: {
  children: React.ReactNode
  isLoggedIn?: boolean
}) => {
  const [filters, setFilters] = useState<FilterType>({} as FilterType)

  const isLandingFeedPage = useMatch(getPath('landingFeed'))

  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const location = useLocation()

  const getFiltersFromUrlParams = () => {
    const countryCode = searchParams.get('countryCode') || undefined
    const region = searchParams.get('region') || undefined
    const search = searchParams.get('search') || undefined
    const status = (searchParams.get('status') as ProjectStatus) || undefined
    const type = (searchParams.get('type') as ProjectType) || undefined
    const tagIds =
      searchParams
        .get('tagIds')
        ?.split(',')
        ?.map((val) => toInt(val)) || undefined
    const recent = Boolean(searchParams.get('recent')) || undefined
    const activity =
      (searchParams.get('activity') as ActivityResourceType) || undefined
    const sort = (searchParams.get('sort') as SortType) || undefined

    return {
      countryCode,
      region,
      search,
      status,
      type,
      tagIds,
      recent,
      activity,
      sort,
    }
  }

  const setUrlParamsFromFilters = (value: FilterType) => {
    const newParameters = [] as [string, string][]

    for (const key of Object.keys(value)) {
      if (value[key as keyof FilterType]) {
        if (key === 'tagIds') {
          const tagIds = value[key as keyof FilterType] as number[]
          if (tagIds.length > 0) {
            newParameters.push([key, `${tagIds.join(',')}`])
          }
        } else if (
          key === 'sort' &&
          value[key as keyof FilterType] === SortType.recent &&
          disableSortByTrending(value)
        ) {
          newParameters.push([key, SortType.createdAt])
        } else {
          newParameters.push([key, `${value[key as keyof FilterType]}`])
        }
      }
    }

    setSearchParams(newParameters)
  }

  useEffect(() => {
    const urlFilters = getFiltersFromUrlParams()
    setFilters(urlFilters)
  }, [location])

  const updateFilter = async (value: Partial<FilterType>) => {
    if (isLandingFeedPage && !isLoggedIn) {
      navigate('/', { state: { save: true } })
    }

    const currentFilters = getFiltersFromUrlParams()

    let newfilters = {} as FilterType

    if (checkIfRenderFilter(value)) {
      if (!currentFilters.sort && !isLandingFeedPage) {
        newfilters = {
          ...currentFilters,
          recent: undefined,
          sort: SortType.recent,
          ...value,
        }
      } else {
        newfilters = {
          ...currentFilters,
          recent: undefined,
          ...value,
        }
      }
    } else {
      newfilters = {
        ...currentFilters,
        ...value,
      }
    }

    setUrlParamsFromFilters(newfilters)
  }

  useEffect(() => {
    if (location.state?.save) {
      navigate('', { state: null })
    } else if (location.state?.filter) {
      updateFilter(location.state.filter)
      navigate('', { state: null })
    }
  }, [location.pathname])

  const clearFilter = () => {
    setUrlParamsFromFilters({} as FilterType)
  }

  return (
    <FilterContext.Provider
      value={{
        filters,
        updateFilter,
        clearFilter,
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}

export const useFilterContext = () => useContext(FilterContext)
