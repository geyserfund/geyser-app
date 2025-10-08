import { t } from 'i18next'

import {
  OrderByDirection,
  ProjectsOrderByField,
  ProjectStatus,
  useProjectsForLandingPageQuery,
} from '../../../../../../../types'
import { ProjectDisplayBody, ProjectDisplayBodySkeleton } from '../components/ProjectDisplayBody'

const NO_OF_PROJECT_TO_LOAD = 5

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

  return <ProjectDisplayBody title={t('Recent Launches')} projects={projects} />
}
