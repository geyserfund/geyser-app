import { useAtom, useSetAtom } from 'jotai'
import { useEffect } from 'react'

import {
  useProjectCompletedGoalsLazyQuery,
  useProjectGoalCreateMutation,
  useProjectGoalDeleteMutation,
  useProjectGoalUpdateMutation,
  useProjectInProgressGoalsLazyQuery,
} from '@/types'

import { useProjectAtom } from '../hooks/useProjectAtom'
import {
  addUpdateInProgressGoalsAtom,
  completedGoalsAtom,
  initialGoalsLoadAtom,
  inProgressGoalsAtom,
  removeGoalsAtom,
} from '../state/goalsAtom'
import { updateProjectItemCountsAtom } from '../state/projectAtom'
import { updateProjectBodyCache } from './cache/projectBodyCache'
import { useCustomMutation } from './custom/useCustomMutation'

/**
 * Query, Create, Update, Delete project gaols for current Project context
 * @param load - Load goals on mount
 */
export const useProjectGoalsAPI = (load?: boolean) => {
  const setInProgressGoals = useSetAtom(inProgressGoalsAtom)
  const setCompletedGoals = useSetAtom(completedGoalsAtom)

  const removeInprogressGoals = useSetAtom(removeGoalsAtom)
  const addUpdateInProgressGoals = useSetAtom(addUpdateInProgressGoalsAtom)

  const updateProjectItemCounts = useSetAtom(updateProjectItemCountsAtom)

  const [initialGoalsLoad, setInitialGoalsLoad] = useAtom(initialGoalsLoadAtom)

  const { project, loading } = useProjectAtom()

  const [queryInProgressGoals, queryInProgressGoalsOptions] = useProjectInProgressGoalsLazyQuery({
    fetchPolicy: 'network-only',
    variables: {
      projectId: project.id,
    },
    onCompleted(data) {
      const inProgressGoals = data?.projectGoals.inProgress || []
      setInProgressGoals(inProgressGoals)
      setInitialGoalsLoad(true)
    },
  })

  const [queryCompletedGoals, queryCompletedGoalsOptions] = useProjectCompletedGoalsLazyQuery({
    fetchPolicy: 'cache-first',
    variables: {
      projectId: project.id,
    },
    onCompleted(data) {
      const completedGoals = data?.projectGoals.completed || []
      setCompletedGoals(completedGoals)
    },
  })

  const [createProjectGoal, createProjectGoalOptions] = useCustomMutation(useProjectGoalCreateMutation, {
    onCompleted(data) {
      setInProgressGoals(data.projectGoalCreate)
      updateProjectItemCounts({ addGoal: true })
    },
    update(cache, { data }) {
      if (data?.projectGoalCreate) {
        updateProjectBodyCache(cache, {
          projectName: project.name,
          addGoal: true,
        })
      }
    },
  })

  const [updateProjectGoal, updateProjectGoalOptions] = useCustomMutation(useProjectGoalUpdateMutation, {
    onCompleted(data) {
      addUpdateInProgressGoals(data.projectGoalUpdate)
    },
  })

  const [deleteProjectGoal, deleteProjectGoalOptions] = useCustomMutation(useProjectGoalDeleteMutation, {
    onCompleted(_, clientOptions) {
      if (clientOptions?.variables?.projectGoalId) {
        removeInprogressGoals(clientOptions?.variables?.projectGoalId)
        updateProjectItemCounts({ removeGoal: true })
      }
    },
    update(cache, { data }) {
      if (data?.projectGoalDelete) {
        updateProjectBodyCache(cache, {
          projectName: project.name,
          removeGoal: true,
        })
      }
    },
  })

  useEffect(() => {
    if (project.id && !loading && load && !initialGoalsLoad) {
      queryInProgressGoals()
      queryCompletedGoals()
    }
  }, [project.id, loading, load, queryCompletedGoals, initialGoalsLoad, queryInProgressGoals])

  return {
    queryInProgressGoals: {
      execute: queryInProgressGoals,
      ...queryInProgressGoalsOptions,
    },
    queryCompletedGoals: {
      execute: queryCompletedGoals,
      ...queryCompletedGoalsOptions,
    },
    createProjectGoal: {
      execute: createProjectGoal,
      ...createProjectGoalOptions,
    },
    updateProjectGoal: {
      execute: updateProjectGoal,
      ...updateProjectGoalOptions,
    },
    deleteProjectGoal: {
      execute: deleteProjectGoal,
      ...deleteProjectGoalOptions,
    },
  }
}
