import { atom } from 'jotai'
import { ProjectFundingTxFragment } from 'types'

/** Project contributions for leaderboard sorted by latest */
export const contributionsAtom = atom<ProjectFundingTxFragment[]>([])

/** Contribution list for Leaderboard page */
export const contributionListAtom = atom<ProjectFundingTxFragment[]>([])

/** Reset all real-atoms in this file to it's initial State */
export const contributionAtomReset = atom(null, (get, set) => {
  set(contributionsAtom, [])
  set(contributionListAtom, [])
})
