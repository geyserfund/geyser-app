import { useAtomValue, useSetAtom } from 'jotai'

import { entriesAtom, hasEntriesAtom, unpublishedEntriesAtom } from '../state/entriesAtom'
import { completedGoalsAtom, initialGoalsLoadAtom, inProgressGoalsAtom } from '../state/goalsAtom'
import {
  isProjectOwnerAtom,
  partialUpdateProjectAtom,
  projectAtom,
  projectLoadingAtom,
  projectOwnerAtom,
} from '../state/projectAtom'
import { activeRewardsAtom, hasRewardsAtom, hiddenRewardsAtom, rewardsAtom } from '../state/rewardsAtom'
import { walletAtom, walletConnectionDetailsAtom, walletLoadingAtom } from '../state/walletAtom'

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
  const walletConnectiondetails = useAtomValue(walletConnectionDetailsAtom)
  return { loading, wallet, walletConnectiondetails }
}

export const useGoalsAtom = () => {
  const inProgressGoals = useAtomValue(inProgressGoalsAtom)
  const completedGoals = useAtomValue(completedGoalsAtom)
  const initialGoalsLoad = useAtomValue(initialGoalsLoadAtom)

  return { inProgressGoals, completedGoals, initialGoalsLoad }
}

export const useRewardsAtom = () => {
  const rewards = useAtomValue(rewardsAtom)
  const activeRewards = useAtomValue(activeRewardsAtom)
  const hiddenRewards = useAtomValue(hiddenRewardsAtom)
  const hasRewards = useAtomValue(hasRewardsAtom)
  return { rewards, activeRewards, hiddenRewards, hasRewards }
}

export const useEntriesAtom = () => {
  const entries = useAtomValue(entriesAtom)
  const unpublishedEntries = useAtomValue(unpublishedEntriesAtom)
  const hasEntries = useAtomValue(hasEntriesAtom)

  return { entries, unpublishedEntries, hasEntries }
}
