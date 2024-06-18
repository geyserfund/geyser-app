import { ApolloQueryResult } from '@apollo/client'
import { useSetAtom } from 'jotai'

import {
  Exact,
  ProjectCompletedGoalsQuery,
  ProjectInProgressGoalsQuery,
  useProjectCompletedGoalsQuery,
} from '../../../../types'
import { useProjectInProgressGoalsQuery } from '../../../../types'
import { completedGoalsAtom, inProgressGoalsAtom } from '../../state/goalsAtom'

type UseInitGoalsProps = {
  /** The id of the project */
  projectId: string | number | undefined
  /** If true, the query will not be executed */
  skip?: boolean
}

export type UseInitGoalsReturn = {
  /** Refetch in progress goals for the Project in context */
  refetchInProgressGoals: (
    variables?:
      | Partial<
          Exact<{
            projectId: any
          }>
        >
      | undefined,
  ) => Promise<ApolloQueryResult<ProjectInProgressGoalsQuery>>
  /** Refetch completed goals for the Project in context */
  refetchCompletedGoals: (
    variables?:
      | Partial<
          Exact<{
            projectId: any
          }>
        >
      | undefined,
  ) => Promise<ApolloQueryResult<ProjectCompletedGoalsQuery>>
}

/** Fetch project goals for project context */
export const useInitGoals = ({ projectId, skip }: UseInitGoalsProps): UseInitGoalsReturn => {
  const setInProgressGoals = useSetAtom(inProgressGoalsAtom)
  const setCompletedGoals = useSetAtom(completedGoalsAtom)

  const { refetch: refetchInProgressGoals } = useProjectInProgressGoalsQuery({
    fetchPolicy: 'network-only',
    skip: !projectId || skip,
    notifyOnNetworkStatusChange: true,
    variables: {
      projectId,
    },
    onCompleted(data) {
      const inProgressGoals = data?.projectGoals.inProgress || []
      setInProgressGoals(inProgressGoals)
    },
  })

  const { refetch: refetchCompletedGoals } = useProjectCompletedGoalsQuery({
    fetchPolicy: 'cache-first',
    skip: !projectId || skip,
    notifyOnNetworkStatusChange: true,
    variables: {
      projectId,
    },
    onCompleted(data) {
      const completedGoals = data?.projectGoals.completed || []
      setCompletedGoals(completedGoals)
    },
  })

  return {
    refetchInProgressGoals,
    refetchCompletedGoals,
  }
}
