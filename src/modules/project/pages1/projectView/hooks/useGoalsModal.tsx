import { useAtom } from 'jotai'

import { ProjectGoal } from '../../../../../types'
import { currentGoalAtom, isGoalDeleteModalOpenAtom, isGoalModalOpenAtom } from '../state/goalModalAtom'

/** Trigger goals modal from differnt places within Project Context */
export const useGoalsModal = () => {
  const [isGoalModalOpen, setIsGoalModalOpen] = useAtom(isGoalModalOpenAtom)
  const [isGoalDeleteModalOpen, setIsGoalDeleteModalOpen] = useAtom(isGoalDeleteModalOpenAtom)

  const [currentGoal, setCurrentGoal] = useAtom(currentGoalAtom)

  const onGoalModalOpen = (goal?: ProjectGoal) => {
    setCurrentGoal(goal || null)
    setIsGoalModalOpen(true)
  }

  const onGoalDeleteModalOpen = () => {
    setIsGoalModalOpen(false)
    setIsGoalDeleteModalOpen(true)
  }

  return {
    isGoalModalOpen,
    isGoalDeleteModalOpen,
    onGoalModalOpen,
    onGoalDeleteModalOpen,
    currentGoal,
    onGoalModalClose: () => setIsGoalModalOpen(false),
    onGoalDeleteModalClose: () => setIsGoalDeleteModalOpen(false),
  }
}
