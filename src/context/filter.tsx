import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import {
  useLocation,
  useMatch,
  useNavigate,
  useSearchParams,
} from 'react-router-dom'

import { getPath } from '../constants'
import { disableSortByTrending } from '../pages/landing/filters/sort'
import { ActivityResourceType, ProjectStatus, ProjectType } from '../types'
import { toInt } from '../utils'
import { checkIfRenderFilter } from '../utils/helpers'

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

export const useFilterContext = () => useContext(FilterContext)

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

  const updateFilter = useCallback(
    async (value: Partial<FilterType>) => {
      if (isLandingFeedPage && !isLoggedIn) {
        navigate('/', { state: { save: true } })
      }

      const currentFilters = getFiltersFromUrlParams(searchParams)

      let newFilters = {} as FilterType

      if (checkIfRenderFilter(value)) {
        if (!currentFilters.sort && !isLandingFeedPage) {
          newFilters = {
            ...currentFilters,
            recent: undefined,
            sort: SortType.recent,
            ...value,
          }
        } else {
          newFilters = {
            ...currentFilters,
            recent: undefined,
            ...value,
          }
        }
      } else {
        newFilters = {
          ...currentFilters,
          ...value,
        }
      }

      const newParameters = [] as [string, string][]

      for (const key of Object.keys(newFilters)) {
        if (newFilters[key as keyof FilterType]) {
          if (key === 'tagIds') {
            const tagIds = newFilters[key as keyof FilterType] as number[]
            if (tagIds.length > 0) {
              newParameters.push([key, tagIds.join(',')])
            }
          } else if (
            key === 'sort' &&
            newFilters[key as keyof FilterType] === SortType.recent &&
            disableSortByTrending(newFilters)
          ) {
            newParameters.push([key, SortType.balance])
          } else {
            newParameters.push([key, `${newFilters[key as keyof FilterType]}`])
          }
        }
      }

      navigate(location.pathname, { state: null })
      setSearchParams(newParameters)
    },
    [
      isLandingFeedPage,
      isLoggedIn,
      searchParams,
      navigate,
      location.pathname,
      setSearchParams,
    ],
  )

  useEffect(() => {
    const urlFilters = getFiltersFromUrlParams(searchParams)
    setFilters(urlFilters)
    if (location.state?.save) {
      navigate('', { state: null })
    } else if (location.state?.filter) {
      updateFilter(location.state.filter)
    }
  }, [location, navigate, updateFilter, searchParams])

  const clearFilter = useCallback(() => {
    setSearchParams({})
  }, [setSearchParams])

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

const getFiltersFromUrlParams = (searchParams: URLSearchParams) => {
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
