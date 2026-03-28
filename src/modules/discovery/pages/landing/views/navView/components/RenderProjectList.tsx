import { GridItem, SimpleGrid } from '@chakra-ui/react'
import { MutableRefObject } from 'react'

import { ScrollInvoke } from '@/helpers/ScrollInvoke.tsx'
import { ID } from '@/shared/constants/components/id.ts'
import { ContributionsSummary, ProjectForLandingPageFragment } from '@/types/index.ts'
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
}: {
  projects: (ProjectForLandingPageFragment & {
    contributionSummary?: Pick<ContributionsSummary, 'contributionsTotalUsd' | 'contributionsTotal'>
  })[]
  loading?: boolean
  isLoadingMore?: MutableRefObject<boolean>
  noMoreItems?: MutableRefObject<boolean>
  fetchNext?: (count?: number) => Promise<void>
}) => {
  const isMobile = useMobileMode()

  const renderBody = () => {
    if (loading) {
      return <LoadingProjectGridItems />
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
