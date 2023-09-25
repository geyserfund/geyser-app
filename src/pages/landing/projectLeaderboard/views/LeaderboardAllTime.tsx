import { StackProps } from '@chakra-ui/react'

import { NoDataError } from '../../../../components/errors'
import Loader from '../../../../components/ui/Loader'
import { QUERY_PROJECTS_FOR_LANDING_PAGE } from '../../../../graphql'
import { useQueryWithPagination } from '../../../../hooks'
import { OrderByOptions, Project, ProjectStatus } from '../../../../types'
import { LeaderboardBody } from '../components'
interface LeaderboardAllTimeProps extends StackProps {
  items?: number
}

export const LeaderboardAllTime = ({
  items = 4,
  ...rest
}: LeaderboardAllTimeProps) => {
  const {
    isLoading,
    data: projects,
    error,
  } = useQueryWithPagination<Project>({
    itemLimit: items,
    queryName: ['projectsGet', 'projects'],
    query: QUERY_PROJECTS_FOR_LANDING_PAGE,
    orderBy: {
      direction: OrderByOptions.Desc,
      field: 'balance',
    },
    where: {
      status: ProjectStatus.Active,
    },
  })

  if (error) {
    return <NoDataError />
  }

  if (isLoading) {
    return <Loader />
  }

  return <LeaderboardBody projects={projects} {...rest} />
}
