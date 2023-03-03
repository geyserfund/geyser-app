import { GridItem, SimpleGrid, Text } from '@chakra-ui/react'

import { NoDataError } from '../../../../components/errors'
import { CardLayout } from '../../../../components/layouts'
import { Project } from '../../../../types'
import { useMobileMode } from '../../../../utils'
import { LandingProjectCard, LandingProjectCardSkeleton } from '../elements'
import { FilterTopBar } from './FilterTopBar'

interface FilteredProjectListProps {
  projects: Project[]
  error?: any
  loading?: boolean
}

export const FilteredProjectList = ({
  projects,
  error,
  loading,
}: FilteredProjectListProps) => {
  const isMobile = useMobileMode()

  const renderProjects = () => {
    if (loading) {
      return <FilteredProjectListSkeleton />
    }

    if (projects.length === 0) {
      return <Text>No Match. Please update filters</Text>
    }

    return projects.map((project) => {
      return (
        <GridItem key={project.id} overflow="hidden">
          <LandingProjectCard project={project} />
        </GridItem>
      )
    })
  }

  return (
    <CardLayout w="full" spacing="30px" padding="20px">
      {!isMobile && <FilterTopBar />}
      {error ? (
        <NoDataError />
      ) : (
        <SimpleGrid
          columns={{ base: 1, xl: 3 }}
          spacingX="20px"
          spacingY="20px"
        >
          {renderProjects()}
        </SimpleGrid>
      )}
    </CardLayout>
  )
}

export const FilteredProjectListSkeleton = () => {
  return (
    <>
      {[1, 2, 3, 4, 5, 6].map((value) => {
        return (
          <GridItem key={value} overflow="hidden">
            <LandingProjectCardSkeleton />
          </GridItem>
        )
      })}
    </>
  )
}
