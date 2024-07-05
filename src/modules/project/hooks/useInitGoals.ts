import { LazyQueryExecFunction } from '@apollo/client'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { useEffect } from 'react'

import {
  Exact,
  ProjectCompletedGoalsQuery,
  ProjectInProgressGoalsQuery,
  useProjectCompletedGoalsLazyQuery,
  useProjectInProgressGoalsLazyQuery,
} from '@/types'

import { completedGoalsAtom, initialGoalsLoadAtom, inProgressGoalsAtom } from '../state/goalsAtom'
import { projectAtom } from '../state/projectAtom'

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
  /** If the in Progress goals query is loading */
  inProgressGoalsLoading: boolean
  /** If the completed goals query is loading */
  completedGoalsLoading: boolean
}

/** Fetch project goals for project context, pass true to fetch on render */
export const useInitGoals = (load?: boolean): UseInitGoalsReturn => {
  const setInProgressGoals = useSetAtom(inProgressGoalsAtom)
  const setCompletedGoals = useSetAtom(completedGoalsAtom)
  const [initialGoalsLoad, setInitialGoalsLoad] = useAtom(initialGoalsLoadAtom)

  const { id: projectId } = useAtomValue(projectAtom)

  const [queryInProgressGoals, { loading: inProgressGoalsLoading }] = useProjectInProgressGoalsLazyQuery({
    fetchPolicy: 'network-only',
    variables: {
      projectId,
    },
    onCompleted(data) {
      const inProgressGoals = data?.projectGoals.inProgress || []
      setInProgressGoals(inProgressGoals)
      setInitialGoalsLoad(true)
    },
  })

  const [queryCompletedGoals, { loading: completedGoalsLoading }] = useProjectCompletedGoalsLazyQuery({
    fetchPolicy: 'cache-first',
    variables: {
      projectId,
    },
    onCompleted(data) {
      const completedGoals = data?.projectGoals.completed || []
      setCompletedGoals(completedGoals)
    },
  })

  useEffect(() => {
    if (projectId && load && !initialGoalsLoad) {
      queryInProgressGoals()
      queryCompletedGoals()
    }
  }, [projectId, load, queryCompletedGoals, initialGoalsLoad, queryInProgressGoals])

  return {
    queryInProgressGoals,
    queryCompletedGoals,
    inProgressGoalsLoading,
    completedGoalsLoading,
  }
}
