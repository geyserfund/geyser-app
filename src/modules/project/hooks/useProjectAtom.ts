import { useAtomValue, useSetAtom } from 'jotai'

import { entriesAtom, hasEntriesAtom, unpublishedEntriesAtom } from '../state/entriesAtom'
import { completedGoalsAtom, goalsLoadingAtom, initialGoalsLoadAtom, inProgressGoalsAtom } from '../state/goalsAtom'
import { hasPostsAtom, postsAtom, unpublishedPostsAtom } from '../state/postsAtom'
import {
  isProjectOwnerAtom,
  partialUpdateProjectAtom,
  projectAtom,
  projectLoadingAtom,
  projectOwnerAtom,
} from '../state/projectAtom'
import { activeRewardsAtom, hasRewardsAtom, hiddenRewardsAtom, rewardsAtom } from '../state/rewardsAtom'
import { hasSubscriptionsAtom, subscriptionsAtom } from '../state/subscriptionAtom'
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
  const walletConnectionDetails = useAtomValue(walletConnectionDetailsAtom)
  return { loading, wallet, walletConnectionDetails }
}

export const useGoalsAtom = () => {
  const inProgressGoals = useAtomValue(inProgressGoalsAtom)
  const completedGoals = useAtomValue(completedGoalsAtom)
  const initialGoalsLoad = useAtomValue(initialGoalsLoadAtom)
  const goalsLoading = useAtomValue(goalsLoadingAtom)

  return { inProgressGoals, completedGoals, initialGoalsLoad, goalsLoading }
}

export const useRewardsAtom = () => {
  const rewards = useAtomValue(rewardsAtom)
  const activeRewards = useAtomValue(activeRewardsAtom)
  const hiddenRewards = useAtomValue(hiddenRewardsAtom)
  const hasRewards = useAtomValue(hasRewardsAtom)
  return { rewards, activeRewards, hiddenRewards, hasRewards }
}

export const useSubscriptionsAtom = () => {
  const subscriptions = useAtomValue(subscriptionsAtom)
  const hasSubscriptions = useAtomValue(hasSubscriptionsAtom)

  return { subscriptions, hasSubscriptions }
}

export const useEntriesAtom = () => {
  const entries = useAtomValue(entriesAtom)
  const unpublishedEntries = useAtomValue(unpublishedEntriesAtom)
  const hasEntries = useAtomValue(hasEntriesAtom)

  return { entries, unpublishedEntries, hasEntries }
}

export const usePostsAtom = () => {
  const posts = useAtomValue(postsAtom)
  const unpublishedPosts = useAtomValue(unpublishedPostsAtom)
  const hasPosts = useAtomValue(hasPostsAtom)

  return { posts, unpublishedPosts, hasPosts }
}
