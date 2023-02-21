import { useQuery } from '@apollo/client'
import { HStack } from '@chakra-ui/react'

import {
  GetProjectsMostFundedOfTheWeekInput,
  ProjectsMostFundedOfTheWeekGet,
} from '../../../types'
import { QUERY_PROJECT_FOR_LANDING_PAGE } from '../projects.graphql'
import { LandingProjectCard } from './components'

interface ProjectDisplayProps {
  tagId?: number
}

const NO_OF_PROJECT_TO_LOAD = 3

export const ProjectDisplay = ({ tagId }: ProjectDisplayProps) => {
  const { data, loading } = useQuery<
    { projectsMostFundedOfTheWeekGet: ProjectsMostFundedOfTheWeekGet[] },
    GetProjectsMostFundedOfTheWeekInput
  >(QUERY_PROJECT_FOR_LANDING_PAGE, {
    variables: {
      tagIds: tagId ? [tagId] : [],
      take: NO_OF_PROJECT_TO_LOAD,
    },
  })

  const projectList = data?.projectsMostFundedOfTheWeekGet

  return (
    <HStack>
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
    </HStack>
  )
}
