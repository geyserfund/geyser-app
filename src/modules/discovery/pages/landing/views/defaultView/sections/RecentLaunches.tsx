import { Button } from '@chakra-ui/react'
import { t } from 'i18next'
import { Link } from 'react-router-dom'

import { Body } from '@/shared/components/typography/Body.tsx'
import { getPath } from '@/shared/constants/index.ts'

import {
  OrderByDirection,
  ProjectsOrderByField,
  ProjectStatus,
  useProjectsForLandingPageQuery,
} from '../../../../../../../types'
import { ProjectDisplayBody, ProjectDisplayBodySkeleton } from '../components/ProjectDisplayBody'

const NO_OF_PROJECT_TO_LOAD = 4

export const RecentLaunches = () => {
  const { loading, data } = useProjectsForLandingPageQuery({
    variables: {
      input: {
        orderBy: [
          {
            direction: OrderByDirection.Desc,
            field: ProjectsOrderByField.LaunchedAt,
          },
        ],
        where: {
          status: ProjectStatus.Active,
        },
        pagination: {
          take: NO_OF_PROJECT_TO_LOAD,
        },
      },
    },
  })

  if (loading) {
    return <ProjectDisplayBodySkeleton />
  }

  const projects = data?.projectsGet.projects || []

  return (
    <ProjectDisplayBody
      title={
        <Body size="xl">
          Recent{' '}
          <Body as="span" size="xl" bold>
            Launches
          </Body>
        </Body>
      }
      projects={projects}
      rightContent={
        <Button as={Link} to={getPath('discoveryLaunchpad')} variant="soft" colorScheme="neutral1">
          {t('See all')}
        </Button>
      }
    />
  )
}
