import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { useLocation, useMatch, useNavigate, useParams, useSearchParams } from 'react-router'

import { getPath } from '@/shared/constants'
import { ActivityResourceType, ProjectStatus, ProjectType } from '@/types'
import { toInt } from '@/utils'

export type FilterType = {
  countryCode?: string
  region?: string
  category?: string
  subCategory?: string
  search?: string
  status?: ProjectStatus
  type?: ProjectType
  tagIds?: number[]
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

const FilterContext = createContext<FilterState>(defaultFilterContext)

export const useFilterContext = () => useContext(FilterContext)

export const FilterProvider = ({ children, isLoggedIn }: { children: React.ReactNode; isLoggedIn?: boolean }) => {
  const params = useParams<{ category: string; subcategory: string }>()

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

      const currentFilters = getFiltersFromUrlParams(searchParams, params)

      const newFilters = {
        ...currentFilters,
        ...value,
      }

      const newParameters = [] as [string, string][]

      let hasCategory = newFilters.category || ''
      let hasSubCategory = newFilters.subCategory || ''

      for (const key of Object.keys(newFilters)) {
        if (newFilters[key as keyof FilterType]) {
          if (key === 'category') {
            hasCategory = newFilters[key as keyof FilterType] as string
          } else if (key === 'subCategory') {
            hasSubCategory = newFilters[key as keyof FilterType] as string
          } else if (key === 'tagIds') {
            const tagIds = newFilters[key as keyof FilterType] as number[]
            if (tagIds.length > 0) {
              newParameters.push([key, tagIds.join(',')])
            }
          } else {
            newParameters.push([key, `${newFilters[key as keyof FilterType]}`])
          }
        }
      }

      if (hasCategory) {
        navigate(urlWithQueryParams(getPath('discoveryProjectCategory', hasCategory), newParameters), { state: null })
      } else if (hasSubCategory) {
        navigate(urlWithQueryParams(getPath('discoveryProjectSubCategory', hasSubCategory), newParameters), {
          state: null,
        })
      } else {
        navigate(urlWithQueryParams(getPath('discoveryLanding'), newParameters), { state: null })
      }
    },
    [isLandingFeedPage, isLoggedIn, searchParams, navigate, params],
  )

  useEffect(() => {
    const urlFilters = getFiltersFromUrlParams(searchParams, params)
    setFilters({ ...urlFilters })
    if (location.state?.save) {
      navigate('', { state: null })
    } else if (location.state?.filter) {
      updateFilter(location.state.filter)
    }
  }, [location, navigate, updateFilter, searchParams, params])

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

const getFiltersFromUrlParams = (
  searchParams: URLSearchParams,
  params?: { category?: string; subcategory?: string },
) => {
  const countryCode = searchParams.get('countryCode') || undefined
  const region = searchParams.get('region') || undefined
  const search = searchParams.get('search') || undefined
  const status = (searchParams.get('status') as ProjectStatus) || undefined
  const type = (searchParams.get('type') as ProjectType) || undefined
  const category = searchParams.get('category') || params?.category || undefined
  const subCategory = searchParams.get('subCategory') || params?.subcategory || undefined
  const tagIds =
    searchParams
      .get('tagIds')
      ?.split(',')
      ?.map((val) => toInt(val)) || undefined
  const activity = (searchParams.get('activity') as ActivityResourceType) || undefined

  return {
    countryCode,
    region,
    category,
    subCategory,
    search,
    status,
    type,
    tagIds,
    activity,
  }
}

const urlWithQueryParams = (path: string, params: [string, string][]) => {
  const searchParams = new URLSearchParams(params)
  const url = params.length > 0 ? `${path}?${searchParams.toString()}` : path
  return url
}
