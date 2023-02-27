import { StackProps } from '@chakra-ui/react'

import { NoDataError } from '../../../../components/errors'
import Loader from '../../../../components/ui/Loader'
import { useMostFundedOfTheWeekProjectsState } from '../../../../hooks/graphqlState'
import { LeaderboardBody } from '../components'

interface LeaderboardThisWeekProps extends StackProps {
  items?: number
}

export const LeaderboardThisWeek = ({
  items = 4,
  ...rest
}: LeaderboardThisWeekProps) => {
  const { loading, projects, error } = useMostFundedOfTheWeekProjectsState({
    take: items,
  })

  if (error) {
    return <NoDataError />
  }

  if (loading) {
    return <Loader />
  }

  return <LeaderboardBody projects={projects} {...rest} />
}
