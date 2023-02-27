import { NoDataError } from '../../../../components/errors'
import Loader from '../../../../components/ui/Loader'
import { useQueryWithPagination } from '../../../../hooks'
import { OrderByOptions, Project } from '../../../../types'
import { QUERY_PROJECTS_FOR_LANDING_PAGE } from '../../projects.graphql'
import { LeaderboardBody } from '../components'

export const LeaderboardAllTime = () => {
  const {
    isLoading,
    data: projects,
    error,
  } = useQueryWithPagination<Project>({
    itemLimit: 4,
    queryName: ['projects', 'projects'],
    query: QUERY_PROJECTS_FOR_LANDING_PAGE,
    orderBy: { createdAt: OrderByOptions.Desc },
  })

  if (error) {
    return <NoDataError />
  }

  if (isLoading) {
    return <Loader />
  }

  return <LeaderboardBody projects={projects} />
}
