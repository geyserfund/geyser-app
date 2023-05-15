import { HStack, Skeleton, Stack, VStack } from '@chakra-ui/react'

import { LandingCardBaseSkeleton } from '../../../../components/layouts'
import { SortType, useFilterContext } from '../../../../context'
import {
  OrderByOptions,
  Project,
  ProjectStatus,
  Tag,
  useProjectsForLandingPageQuery,
} from '../../../../types'
import { ProjectDisplayBody } from '../elements'

interface ProjectDisplayProps {
  tag?: Tag
  seeAllText?: string
}

const NO_OF_PROJECT_TO_LOAD = 3

export const ProjectsDisplay = ({ tag, seeAllText }: ProjectDisplayProps) => {
  const { updateFilter } = useFilterContext()

  const { data, loading } = useProjectsForLandingPageQuery({
    variables: {
      input: {
        where: {
          tagIds: tag ? [tag.id] : undefined,
          status: ProjectStatus.Active,
        },
        pagination: { take: NO_OF_PROJECT_TO_LOAD },
        orderBy: [{ createdAt: OrderByOptions.Desc }],
      },
    },
  })

  const onSeeAllClick = () => {
    if (tag) {
      updateFilter({ tagIds: [tag.id] })
    } else {
      updateFilter({ recent: true, sort: SortType.createdAt })
    }
  }

  const projectList = (data?.projects.projects.slice(0, 3) as Project[]) || []

  if (loading) {
    return <ProjectsDisplaySkeleton />
  }

  if (projectList.length === 0) {
    return null
  }

  return (
    <ProjectDisplayBody
      title={tag?.label || 'Recent Projects'}
      subtitle={tag?.label ? 'Trending in' : ''}
      projects={projectList}
      onSeeAllClick={onSeeAllClick}
      seeAllText={seeAllText}
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
          return <LandingCardBaseSkeleton key={value} />
        })}
      </Stack>
    </VStack>
  )
}
