import { GridItem, SimpleGrid } from '@chakra-ui/react'
import { MutableRefObject, ReactNode } from 'react'
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
  projectFilter,
  trendingAmountLabel,
  emptyState,
}: {
  projects: (ProjectForLandingPageFragment & {
    contributionSummary?: Pick<ContributionsSummary, 'contributionsTotalUsd' | 'contributionsTotal'>
  })[]
  loading?: boolean
  isLoadingMore?: MutableRefObject<boolean>
  noMoreItems?: MutableRefObject<boolean>
  fetchNext?: (count?: number) => Promise<void>
  projectRows?: GlobalProjectLeaderboardRow[]
  projectFilter?: (project: ProjectForLandingPageFragment) => boolean
  trendingAmountLabel?: string
  emptyState?: ReactNode
}) => {
  const isMobile = useMobileMode()
  const visibleProjects = projectFilter ? projects.filter(projectFilter) : projects
  const hasLoadedAllItems = noMoreItems?.current ?? true
  const hasNoResults =
    !loading && !isLoadingMore?.current && hasLoadedAllItems && !visibleProjects.length && !projectRows?.length

  if (hasNoResults && emptyState) {
    return <>{emptyState}</>
  }

  const renderBody = () => {
    if (loading) {
      return <LoadingProjectGridItems />
    }

    if (projectRows) {
      return projectRows.map((projectRow) => (
        <MonthlyLeaderboardProjectCard
          key={projectRow.projectName}
          projectRow={projectRow}
          projectFilter={projectFilter}
          trendingAmountLabel={trendingAmountLabel}
        />
      ))
    }

    return (
      <>
        {visibleProjects.map((project) => (
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
  projectFilter,
  trendingAmountLabel,
}: {
  projectRow: GlobalProjectLeaderboardRow
  projectFilter?: (project: ProjectForLandingPageFragment) => boolean
  trendingAmountLabel?: string
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
    return (
      <GridItem>
        <LandingCardBaseSkeleton />
      </GridItem>
    )
  }

  if (projectFilter && !projectFilter(project)) {
    return null
  }

  return (
    <GridItem>
      <LandingProjectCard
        project={{
          ...project,
          contributionSummary: {
            contributionsTotal: projectRow.contributionsTotal,
            contributionsTotalUsd: projectRow.contributionsTotalUsd,
          },
        }}
        trendingAmountLabel={trendingAmountLabel ?? t('raised this month')}
      />
    </GridItem>
  )
}
