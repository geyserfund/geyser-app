import { LazyQueryExecFunction } from '@apollo/client'
import { useSetAtom } from 'jotai'
import { useEffect } from 'react'

import {
  Exact,
  ProjectCompletedGoalsQuery,
  ProjectInProgressGoalsQuery,
  useProjectCompletedGoalsLazyQuery,
  useProjectInProgressGoalsLazyQuery,
} from '../../../../types'
import {
  completedGoalsAtom,
  completedGoalsLoadingAtom,
  inProgressGoalsAtom,
  inProgressGoalsLoadingAtom,
} from '../../state/goalsAtom'

type UseInitGoalsProps = {
  /** The id of the project */
  projectId: string | number | undefined
  /** If true, the query will not be executed */
  skip?: boolean
}

export type UseInitGoalsReturn = {
  /** Query in progress goals for the Project in context */
  queryInProgressGoals: LazyQueryExecFunction<
    ProjectInProgressGoalsQuery,
    Exact<{
      projectId: any
    }>
  >
  /** Query completed goals for the Project in context */
  queryCompletedGoals: LazyQueryExecFunction<
    ProjectCompletedGoalsQuery,
    Exact<{
      projectId: any
    }>
  >
}

/** Fetch project goals for project context */
export const useInitGoals = ({ projectId, skip }: UseInitGoalsProps): UseInitGoalsReturn => {
  const setInProgressGoals = useSetAtom(inProgressGoalsAtom)
  const setCompletedGoals = useSetAtom(completedGoalsAtom)
  const setInProgressGoalsLoading = useSetAtom(inProgressGoalsLoadingAtom)
  const setCompletedGoalsLoading = useSetAtom(completedGoalsLoadingAtom)

  const [queryInProgressGoals] = useProjectInProgressGoalsLazyQuery({
    fetchPolicy: 'network-only',
    variables: {
      projectId,
    },
    onError(error) {
      setInProgressGoalsLoading(false)
    },
    onCompleted(data) {
      setInProgressGoalsLoading(false)
      const inProgressGoals = data?.projectGoals.inProgress || []
      setInProgressGoals(inProgressGoals)
    },
  })

  const [queryCompletedGoals] = useProjectCompletedGoalsLazyQuery({
    fetchPolicy: 'cache-first',
    variables: {
      projectId,
    },
    onError(error) {
      setCompletedGoalsLoading(false)
    },
    onCompleted(data) {
      setCompletedGoalsLoading(false)
      const completedGoals = data?.projectGoals.completed || []
      setCompletedGoals(completedGoals)
    },
  })

  useEffect(() => {
    if (projectId && !skip) {
      queryInProgressGoals()
      queryCompletedGoals()
    }
  }, [projectId, skip, queryCompletedGoals, queryInProgressGoals])

  return {
    queryInProgressGoals,
    queryCompletedGoals,
  }
}
