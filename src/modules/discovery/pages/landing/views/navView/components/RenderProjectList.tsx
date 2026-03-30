import { GridItem, SimpleGrid } from '@chakra-ui/react'
import { MutableRefObject } from 'react'
import { useTranslation } from 'react-i18next'

import { ScrollInvoke } from '@/helpers/ScrollInvoke.tsx'
import { LandingCardBaseSkeleton } from '@/shared/components/layouts/index.ts'
import { ID } from '@/shared/constants/components/id.ts'
import {
  type ContributionsSummary,
  type GlobalProjectLeaderboardRow,
  type ProjectForLandingPageFragment,
  useFeaturedProjectForLandingPageQuery,
} from '@/types/index.ts'
import { useMobileMode } from '@/utils'

import { LandingProjectCard } from '../../../components/LandingProjectCard.tsx'
import { LoadingProjectGridItems } from '../../../components/LoadingProjectGridItems.tsx'

/** Renders discovery project cards and invokes pagination when the active scroll container nears the end. */
export const RenderProjectList = ({
  projects,
  loading,
  isLoadingMore,
  noMoreItems,
  fetchNext,
  projectRows,
  trendingAmountLabel,
  hideTrendingBelowUsd,
}: {
  projects: (ProjectForLandingPageFragment & {
    contributionSummary?: Pick<ContributionsSummary, 'contributionsTotalUsd' | 'contributionsTotal'>
  })[]
  loading?: boolean
  isLoadingMore?: MutableRefObject<boolean>
  noMoreItems?: MutableRefObject<boolean>
  fetchNext?: (count?: number) => Promise<void>
  projectRows?: GlobalProjectLeaderboardRow[]
  trendingAmountLabel?: string
  hideTrendingBelowUsd?: number
}) => {
  const isMobile = useMobileMode()

  const renderBody = () => {
    if (loading) {
      return <LoadingProjectGridItems />
    }

    if (projectRows) {
      return projectRows.map((projectRow) => (
        <GridItem key={projectRow.projectName}>
          <MonthlyLeaderboardProjectCard
            projectRow={projectRow}
            trendingAmountLabel={trendingAmountLabel}
            hideTrendingBelowUsd={hideTrendingBelowUsd}
          />
        </GridItem>
      ))
    }

    return (
      <>
        {projects.map((project) => (
          <GridItem key={project.id}>
            <LandingProjectCard key={project.id} project={project} />
          </GridItem>
        ))}
        {isLoadingMore?.current && <LoadingProjectGridItems />}
      </>
    )
  }

  return (
    <>
      <SimpleGrid w="full" columns={{ base: 1, lg: 3 }} spacing={{ base: 4, lg: 8 }}>
        {renderBody()}
      </SimpleGrid>
      {fetchNext && isLoadingMore && noMoreItems && (
        <ScrollInvoke
          elementId={!isMobile ? ID.root : undefined}
          onScrollEnd={fetchNext}
          isLoading={isLoadingMore}
          noMoreItems={noMoreItems}
        />
      )}
    </>
  )
}

const MonthlyLeaderboardProjectCard = ({
  projectRow,
  trendingAmountLabel,
  hideTrendingBelowUsd,
}: {
  projectRow: GlobalProjectLeaderboardRow
  trendingAmountLabel?: string
  hideTrendingBelowUsd?: number
}) => {
  const { t } = useTranslation()
  const { data, loading } = useFeaturedProjectForLandingPageQuery({
    variables: {
      where: {
        name: projectRow.projectName,
      },
    },
    skip: !projectRow.projectName,
  })

  const project = data?.projectGet

  if (loading || !project) {
    return <LandingCardBaseSkeleton />
  }

  return (
    <LandingProjectCard
      project={{
        ...project,
        contributionSummary: {
          contributionsTotal: projectRow.contributionsTotal,
          contributionsTotalUsd: projectRow.contributionsTotalUsd,
        },
      }}
      hideContributionContent={Boolean(
        hideTrendingBelowUsd && projectRow.contributionsTotalUsd <= hideTrendingBelowUsd,
      )}
      trendingAmountLabel={trendingAmountLabel ?? t('raised this month')}
    />
  )
}
