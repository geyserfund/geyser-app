import { useQuery } from '@apollo/client'
import { Stack } from '@chakra-ui/react'

import { FilterState } from '../../../hooks/state'
import {
  GetProjectsMostFundedOfTheWeekInput,
  ProjectsMostFundedOfTheWeekGet,
  Tag,
} from '../../../types'
import { QUERY_TRENDING_PROJECTS_FOR_LANDING_PAGE } from '../projects.graphql'
import { LandingProjectCard, ProjectRowLayout } from './components'

interface ProjectDisplayProps extends FilterState {
  tag?: Tag
}

const NO_OF_PROJECT_TO_LOAD = 3

export const ProjectsDisplay = ({ tag, updateFilter }: ProjectDisplayProps) => {
  const { data, loading } = useQuery<
    { projectsMostFundedOfTheWeekGet: ProjectsMostFundedOfTheWeekGet[] },
    { input: GetProjectsMostFundedOfTheWeekInput }
  >(QUERY_TRENDING_PROJECTS_FOR_LANDING_PAGE, {
    variables: {
      input: {
        tagIds: tag ? [tag.id] : [],
        take: NO_OF_PROJECT_TO_LOAD,
      },
    },
  })

  const onSeeAllClick = () => {
    if (tag) {
      updateFilter({ tagIds: [tag.id], sort: { recent: true } })
    } else {
      updateFilter({ recent: true, sort: { recent: true } })
    }
  }

  const projectList = data?.projectsMostFundedOfTheWeekGet

  if (loading || !projectList || projectList?.length === 0) {
    return null
  }

  return (
    <ProjectRowLayout
      title={tag?.label || 'Recent Projects'}
      subtitle={tag ? 'Trending in' : ''}
      width="100%"
      onSeeAllClick={onSeeAllClick}
    >
      <Stack
        width="100%"
        direction={{ base: 'column', xl: 'row' }}
        spacing="20px"
      >
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
