import { NoDataError } from '../../../../components/errors'
import Loader from '../../../../components/ui/Loader'
import { useMostFundedOfTheWeekProjectsState } from '../../../../hooks/graphqlState'
import { LeaderboardBody } from '../components'

export const LeaderboardThisWeek = () => {
  const { loading, projects, error } = useMostFundedOfTheWeekProjectsState({
    take: 4,
  })

  if (error) {
    return <NoDataError />
  }

  if (loading) {
    return <Loader />
  }

  return <LeaderboardBody projects={projects} />
}
