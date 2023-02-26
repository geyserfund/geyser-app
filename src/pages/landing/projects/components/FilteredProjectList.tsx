import { GridItem, SimpleGrid, Text } from '@chakra-ui/react'

import { CardLayout } from '../../../../components/layouts'
import { Project } from '../../../../types'
import { useMobileMode } from '../../../../utils'
import { LandingProjectCard } from '../elements'
import { FilterTopBar } from './FilterTopBar'

interface FilteredProjectListProps {
  projects: Project[]
  error?: any
}

export const FilteredProjectList = ({
  projects,
  error,
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
          {projects.map((project) => {
            return (
              <GridItem key={project.id} overflow="hidden">
                <LandingProjectCard project={project} />
              </GridItem>
            )
          })}
        </SimpleGrid>
      )}
    </CardLayout>
  )
}
