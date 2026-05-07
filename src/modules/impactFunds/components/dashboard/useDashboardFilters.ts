import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router'

import {
  ImpactFundApplicationFundingModel,
  ImpactFundApplicationStatus,
  ImpactFundDashboardApplicationsSort,
} from '@/types'

import { fundingModelOptions, statusOptions } from './dashboardConstants'

export type DashboardQuickView = 'all' | 'needs-review' | 'funded' | 'rejected'

export type DashboardFilters = {
  statuses: ImpactFundApplicationStatus[]
  fundingModels: ImpactFundApplicationFundingModel[]
  sort: ImpactFundDashboardApplicationsSort
  search: string
  view: DashboardQuickView
  applicationId: string | null
}

const DEFAULT_SORT = ImpactFundDashboardApplicationsSort.Latest
const DEFAULT_VIEW: DashboardQuickView = 'all'

const PARAM = {
  status: 'status',
  fundingModel: 'fundingModel',
  sort: 'sort',
  search: 'q',
  view: 'view',
  applicationId: 'application',
} as const

const isValidStatus = (value: string): value is ImpactFundApplicationStatus =>
  (statusOptions as string[]).includes(value)

const isValidFundingModel = (value: string): value is ImpactFundApplicationFundingModel =>
  (fundingModelOptions as string[]).includes(value)

const isValidSort = (value: string): value is ImpactFundDashboardApplicationsSort =>
  (Object.values(ImpactFundDashboardApplicationsSort) as string[]).includes(value)

const isValidView = (value: string): value is DashboardQuickView =>
  ['all', 'needs-review', 'funded', 'rejected'].includes(value)

export function useDashboardFilters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const filters = useMemo<DashboardFilters>(() => {
    const statuses = searchParams.getAll(PARAM.status).filter(isValidStatus)
    const fundingModels = searchParams.getAll(PARAM.fundingModel).filter(isValidFundingModel)
    const rawSort = searchParams.get(PARAM.sort) || ''
    const rawView = searchParams.get(PARAM.view) || ''
    return {
      statuses,
      fundingModels,
      sort: isValidSort(rawSort) ? rawSort : DEFAULT_SORT,
      search: searchParams.get(PARAM.search) || '',
      view: isValidView(rawView) ? rawView : DEFAULT_VIEW,
      applicationId: searchParams.get(PARAM.applicationId),
    }
  }, [searchParams])

  const updateParams = useCallback(
    (updater: (params: URLSearchParams) => void) => {
      setSearchParams(
        (current) => {
          const next = new URLSearchParams(current)
          updater(next)
          return next
        },
        { replace: true },
      )
    },
    [setSearchParams],
  )

  const setStatuses = useCallback(
    (statuses: ImpactFundApplicationStatus[]) => {
      updateParams((params) => {
        params.delete(PARAM.status)
        statuses.forEach((status) => params.append(PARAM.status, status))
        params.delete(PARAM.view) // explicit filter overrides quick view
      })
    },
    [updateParams],
  )

  const setFundingModels = useCallback(
    (models: ImpactFundApplicationFundingModel[]) => {
      updateParams((params) => {
        params.delete(PARAM.fundingModel)
        models.forEach((model) => params.append(PARAM.fundingModel, model))
      })
    },
    [updateParams],
  )

  const setSort = useCallback(
    (sort: ImpactFundDashboardApplicationsSort) => {
      updateParams((params) => {
        if (sort === DEFAULT_SORT) {
          params.delete(PARAM.sort)
        } else {
          params.set(PARAM.sort, sort)
        }
      })
    },
    [updateParams],
  )

  const setSearch = useCallback(
    (search: string) => {
      updateParams((params) => {
        if (!search) {
          params.delete(PARAM.search)
        } else {
          params.set(PARAM.search, search)
        }
      })
    },
    [updateParams],
  )

  const setView = useCallback(
    (view: DashboardQuickView) => {
      updateParams((params) => {
        params.delete(PARAM.status)
        if (view === DEFAULT_VIEW) {
          params.delete(PARAM.view)
        } else {
          params.set(PARAM.view, view)
        }
      })
    },
    [updateParams],
  )

  const openApplication = useCallback(
    (applicationId: string | null) => {
      updateParams((params) => {
        if (!applicationId) {
          params.delete(PARAM.applicationId)
        } else {
          params.set(PARAM.applicationId, applicationId)
        }
      })
    },
    [updateParams],
  )

  const clearAll = useCallback(() => {
    updateParams((params) => {
      params.delete(PARAM.status)
      params.delete(PARAM.fundingModel)
      params.delete(PARAM.sort)
      params.delete(PARAM.search)
      params.delete(PARAM.view)
    })
  }, [updateParams])

  const hasAnyFilter = useMemo(
    () =>
      filters.statuses.length > 0 ||
      filters.fundingModels.length > 0 ||
      Boolean(filters.search) ||
      filters.view !== DEFAULT_VIEW,
    [filters],
  )

  return {
    filters,
    setStatuses,
    setFundingModels,
    setSort,
    setSearch,
    setView,
    openApplication,
    clearAll,
    hasAnyFilter,
  }
}
