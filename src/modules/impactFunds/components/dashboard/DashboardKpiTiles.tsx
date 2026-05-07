import { Box, HStack, Icon, Progress, SimpleGrid, Skeleton, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { type ComponentType, useMemo } from 'react'
import { PiHandHeartBold, PiHourglassBold, PiStackBold, PiSwapBold } from 'react-icons/pi'

import { Body } from '@/shared/components/typography/Body.tsx'
import { H2 } from '@/shared/components/typography/Heading.tsx'
import { useCurrencyFormatter } from '@/shared/utils/hooks/useCurrencyFormatter'
import {
  type ImpactFundDashboardApplicationsQuery,
  type ImpactFundQuery,
  ImpactFundApplicationFundingModel,
  ImpactFundApplicationStatus,
} from '@/types'

import { fundingModelLabels, reviewableStatuses } from './dashboardConstants'
import { formatEnumLabel, formatSatsCompact } from './dashboardFormatters'

type ImpactFundForKpis = NonNullable<ImpactFundQuery['impactFund']>
type DashboardApplicationsResult = ImpactFundDashboardApplicationsQuery['impactFundDashboardApplications']
type FundingSummaryRow = DashboardApplicationsResult['fundingSummary'][number]

type DashboardKpiTilesProps = {
  impactFund: ImpactFundForKpis
  dashboardApplications: DashboardApplicationsResult | undefined
  isLoading: boolean
}

type AccentColor = 'primary1' | 'success' | 'warning' | 'info'

type StatTile = {
  key: string
  label: string
  value: string
  fiat?: string
  hint?: string
  icon: ComponentType<{ size?: number | string }>
  accent: AccentColor
}

type BreakdownEntry = {
  key: string
  label: string
  awardedSats: number
  applicationsCount: number
}

export function DashboardKpiTiles({ impactFund, dashboardApplications, isLoading }: DashboardKpiTilesProps) {
  const { formatUsdAmount } = useCurrencyFormatter()

  const fundingSummary = useMemo<FundingSummaryRow[]>(
    () => dashboardApplications?.fundingSummary ?? [],
    [dashboardApplications],
  )

  const stats = useMemo<StatTile[]>(() => {
    const awardedTotalSats = impactFund.metrics?.awardedTotalSats ?? 0
    const projectsFundedCount = impactFund.metrics?.projectsFundedCount ?? 0
    const applications = dashboardApplications?.applications ?? []
    const inReviewCount = applications.filter((a) =>
      (reviewableStatuses as ImpactFundApplicationStatus[]).includes(a.status),
    ).length

    return [
      {
        key: 'awarded',
        label: t('Awarded'),
        value: formatSatsCompact(awardedTotalSats),
        fiat: awardedTotalSats > 0 ? formatUsdAmount(awardedTotalSats) : undefined,
        hint: t('{{count}} projects funded', { count: projectsFundedCount }),
        icon: PiHandHeartBold,
        accent: 'success',
      },
      {
        key: 'in-review',
        label: t('Needs review'),
        value: String(inReviewCount),
        hint: t('Open applications on this page'),
        icon: PiHourglassBold,
        accent: 'warning',
      },
    ]
  }, [
    dashboardApplications?.applications,
    formatUsdAmount,
    impactFund.metrics?.awardedTotalSats,
    impactFund.metrics?.projectsFundedCount,
  ])

  const byCategory = useMemo<BreakdownEntry[]>(() => groupBy(fundingSummary, byCategoryKey), [fundingSummary])
  const byFundingModel = useMemo<BreakdownEntry[]>(() => groupBy(fundingSummary, byFundingModelKey), [fundingSummary])

  return (
    <VStack align="stretch" spacing={3}>
      <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={3}>
        {stats.map((tile) => (
          <StatCard key={tile.key} tile={tile} isLoading={isLoading} />
        ))}
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={3}>
        <BreakdownCard
          title={t('Awarded by category')}
          icon={PiStackBold}
          accent="primary1"
          entries={byCategory}
          isLoading={isLoading}
        />
        <BreakdownCard
          title={t('Awarded by funding modality')}
          icon={PiSwapBold}
          accent="info"
          entries={byFundingModel}
          isLoading={isLoading}
        />
      </SimpleGrid>
    </VStack>
  )
}

function StatCard({ tile, isLoading }: { tile: StatTile; isLoading: boolean }) {
  return (
    <Box p={4} borderWidth="1px" borderColor="neutral1.6" borderRadius="md" bg="utils.pbg" minH="116px">
      <VStack align="stretch" spacing={2} h="full">
        <HStack justify="space-between">
          <Body size="xs" color="neutral1.11" bold textTransform="uppercase" letterSpacing="0.04em">
            {tile.label}
          </Body>
          <Box color={`${tile.accent}.9`}>
            <Icon as={tile.icon} boxSize="18px" />
          </Box>
        </HStack>
        {isLoading ? (
          <Skeleton height="28px" width="60%" />
        ) : (
          <H2 size="xl" bold lineHeight="1.2">
            {tile.value}
          </H2>
        )}
        {tile.fiat || tile.hint ? (
          <Body size="xs" color="neutral1.9">
            {tile.fiat ?? tile.hint}
          </Body>
        ) : (
          <Box minH="16px" />
        )}
      </VStack>
    </Box>
  )
}

type BreakdownCardProps = {
  title: string
  icon: ComponentType<{ size?: number | string }>
  accent: AccentColor
  entries: BreakdownEntry[]
  isLoading: boolean
}

function BreakdownCard({ title, icon, accent, entries, isLoading }: BreakdownCardProps) {
  const { formatUsdAmount } = useCurrencyFormatter()

  const sortedEntries = useMemo(
    () => [...entries].filter((entry) => entry.awardedSats > 0).sort((a, b) => b.awardedSats - a.awardedSats),
    [entries],
  )
  const total = useMemo(() => sortedEntries.reduce((sum, entry) => sum + entry.awardedSats, 0), [sortedEntries])

  return (
    <Box p={4} borderWidth="1px" borderColor="neutral1.6" borderRadius="md" bg="utils.pbg" minH="116px">
      <VStack align="stretch" spacing={3} h="full">
        <HStack justify="space-between">
          <Body size="xs" color="neutral1.11" bold textTransform="uppercase" letterSpacing="0.04em">
            {title}
          </Body>
          <Box color={`${accent}.9`}>
            <Icon as={icon} boxSize="18px" />
          </Box>
        </HStack>
        {isLoading ? (
          <VStack align="stretch" spacing={2}>
            <Skeleton height="14px" width="80%" />
            <Skeleton height="14px" width="60%" />
            <Skeleton height="14px" width="70%" />
          </VStack>
        ) : sortedEntries.length === 0 ? (
          <Body size="sm" color="neutral1.9">
            {t('No awards yet.')}
          </Body>
        ) : (
          <VStack align="stretch" spacing={2.5}>
            {sortedEntries.map((entry) => {
              const percent = total > 0 ? (entry.awardedSats / total) * 100 : 0
              return (
                <Box key={entry.key}>
                  <HStack justify="space-between" align="baseline">
                    <Body size="xs" color="neutral1.11" noOfLines={1}>
                      {entry.label}
                    </Body>
                    <HStack spacing={2} align="baseline">
                      <Body size="xs" bold>
                        {formatSatsCompact(entry.awardedSats)}
                      </Body>
                      <Body size="xs" color="neutral1.9" minW="36px" textAlign="right">
                        {Math.round(percent)}%
                      </Body>
                    </HStack>
                  </HStack>
                  <Progress
                    value={percent}
                    size="xs"
                    colorScheme={accent}
                    borderRadius="full"
                    mt={1}
                    aria-label={t('{{label}}: {{count}} applications, {{usd}}', {
                      label: entry.label,
                      count: entry.applicationsCount,
                      usd: formatUsdAmount(entry.awardedSats),
                    })}
                  />
                </Box>
              )
            })}
          </VStack>
        )}
      </VStack>
    </Box>
  )
}

function byCategoryKey(row: FundingSummaryRow) {
  const category = row.category ?? null
  return {
    key: category ?? 'uncategorized',
    label: category ? t(formatEnumLabel(category)) : t('Uncategorized'),
  }
}

function byFundingModelKey(row: FundingSummaryRow) {
  return {
    key: row.fundingModel,
    label: t(fundingModelLabels[row.fundingModel as ImpactFundApplicationFundingModel]),
  }
}

function groupBy(
  rows: FundingSummaryRow[],
  keyFn: (row: FundingSummaryRow) => { key: string; label: string },
): BreakdownEntry[] {
  const acc = new Map<string, BreakdownEntry>()
  for (const row of rows) {
    const { key, label } = keyFn(row)
    const existing = acc.get(key)
    if (existing) {
      existing.awardedSats += row.awardedTotalSats
      existing.applicationsCount += row.applicationsCount
    } else {
      acc.set(key, {
        key,
        label,
        awardedSats: row.awardedTotalSats,
        applicationsCount: row.applicationsCount,
      })
    }
  }

  return Array.from(acc.values())
}
