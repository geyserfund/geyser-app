import { GridItem, SimpleGrid } from '@chakra-ui/react'

import { NoDataError } from '@/components/errors'
import { LandingCardBaseSkeleton } from '@/shared/components/layouts'
import { ProjectForLandingPageFragment } from '@/types'

import { LandingProjectCard } from '../../../components/LandingProjectCard'
import { NoSearchResults } from '../components/NoSearchResults'

interface FilteredProjectListProps {
  projects: ProjectForLandingPageFragment[]
  error?: any
  loading?: boolean
}

export const FilteredProjectList = ({ projects, error, loading }: FilteredProjectListProps) => {
  const renderProjects = () => {
    if (loading) {
      return <FilteredProjectListSkeleton />
    }

    if (projects.length === 0) {
      return (
        <GridItem colSpan={{ base: 1, lg: 4 }} overflow="hidden">
          <NoSearchResults />
        </GridItem>
      )
    }

    return projects.map((project) => {
      return (
        <GridItem key={project.id}>
          <LandingProjectCard project={project} />
        </GridItem>
      )
    })
  }

  return (
    <>
      {error ? (
        <NoDataError />
      ) : (
        <SimpleGrid w="full" columns={{ base: 1, lg: 3, xl: 4 }} spacing={{ base: 4, lg: 8 }}>
          {renderProjects()}
        </SimpleGrid>
      )}
    </>
  )
}

export const FilteredProjectListSkeleton = () => {
  return (
    <>
      {[1, 2, 3, 4, 5, 6].map((value) => {
        return (
          <GridItem key={value} overflow="hidden">
            <LandingCardBaseSkeleton />
          </GridItem>
        )
      })}
    </>
  )
}
