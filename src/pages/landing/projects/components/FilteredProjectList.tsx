import { GridItem, SimpleGrid, Text } from '@chakra-ui/react'

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
  return (
    <CardLayout w="full" spacing="30px" padding="20px">
      {!isMobile && <FilterTopBar />}
      {error ? (
        <Text> Could not find any results</Text>
      ) : (
        <SimpleGrid
          columns={{ base: 1, xl: 3 }}
          spacingX="20px"
          spacingY="20px"
        >
          {loading ? (
            <FilteredProjectListSkeleton />
          ) : (
            projects.map((project) => {
              return (
                <GridItem key={project.id} overflow="hidden">
                  <LandingProjectCard project={project} />
                </GridItem>
              )
            })
          )}
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
