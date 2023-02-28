import { useQuery } from '@apollo/client'
import { HStack, Skeleton, Stack, VStack } from '@chakra-ui/react'

import { useFilterContext } from '../../../../context'
import {
  OrderByOptions,
  Project,
  ProjectsGetQueryInput,
  ProjectsResponse,
  Tag,
} from '../../../../types'
import { QUERY_PROJECTS_FOR_LANDING_PAGE } from '../../projects.graphql'
import { LandingProjectCardSkeleton, ProjectDisplayBody } from '../elements'

interface ProjectDisplayProps {
  tag?: Tag
}

const NO_OF_PROJECT_TO_LOAD = 3

export const ProjectsDisplay = ({ tag }: ProjectDisplayProps) => {
  const { updateFilter, updateSort } = useFilterContext()

  const { data, loading } = useQuery<
    { projects: ProjectsResponse },
    { input: ProjectsGetQueryInput }
  >(QUERY_PROJECTS_FOR_LANDING_PAGE, {
    variables: {
      input: {
        where: {
          tagIds: tag ? [tag.id] : [],
        },
        pagination: { take: NO_OF_PROJECT_TO_LOAD },
      },
    },
  })

  const onSeeAllClick = () => {
    if (tag) {
      updateFilter({ tagIds: [tag.id] })
      updateSort({ createdAt: OrderByOptions.Desc })
    } else {
      updateFilter({ recent: true })
      updateSort({ createdAt: OrderByOptions.Desc })
    }
  }

  const projectList = (data?.projects.projects.slice(0, 3) as Project[]) || []

  if (loading) {
    return <ProjectsDisplaySkeleton />
  }

  return (
    <ProjectDisplayBody
      title={tag?.label || 'Recent Projects'}
      subtitle={tag?.label ? 'Trending in' : ''}
      projects={projectList}
      onSeeAllClick={onSeeAllClick}
    />
  )
}

export const ProjectsDisplaySkeleton = () => {
  return (
    <VStack>
      <HStack w="100%" justifyContent="space-between">
        <Skeleton borderRadius="8px" height="20px" width="30%" />
        <Skeleton borderRadius="8px" height="20px" width="40px" />
      </HStack>
      <Stack
        width="100%"
        direction={{ base: 'column', xl: 'row' }}
        spacing="20px"
      >
        {[1, 2, 3].map((value) => {
          return <LandingProjectCardSkeleton key={value} />
        })}
      </Stack>
    </VStack>
  )
}
