import { StackProps } from '@chakra-ui/react'

import { NoDataError } from '../../../../components/errors'
import Loader from '../../../../components/ui/Loader'
import { useQueryWithPagination } from '../../../../hooks'
import { OrderByOptions, Project } from '../../../../types'
import { QUERY_PROJECTS_FOR_LANDING_PAGE } from '../../projects.graphql'
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
    queryName: ['projects', 'projects'],
    query: QUERY_PROJECTS_FOR_LANDING_PAGE,
    orderBy: { balance: OrderByOptions.Desc },
  })

  if (error) {
    return <NoDataError />
  }

  if (isLoading) {
    return <Loader />
  }

  return <LeaderboardBody projects={projects} {...rest} />
}
