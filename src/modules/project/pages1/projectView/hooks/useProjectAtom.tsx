import { useAtomValue, useSetAtom } from 'jotai'

import { completedGoalsAtom, hasGoalsAtom, inProgressGoalsAtom } from '../../../state/goalsAtom'
import {
  isProjectOwnerAtom,
  partialUpdateProjectAtom,
  projectAtom,
  projectLoadingAtom,
  projectOwnerAtom,
} from '../../../state/projectAtom'
import { hasRewardsAtom, rewardsAtom } from '../../../state/rewardsAtom'
import { walletAtom, walletLoadingAtom } from '../../../state/walletAtom'

export const useProjectAtom = () => {
  const loading = useAtomValue(projectLoadingAtom)
  const project = useAtomValue(projectAtom)
  const partialUpdateProject = useSetAtom(partialUpdateProjectAtom)
  const isProjectOwner = useAtomValue(isProjectOwnerAtom)
  const projectOwner = useAtomValue(projectOwnerAtom)

  return { loading, project, isProjectOwner, projectOwner, partialUpdateProject }
}

export const useWalletAtom = () => {
  const loading = useAtomValue(walletLoadingAtom)
  const wallet = useAtomValue(walletAtom)
  return { loading, wallet }
}

export const useGoalsAtom = () => {
  const inProgressGoals = useAtomValue(inProgressGoalsAtom)
  const completedGoals = useAtomValue(completedGoalsAtom)
  const hasGoals = useAtomValue(hasGoalsAtom)
  return { inProgressGoals, completedGoals, hasGoals }
}

export const useRewardsAtom = () => {
  const hasRewards = useAtomValue(hasRewardsAtom)
  const rewards = useAtomValue(rewardsAtom)
  return { hasRewards, rewards }
}
