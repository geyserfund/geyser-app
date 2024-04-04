import { atom } from 'jotai'

export enum ContributionView {
  rewards = 'rewards',
  pending = 'pending',
  accounts = 'accounts',
}

export const contributionViewAtom = atom<ContributionView>(ContributionView.rewards)
