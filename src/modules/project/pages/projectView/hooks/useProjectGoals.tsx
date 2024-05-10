import { useEffect, useMemo, useState } from 'react'

import { ProjectGoal, ProjectGoalCurrency, ProjectGoals, ProjectGoalStatus } from '../../../../../types'
import { useProjectContext } from '../../../context'

const dummyGoals = {
  inProgress: [
    {
      projectId: 1,
      status: ProjectGoalStatus.InProgress,
      targetAmount: 5000,
      title: 'Expand Production Line',
      updatedAt: '2023-09-15T12:34:56Z',
      id: 101,
      hasReceivedContributions: true,
      description: 'Increase production capacity by 20%',
      currency: ProjectGoalCurrency.Btcsat,
      createdAt: '2023-01-01T00:00:00Z',
      amountContributed: 3000,
    },
    {
      projectId: 1,
      status: ProjectGoalStatus.InProgress,
      targetAmount: 2000,
      title: 'Marketing Campaign',
      updatedAt: '2023-09-10T12:34:56Z',
      id: 102,
      hasReceivedContributions: true,
      description: 'Launch a new marketing campaign for the new product line',
      currency: ProjectGoalCurrency.Usdcent,
      createdAt: '2023-02-01T00:00:00Z',
      amountContributed: 1500,
    },
  ] as ProjectGoal[],
  completed: [
    {
      projectId: 1,
      status: ProjectGoalStatus.Completed,
      targetAmount: 1000,
      title: 'Research and Development',
      updatedAt: '2023-08-01T12:34:56Z',
      id: 103,
      hasReceivedContributions: true,
      description: 'Develop a new eco-friendly product',
      currency: ProjectGoalCurrency.Usdcent,
      createdAt: '2023-01-20T00:00:00Z',
      amountContributed: 1000,
    },
  ] as ProjectGoal[],
}

const dummyProject = {
  goals: dummyGoals as ProjectGoals,
  defaultGoalId: 101,
  balance: 120000,
}

export const useProjectGoals = () => {
  // const { project } = useProjectContext()

  const project = dummyProject
  const [priorityGoal, setPriorityGoal] = useState<ProjectGoal>()

  useEffect(() => {
    if (!project || !project.goals) return

    // Find the goal that matches the defaultGoalId
    const goalToDisplay = Object.values(project.goals.inProgress)
      .flat()
      .find((goal) => goal.id === project.defaultGoalId)

    // Set the found goal as the priorityGoal
    setPriorityGoal(goalToDisplay as ProjectGoal)
  }, [project])

  return {
    priorityGoal,
  }
}
