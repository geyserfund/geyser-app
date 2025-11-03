import { GridItem, SimpleGrid } from '@chakra-ui/react'
import { MutableRefObject } from 'react'

import { ScrollInvoke } from '@/helpers/ScrollInvoke.tsx'
import { ID } from '@/shared/constants/components/id.ts'
import { ProjectForLandingPageFragment } from '@/types/index.ts'

import { LandingProjectCard } from '../../../components/LandingProjectCard.tsx'
import { LoadingProjectGridItems } from '../../../components/LoadingProjectGridItems.tsx'

export const RenderProjectList = ({
  projects,
  loading,
  isLoadingMore,
  noMoreItems,
  fetchNext,
}: {
  projects: ProjectForLandingPageFragment[]
  loading?: boolean
  isLoadingMore?: MutableRefObject<boolean>
  noMoreItems?: MutableRefObject<boolean>
  fetchNext?: (count?: number) => Promise<void>
}) => {
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
      <SimpleGrid w="full" columns={{ base: 1, lg: 6 }} spacing={{ base: 4, lg: 8 }}>
        {renderBody()}
      </SimpleGrid>
      {fetchNext && isLoadingMore && noMoreItems && (
        <ScrollInvoke elementId={ID.root} onScrollEnd={fetchNext} isLoading={isLoadingMore} noMoreItems={noMoreItems} />
      )}
    </>
  )
}
