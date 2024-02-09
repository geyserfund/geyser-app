import { GridItem, SimpleGrid } from '@chakra-ui/react'

import { NoDataError } from '../../../../components/errors'
import { CardLayout, LandingCardBaseSkeleton } from '../../../../components/layouts'
import { ProjectForLandingPageFragment } from '../../../../types'
import { useMobileMode } from '../../../../utils'
import { LandingProjectCard, NoSearchResults } from '../../components'
import { FilterTopBar } from './FilterTopBar'

interface FilteredProjectListProps {
  projects: ProjectForLandingPageFragment[]
  error?: any
  loading?: boolean
}

export const FilteredProjectList = ({ projects, error, loading }: FilteredProjectListProps) => {
  const isMobile = useMobileMode()

  const renderProjects = () => {
    if (loading) {
      return <FilteredProjectListSkeleton />
    }

    if (projects.length === 0) {
      return (
        <GridItem colSpan={{ base: 1, xl: 3 }} overflow="hidden">
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
    <CardLayout noborder={isMobile} w="full" spacing="30px" padding={{ base: 0, lg: '20px' }}>
      {!isMobile && <FilterTopBar />}
      {error ? (
        <NoDataError />
      ) : (
        <SimpleGrid columns={{ base: 1, xl: 3 }} spacingX="20px" spacingY="20px">
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
            <LandingCardBaseSkeleton />
          </GridItem>
        )
      })}
    </>
  )
}
