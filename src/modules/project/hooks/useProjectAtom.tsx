import { use } from 'i18next'
import { useAtomValue, useSetAtom } from 'jotai'

import { entriesAtom, entriesLoadingAtom, hasEntriesAtom, unpublishedEntriesAtom } from '../state/entriesAtom'
import {
  completedGoalsAtom,
  completedGoalsLoadingAtom,
  hasGoalsAtom,
  inProgressGoalsAtom,
  inProgressGoalsLoadingAtom,
} from '../state/goalsAtom'
import {
  isProjectOwnerAtom,
  partialUpdateProjectAtom,
  projectAtom,
  projectLoadingAtom,
  projectOwnerAtom,
} from '../state/projectAtom'
import { hasRewardsAtom, rewardsAtom } from '../state/rewardsAtom'
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
  const inProgressGoalsLoading = useAtomValue(inProgressGoalsLoadingAtom)
  const completedGoalsLoading = useAtomValue(completedGoalsLoadingAtom)

  const hasGoals = useAtomValue(hasGoalsAtom)
  const goalsLoading = inProgressGoalsLoading || completedGoalsLoading

  return { inProgressGoals, completedGoals, hasGoals, goalsLoading }
}

export const useRewardsAtom = () => {
  const hasRewards = useAtomValue(hasRewardsAtom)
  const rewards = useAtomValue(rewardsAtom)
  return { hasRewards, rewards }
}

export const useEntriesAtom = () => {
  const entries = useAtomValue(entriesAtom)
  const unpublishedEntries = useAtomValue(unpublishedEntriesAtom)
  const hasEntries = useAtomValue(hasEntriesAtom)
  const entriesLoading = useAtomValue(entriesLoadingAtom)
  return { entries, unpublishedEntries, hasEntries, entriesLoading }
}
