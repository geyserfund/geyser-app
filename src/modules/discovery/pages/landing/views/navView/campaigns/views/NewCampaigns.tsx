import { GridItem, SimpleGrid } from '@chakra-ui/react'

import {
  OrderByDirection,
  ProjectFundingStrategy,
  ProjectsGetWhereInput,
  ProjectsOrderByField,
  ProjectsOrderByInput,
  useProjectsForLandingPageQuery,
} from '@/types/index.ts'

import { LandingProjectCard } from '../../../../components/LandingProjectCard.tsx'
import { LoadingProjectGridItems } from '../../../../components/LoadingProjectGridItems.tsx'

// const NO_OF_PROJECT_TO_LOAD = 3

export const NewCampaigns = () => {
  const where = {
    fundingStrategy: ProjectFundingStrategy.AllOrNothing,
  } as ProjectsGetWhereInput

  const orderBy = [
    {
      direction: OrderByDirection.Desc,
      field: ProjectsOrderByField.LaunchedAt,
    },
  ] as ProjectsOrderByInput[]

  const { data, loading } = useProjectsForLandingPageQuery({
    variables: {
      input: {
        where,
        orderBy,
      },
    },
  })

  const projects = data?.projectsGet.projects || []

  const renderBody = () => {
    if (loading) {
      return <LoadingProjectGridItems length={3} />
    }

    return projects.map((project) => (
      <GridItem key={project.id}>
        <LandingProjectCard key={project.id} project={project} />
      </GridItem>
    ))
  }

  const projectLength = projects.length

  return (
    <SimpleGrid w="full" columns={{ base: 1, lg: projectLength > 5 ? 5 : projectLength }} spacing={{ base: 4, lg: 8 }}>
      {renderBody()}
    </SimpleGrid>
  )
}
