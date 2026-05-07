import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Card,
  HStack,
  IconButton,
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react'
import { t } from 'i18next'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { PiArrowClockwiseBold, PiArrowSquareOutBold, PiCaretRightBold } from 'react-icons/pi'
import { Link as RouterLink, useParams } from 'react-router'

import { Head } from '@/config/Head.tsx'
import { NotAuthorized } from '@/modules/general/fallback'
import { Body } from '@/shared/components/typography/Body.tsx'
import { H2 } from '@/shared/components/typography/Heading.tsx'
import { getPath } from '@/shared/constants/config/routerPaths'
import {
  type ImpactFundDashboardApplicationsQuery,
  type ImpactFundQuery,
  ImpactFundApplicationStatus,
  useImpactFundQuery,
} from '@/types'

import { type ActiveAction, ApplicationActionModals } from '../components/dashboard/ApplicationActionModals'
import type { DashboardAction } from '../components/dashboard/ApplicationActionsMenu'
import { ApplicationDetailsDrawer } from '../components/dashboard/ApplicationDetailsDrawer'
import { ApplicationsCardList } from '../components/dashboard/ApplicationsCardList'
import { ApplicationsTable } from '../components/dashboard/ApplicationsTable'
import { fundedStatuses, reviewableStatuses } from '../components/dashboard/dashboardConstants'
import { DashboardEmptyAndErrorBoundary } from '../components/dashboard/DashboardEmptyState'
import { DashboardKpiTiles } from '../components/dashboard/DashboardKpiTiles'
import { ApplicationsTableSkeleton, KpiTilesSkeleton } from '../components/dashboard/DashboardSkeletons'
import { DashboardToolbar } from '../components/dashboard/DashboardToolbar'
import { useDashboardApplications } from '../components/dashboard/useDashboardApplications'
import { type DashboardQuickView, useDashboardFilters } from '../components/dashboard/useDashboardFilters'

type ImpactFundDetails = NonNullable<ImpactFundQuery['impactFund']> & { canAccessDashboard: boolean }
type DashboardApplication =
  ImpactFundDashboardApplicationsQuery['impactFundDashboardApplications']['applications'][number]

function statusesForView(view: DashboardQuickView): ImpactFundApplicationStatus[] {
  switch (view) {
    case 'needs-review':
      return reviewableStatuses
    case 'funded':
      return fundedStatuses
    case 'rejected':
      return [ImpactFundApplicationStatus.Rejected, ImpactFundApplicationStatus.Canceled]
    default:
      return []
  }
}

export function ImpactFundDashboardPage() {
  const { impactFundName } = useParams<{ impactFundName: string }>()
  const decodedImpactFundName = impactFundName ? decodeURIComponent(impactFundName) : ''

  const {
    filters,
    setStatuses,
    setFundingModels,
    setSort,
    setSearch,
    setView,
    openApplication,
    clearAll,
    hasAnyFilter,
  } = useDashboardFilters()

  const isMobile = useBreakpointValue({ base: true, lg: false }) ?? false
  const [activeAction, setActiveAction] = useState<ActiveAction>(null)

  const {
    data,
    loading,
    error,
    refetch: refetchImpactFund,
  } = useImpactFundQuery({
    variables: { input: { where: { name: decodedImpactFundName } } },
    skip: !impactFundName,
  })

  const impactFund: ImpactFundDetails | undefined = data?.impactFund as ImpactFundDetails | undefined
  const canAccessDashboard = impactFund?.canAccessDashboard ?? false

  const effectiveStatuses = useMemo(() => {
    const fromView = statusesForView(filters.view)
    if (fromView.length > 0 && filters.statuses.length === 0) return fromView
    return filters.statuses
  }, [filters.statuses, filters.view])

  const {
    dashboardApplications,
    applications,
    filteredApplications,
    totalCount,
    isInitialLoading,
    isLoading: applicationsLoading,
    isLoadingMore,
    error: applicationsError,
    hasMoreApplications,
    loadMore,
    refetch: refetchApplications,
  } = useDashboardApplications({
    impactFundId: impactFund?.id,
    canAccessDashboard,
    effectiveStatuses,
    fundingModels: filters.fundingModels,
    sort: filters.sort,
    search: filters.search,
  })

  const detailsApplication = useMemo<DashboardApplication | null>(() => {
    if (!filters.applicationId) return null
    return filteredApplications.find((a) => String(a.applicationId) === filters.applicationId) ?? null
  }, [filteredApplications, filters.applicationId])

  const handleAction = useCallback((action: DashboardAction, application: DashboardApplication) => {
    setActiveAction({
      type: action,
      applicationId: String(application.applicationId),
      currentStatus: application.status,
      currentFundingModel: application.fundingModel,
      projectTitle: application.project.title,
    })
  }, [])

  const handleRefetchAll = useCallback(async () => {
    await Promise.all([refetchApplications(), refetchImpactFund()])
  }, [refetchApplications, refetchImpactFund])

  // Auto-close drawer when the selected application falls out of the visible set.
  useEffect(() => {
    if (!filters.applicationId) return
    if (isInitialLoading) return
    const stillExists = filteredApplications.some((a) => String(a.applicationId) === filters.applicationId)
    if (!stillExists) openApplication(null)
  }, [filteredApplications, filters.applicationId, isInitialLoading, openApplication])

  if (loading) {
    return (
      <Card p={{ base: 4, md: 6 }}>
        <VStack align="stretch" spacing={6}>
          <KpiTilesSkeleton />
          <ApplicationsTableSkeleton />
        </VStack>
      </Card>
    )
  }

  if (error) {
    return (
      <Card p={{ base: 4, md: 6 }}>
        <DashboardEmptyAndErrorBoundary onRetry={() => refetchImpactFund()} />
      </Card>
    )
  }

  if (!impactFund) return null
  if (!canAccessDashboard) return <NotAuthorized />

  return (
    <>
      <Head title={`${impactFund.title} Dashboard`} />
      <VStack align="stretch" spacing={5}>
        <DashboardHeader
          impactFundTitle={impactFund.title}
          impactFundName={impactFund.name}
          onRefresh={handleRefetchAll}
          isRefreshing={applicationsLoading && !isInitialLoading}
        />

        {isInitialLoading ? (
          <KpiTilesSkeleton />
        ) : (
          <DashboardKpiTiles
            impactFund={impactFund}
            dashboardApplications={dashboardApplications}
            isLoading={applicationsLoading && !dashboardApplications}
          />
        )}

        <Card p={{ base: 3, md: 5 }} variant="outline">
          <VStack align="stretch" spacing={4}>
            <DashboardToolbar
              search={filters.search}
              onSearchChange={setSearch}
              statuses={filters.statuses}
              onStatusesChange={setStatuses}
              fundingModels={filters.fundingModels}
              onFundingModelsChange={setFundingModels}
              view={filters.view}
              onViewChange={setView}
              onClearAll={clearAll}
              hasAnyFilter={hasAnyFilter}
              totalCount={totalCount}
              loadedCount={applications.length}
            />

            <ApplicationsResultArea
              isInitialLoading={isInitialLoading}
              hasError={Boolean(applicationsError)}
              hasFilters={hasAnyFilter}
              isMobile={isMobile}
              filteredApplications={filteredApplications}
              sort={filters.sort}
              onSortChange={setSort}
              onOpenApplication={openApplication}
              onAction={handleAction}
              onClearFilters={clearAll}
              onRetry={() => refetchApplications()}
              selectedApplicationId={filters.applicationId}
            />

            {hasMoreApplications && !applicationsError && !isInitialLoading ? (
              <Box>
                <Button
                  alignSelf="flex-start"
                  onClick={loadMore}
                  isLoading={isLoadingMore}
                  isDisabled={applicationsLoading}
                  colorScheme="primary1"
                  variant="outline"
                  size="sm"
                >
                  {t('Load more')}
                </Button>
              </Box>
            ) : null}
          </VStack>
        </Card>
      </VStack>

      <ApplicationDetailsDrawer
        application={detailsApplication}
        applications={filteredApplications}
        onClose={() => openApplication(null)}
        onNavigate={openApplication}
        onAction={handleAction}
        onRefetch={handleRefetchAll}
      />

      <ApplicationActionModals
        activeAction={activeAction}
        onClose={() => setActiveAction(null)}
        onSuccess={handleRefetchAll}
      />
    </>
  )
}

type ApplicationsResultAreaProps = {
  isInitialLoading: boolean
  hasError: boolean
  hasFilters: boolean
  isMobile: boolean
  filteredApplications: DashboardApplication[]
  sort: import('@/types').ImpactFundDashboardApplicationsSort
  onSortChange: (sort: import('@/types').ImpactFundDashboardApplicationsSort) => void
  onOpenApplication: (applicationId: string) => void
  onAction: (action: DashboardAction, application: DashboardApplication) => void
  onClearFilters: () => void
  onRetry: () => void
  selectedApplicationId: string | null
}

function ApplicationsResultArea({
  isInitialLoading,
  hasError,
  hasFilters,
  isMobile,
  filteredApplications,
  sort,
  onSortChange,
  onOpenApplication,
  onAction,
  onClearFilters,
  onRetry,
  selectedApplicationId,
}: ApplicationsResultAreaProps) {
  if (isInitialLoading) return <ApplicationsTableSkeleton />
  if (hasError) return <DashboardEmptyAndErrorBoundary onRetry={onRetry} />
  if (filteredApplications.length === 0) {
    return <DashboardEmptyAndErrorBoundary empty hasFiltersActive={hasFilters} onClearFilters={onClearFilters} />
  }

  return isMobile ? (
    <ApplicationsCardList
      applications={filteredApplications}
      sort={sort}
      onSortChange={onSortChange}
      onOpenApplication={onOpenApplication}
      onAction={onAction}
      selectedApplicationId={selectedApplicationId}
    />
  ) : (
    <ApplicationsTable
      applications={filteredApplications}
      sort={sort}
      onSortChange={onSortChange}
      onOpenApplication={onOpenApplication}
      onAction={onAction}
      selectedApplicationId={selectedApplicationId}
    />
  )
}

type DashboardHeaderProps = {
  impactFundTitle: string
  impactFundName: string
  onRefresh: () => void
  isRefreshing: boolean
}

function DashboardHeader({ impactFundTitle, impactFundName, onRefresh, isRefreshing }: DashboardHeaderProps) {
  return (
    <Box>
      <Breadcrumb fontSize="sm" separator={<PiCaretRightBold size={10} color="var(--chakra-colors-neutral1-9)" />}>
        <BreadcrumbItem>
          <BreadcrumbLink as={RouterLink} to={getPath('impactFunds')} color="neutral1.9">
            {t('Impact funds')}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink as={RouterLink} to={getPath('impactFunds', impactFundName)} color="neutral1.9">
            {impactFundTitle}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <Body size="sm" color="neutral1.11" bold>
            {t('Dashboard')}
          </Body>
        </BreadcrumbItem>
      </Breadcrumb>
      <HStack justify="space-between" align="center" pt={2} flexWrap="wrap" rowGap={2}>
        <VStack align="start" spacing={0}>
          <H2 size="xl" bold>
            {impactFundTitle}
          </H2>
          <Body size="sm" color="neutral1.9">
            {t('Review applications and track impact fund disbursements.')}
          </Body>
        </VStack>
        <HStack spacing={2}>
          <Button
            as={RouterLink}
            to={getPath('impactFunds', impactFundName)}
            target="_blank"
            rel="noopener noreferrer"
            size="sm"
            variant="outline"
            rightIcon={<PiArrowSquareOutBold />}
          >
            {t('View public page')}
          </Button>
          <IconButton
            aria-label={t('Refresh dashboard')}
            size="sm"
            variant="outline"
            icon={<PiArrowClockwiseBold />}
            onClick={onRefresh}
            isLoading={isRefreshing}
          />
        </HStack>
      </HStack>
    </Box>
  )
}
