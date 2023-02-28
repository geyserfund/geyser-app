import { useQuery } from '@apollo/client'
import {
  HStack,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
  VStack,
} from '@chakra-ui/react'

import { CardLayout } from '../../../../components/layouts'
import { useFilterContext } from '../../../../context'
import {
  OrderByOptions,
  Project,
  ProjectsGetQueryInput,
  ProjectsResponse,
  Tag,
} from '../../../../types'
import { QUERY_PROJECTS_FOR_LANDING_PAGE } from '../../projects.graphql'
import { ProjectDisplayBody } from '../elements'

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
          return (
            <CardLayout
              key={value}
              padding="0px"
              width={{ base: 'full', xl: '240px' }}
              direction={{ base: 'row', xl: 'column' }}
              spacing="0px"
            >
              <Skeleton
                width={{ base: '125px', xl: 'full' }}
                height={{ base: '125px', xl: '200px' }}
              ></Skeleton>
              <VStack
                flex={1}
                width={{ base: 'auto', xl: '100%' }}
                minWidth={{ base: '170px', md: 'auto' }}
                padding="10px"
                alignItems="start"
                justifyContent="center"
                overflow="hidden"
              >
                <Skeleton borderRadius="8px" width="100%" height="20px" />
                <HStack width="100%" overflow="hidden">
                  <SkeletonCircle size={'20px'} />
                  <SkeletonText flex="1" noOfLines={1} />
                </HStack>
                <Skeleton borderRadius="8px" width="100%" height="20px" />
                <Skeleton borderRadius="8px" width="100%" height="20px" />
              </VStack>
            </CardLayout>
          )
        })}
      </Stack>
    </VStack>
  )
}
