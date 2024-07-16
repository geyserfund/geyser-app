import { useAtomValue, useSetAtom } from 'jotai'

import { entriesAtom, unpublishedEntriesAtom } from '../state/entriesAtom'
import { completedGoalsAtom, initialGoalsLoadAtom, inProgressGoalsAtom } from '../state/goalsAtom'
import {
  isProjectOwnerAtom,
  partialUpdateProjectAtom,
  projectAtom,
  projectLoadingAtom,
  projectOwnerAtom,
} from '../state/projectAtom'
import { rewardsAtom } from '../state/rewardsAtom'
import { walletAtom, walletLoadingAtom } from '../state/walletAtom'

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
  const initialGoalsLoad = useAtomValue(initialGoalsLoadAtom)

  return { inProgressGoals, completedGoals, initialGoalsLoad }
}

export const useRewardsAtom = () => {
  const rewards = useAtomValue(rewardsAtom)
  return { rewards }
}

export const useEntriesAtom = () => {
  const entries = useAtomValue(entriesAtom)
  const unpublishedEntries = useAtomValue(unpublishedEntriesAtom)

  return { entries, unpublishedEntries }
}
