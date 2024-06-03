import { useMutation, useQuery } from '@apollo/client'
import { useState } from 'react'

import { MUTATION_UPDATE_PROJECT_GOAL_ORDERING } from '../../../../../graphql/mutations/project'
import { QUERY_PROJECT_GOALS } from '../../../../../graphql/queries/goals'
import { useModal } from '../../../../../hooks'
import { ProjectGoal, ProjectGoals } from '../../../../../types'

type ResponseData = {
  projectGoals: ProjectGoals
}

export const useProjectGoals = (projectId: string | number | undefined) => {
  const goalsModal = useModal()
  const goalDeleteModal = useModal()

  const [currentGoal, setCurrentGoal] = useState<ProjectGoal | null>(null)

  const onGoalsModalOpen = (goal?: ProjectGoal) => {
    setCurrentGoal(goal || null)
    goalsModal.onOpen()
  }

  const onGoalDeleteModalOpen = () => {
    goalsModal.onClose()
    goalDeleteModal.onOpen()
  }

  const [inProgressGoals, setInProgressGoals] = useState<ProjectGoal[]>()
  const [completedGoals, setCompletedGoals] = useState<ProjectGoal[]>()
  const [hasGoals, setHasGoals] = useState(false)

  const { refetch } = useQuery<ResponseData>(QUERY_PROJECT_GOALS, {
    variables: { projectId },
    skip: !projectId,
    notifyOnNetworkStatusChange: true,
    onCompleted(data) {
      const projectGoals = data?.projectGoals

      setInProgressGoals(projectGoals.inProgress || [])
      setCompletedGoals(projectGoals.completed || [])

      if (
        (projectGoals.inProgress && projectGoals.inProgress.length > 0) ||
        (projectGoals.completed && projectGoals.completed.length > 0)
      ) {
        setHasGoals(true)
      }
    },
  })

  const [updateProjectGoalOrdering] = useMutation(MUTATION_UPDATE_PROJECT_GOAL_ORDERING, {
    onCompleted() {
      refetch()
    },
  })

  const handleUpdateProjectGoalOrdering = (projectGoalIdsOrder: number[], projectId: string) => {
    updateProjectGoalOrdering({
      variables: { input: { projectId, projectGoalIdsOrder } },
    })
  }

  return {
    hasGoals,
    inProgressGoals,
    completedGoals,
    refetch,
    onGoalsModalOpen,
    onGoalDeleteModalOpen,
    goalsModal,
    goalDeleteModal,
    currentGoal,
    handleUpdateProjectGoalOrdering,
  }
}
