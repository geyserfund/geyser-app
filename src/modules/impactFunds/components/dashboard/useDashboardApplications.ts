import { useCallback, useMemo, useState } from 'react'

import {
  type ImpactFundDashboardApplicationsQuery,
  ImpactFundApplicationFundingModel,
  ImpactFundApplicationStatus,
  ImpactFundDashboardApplicationsSort,
  useImpactFundDashboardApplicationsQuery,
} from '@/types'

import { APPLICATIONS_PAGE_SIZE } from './dashboardConstants'

type DashboardApplication =
  ImpactFundDashboardApplicationsQuery['impactFundDashboardApplications']['applications'][number]

type UseDashboardApplicationsArgs = {
  impactFundId: number | undefined
  canAccessDashboard: boolean
  effectiveStatuses: ImpactFundApplicationStatus[]
  fundingModels: ImpactFundApplicationFundingModel[]
  sort: ImpactFundDashboardApplicationsSort
  search: string
}

function buildInput({
  impactFundId,
  statuses,
  fundingModels,
  sort,
  cursorId,
}: {
  impactFundId: number
  statuses: ImpactFundApplicationStatus[]
  fundingModels: ImpactFundApplicationFundingModel[]
  sort: ImpactFundDashboardApplicationsSort
  cursorId?: string
}) {
  return {
    impactFundId,
    ...(statuses.length > 0 ? { statusIn: statuses } : {}),
    ...(fundingModels.length > 0 ? { fundingModelIn: fundingModels } : {}),
    sort,
    pagination: {
      take: APPLICATIONS_PAGE_SIZE,
      ...(cursorId ? { cursor: { id: cursorId } } : {}),
    },
  }
}

function matchesSearch(application: DashboardApplication, searchTerm: string): boolean {
  if (!searchTerm) return true
  const lowered = searchTerm.toLowerCase()
  return (
    application.project.title.toLowerCase().includes(lowered) ||
    (application.project.country?.toLowerCase().includes(lowered) ?? false) ||
    (application.project.shortDescription?.toLowerCase().includes(lowered) ?? false) ||
    (application.creator?.username?.toLowerCase().includes(lowered) ?? false) ||
    (application.creator?.email?.toLowerCase().includes(lowered) ?? false)
  )
}

export function useDashboardApplications({
  impactFundId,
  canAccessDashboard,
  effectiveStatuses,
  fundingModels,
  sort,
  search,
}: UseDashboardApplicationsArgs) {
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  const { data, previousData, loading, error, fetchMore, refetch } = useImpactFundDashboardApplicationsQuery({
    skip: !impactFundId || !canAccessDashboard,
    variables: {
      input: buildInput({
        impactFundId: impactFundId ?? 0,
        statuses: effectiveStatuses,
        fundingModels,
        sort,
      }),
    },
    notifyOnNetworkStatusChange: true,
  })

  const dashboardApplications = useMemo(
    () => data?.impactFundDashboardApplications || previousData?.impactFundDashboardApplications,
    [data, previousData],
  )

  const applications = useMemo<DashboardApplication[]>(
    () => dashboardApplications?.applications ?? [],
    [dashboardApplications],
  )
  const totalCount = dashboardApplications?.totalCount ?? 0
  const filteredApplications = useMemo(
    () => applications.filter((application) => matchesSearch(application, search)),
    [applications, search],
  )

  const hasMoreApplications = applications.length < totalCount
  const isInitialLoading = loading && !dashboardApplications

  const loadMore = useCallback(async () => {
    const lastApplicationId = applications.at(-1)?.applicationId
    if (!impactFundId || !lastApplicationId || isLoadingMore) return
    setIsLoadingMore(true)
    try {
      await fetchMore({
        variables: {
          input: buildInput({
            impactFundId,
            statuses: effectiveStatuses,
            fundingModels,
            sort,
            cursorId: String(lastApplicationId),
          }),
        },
        updateQuery(previousResult, { fetchMoreResult }) {
          if (!fetchMoreResult?.impactFundDashboardApplications) return previousResult
          return {
            impactFundDashboardApplications: {
              ...fetchMoreResult.impactFundDashboardApplications,
              applications: [
                ...previousResult.impactFundDashboardApplications.applications,
                ...fetchMoreResult.impactFundDashboardApplications.applications,
              ],
            },
          }
        },
      })
    } finally {
      setIsLoadingMore(false)
    }
  }, [applications, effectiveStatuses, fetchMore, fundingModels, impactFundId, isLoadingMore, sort])

  return {
    dashboardApplications,
    applications,
    filteredApplications,
    totalCount,
    isInitialLoading,
    isLoading: loading,
    isLoadingMore,
    error,
    hasMoreApplications,
    loadMore,
    refetch,
  }
}
