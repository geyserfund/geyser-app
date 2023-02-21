import { useQuery } from '@apollo/client'
import { HStack, Stack } from '@chakra-ui/react'

import {
  GetProjectsMostFundedOfTheWeekInput,
  ProjectsMostFundedOfTheWeekGet,
  Tag,
} from '../../../types'
import { QUERY_PROJECT_FOR_LANDING_PAGE } from '../projects.graphql'
import { LandingProjectCard, ProjectRowLayout } from './components'

interface ProjectDisplayProps {
  tag?: Tag
}

const NO_OF_PROJECT_TO_LOAD = 3

export const ProjectsDisplay = ({ tag }: ProjectDisplayProps) => {
  const { data, loading } = useQuery<
    { projectsMostFundedOfTheWeekGet: ProjectsMostFundedOfTheWeekGet[] },
    { input: GetProjectsMostFundedOfTheWeekInput }
  >(QUERY_PROJECT_FOR_LANDING_PAGE, {
    variables: {
      input: {
        tagIds: tag ? [tag.id] : [],
        take: NO_OF_PROJECT_TO_LOAD,
      },
    },
  })

  const projectList = data?.projectsMostFundedOfTheWeekGet

  if (loading || !projectList || projectList?.length === 0) {
    return null
  }

  return (
    <ProjectRowLayout
      title={tag?.label || 'Recent Projects'}
      subtitle={tag ? 'trending in' : ''}
    >
      <Stack direction={{ base: 'column', md: 'row' }} spacing="20px">
        {projectList &&
          projectList.length > 0 &&
          projectList.map((value) => {
            return (
              <LandingProjectCard
                key={value.project.id}
                project={value.project}
              />
            )
          })}
      </Stack>
    </ProjectRowLayout>
  )
}
