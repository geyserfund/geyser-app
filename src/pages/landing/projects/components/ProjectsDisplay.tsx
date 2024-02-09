import { HStack, Skeleton, Stack, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { LandingCardBaseSkeleton } from '../../../../components/layouts'
import { SortType, useFilterContext } from '../../../../context'
import {
  OrderByDirection,
  Project,
  ProjectsOrderByField,
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
  const { t } = useTranslation()
  const { updateFilter } = useFilterContext()

  const { data, loading } = useProjectsForLandingPageQuery({
    variables: {
      input: {
        where: {
          tagIds: tag ? [tag.id] : undefined,
          status: ProjectStatus.Active,
        },
        pagination: { take: NO_OF_PROJECT_TO_LOAD },
        orderBy: [
          {
            direction: OrderByDirection.Desc,
            field: ProjectsOrderByField.Balance,
          },
        ],
      },
    },
  })

  const onSeeAllClick = () => {
    if (tag) {
      updateFilter({ tagIds: [tag.id] })
    } else {
      updateFilter({ recent: true, sort: SortType.balance })
    }
  }

  const projectList = (data?.projectsGet.projects.slice(0, 3) as Project[]) || []

  if (loading) {
    return <ProjectsDisplaySkeleton />
  }

  if (projectList.length === 0) {
    return null
  }

  return (
    <ProjectDisplayBody
      title={tag?.label || t('Recent Projects')}
      subtitle={tag?.label ? t('Trending in') : ''}
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
      <Stack width="100%" direction={{ base: 'column', xl: 'row' }} spacing="20px">
        {[1, 2, 3].map((value) => {
          return <LandingCardBaseSkeleton key={value} />
        })}
      </Stack>
    </VStack>
  )
}
