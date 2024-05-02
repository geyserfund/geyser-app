import { useEffect, useMemo, useState } from 'react'

import { ProjectMilestone } from '../../../../../types'
import { useProjectContext } from '../../../context'

export const useProjectMilestones = () => {
  const { project } = useProjectContext()
  const [currentMilestone, setCurrentMilestone] = useState<ProjectMilestone>()
  const [milestoneIndex, setMilestoneIndex] = useState<number>(0)
  const [prevMilestone, setPrevMilestone] = useState(0)

  const balance = useMemo(() => (project ? project.balance : 0), [project])

  useEffect(() => {
    if (!project || !project.milestones) return

    let selectedMilestone: ProjectMilestone | undefined
    let prevTotal = 0
    project.milestones.forEach((milestone, index) => {
      const hasNextMilestone = index + 1 < project.milestones.length
      if (!selectedMilestone && (milestone.amount >= project.balance || !hasNextMilestone)) {
        selectedMilestone = milestone
        setCurrentMilestone(milestone)
        setMilestoneIndex(index + 1)
      } else {
        prevTotal = milestone.amount
      }
    })
    setPrevMilestone(prevTotal)
  }, [project, balance])

  return {
    currentMilestone,
    milestoneIndex,
    prevMilestone,
    balance,
  }
}
