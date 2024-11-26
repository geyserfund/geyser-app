import { atom } from 'jotai'
import { atomFamily } from 'jotai/utils'
import { ProjectFundingTxFragment, ProjectLeaderboardContributorsFragment, ProjectLeaderboardPeriod } from 'types'

import { convertSatsToUsd } from '@/utils'

/** Project contributions for project page contributions sorted by latest */
export const contributionsAtom = atom<ProjectFundingTxFragment[]>([])

/** Contribution list for Leaderboard page */
export const contributionListAtom = atom<ProjectFundingTxFragment[]>([])

export const addContributionAtom = atom(null, (get, set, contribution: ProjectFundingTxFragment) => {
  set(contributionsAtom, [contribution, ...get(contributionsAtom)])
  set(contributionListAtom, [contribution, ...get(contributionListAtom)])
})

/** Project contributors for project page leaderboard sorted by highest contribution */
export const contributorsAtom = atom<ProjectLeaderboardContributorsFragment[]>([])

/** Project contributors for leaderboard page sorted by highest contribution */
export const ContributorsListFamily = atomFamily(
  ({ value }: { period: ProjectLeaderboardPeriod; value?: ProjectLeaderboardContributorsFragment[] }) =>
    atom(value || []),
  (a, b) => a.period === b.period,
)

export const addContributorAtom = atom(null, (get, set, contributor: ProjectFundingTxFragment) => {
  // Helper to update contributor stats and reorder list
  const updateContributorList = (
    contributors: ProjectLeaderboardContributorsFragment[],
    maxLength: number,
    newContribution: ProjectFundingTxFragment,
  ): ProjectLeaderboardContributorsFragment[] => {
    const existingContributorIndex = contributors.findIndex((c) => c.funderId === newContribution.funder.id)

    if (existingContributorIndex > -1) {
      const existingContributor = contributors[existingContributorIndex]

      if (existingContributor) {
        // Update existing contributor
        const updatedContributor = {
          ...existingContributor,
          contributionsTotal: existingContributor.contributionsTotal + newContribution.amount,
          contributionsTotalUsd:
            existingContributor.contributionsTotalUsd +
            convertSatsToUsd({ sats: newContribution.amount, bitcoinQuote: newContribution.bitcoinQuote }),
          contributionsCount: existingContributor.contributionsCount + 1,
          commentsCount: newContribution.comment
            ? existingContributor.commentsCount + 1
            : existingContributor.commentsCount,
        }

        const newList = [
          ...contributors.slice(0, existingContributorIndex),
          ...contributors.slice(existingContributorIndex + 1),
        ]

        // Find correct position and insert
        const insertIndex = newList.findIndex((c) => c.contributionsTotalUsd < updatedContributor.contributionsTotalUsd)
        if (insertIndex === -1) {
          newList.push(updatedContributor)
        } else {
          newList.splice(insertIndex, 0, updatedContributor)
        }

        return newList
      }
    }

    // Check if new contributor should be added
    const newContributorEntry: ProjectLeaderboardContributorsFragment = {
      funderId: newContribution.funder.id,
      contributionsTotal: newContribution.amount,
      contributionsTotalUsd: convertSatsToUsd({
        sats: newContribution.amount,
        bitcoinQuote: newContribution.bitcoinQuote,
      }),
      contributionsCount: 1,
      commentsCount: newContribution.comment ? 1 : 0,
      user: newContribution.funder.user,
    }

    if (
      contributors.length < maxLength ||
      (contributors[contributors.length - 1]?.contributionsTotalUsd || 0) < newContributorEntry.contributionsTotalUsd
    ) {
      const insertIndex = contributors.findIndex(
        (c) => c.contributionsTotalUsd < newContributorEntry.contributionsTotalUsd,
      )

      if (insertIndex === -1) {
        return [...contributors, newContributorEntry].slice(0, maxLength)
      }

      return [...contributors.slice(0, insertIndex), newContributorEntry, ...contributors.slice(insertIndex)].slice(
        0,
        maxLength,
      )
    }

    return contributors
  }

  // Update contributorsAtom (top 8)
  const currentContributors = get(contributorsAtom)
  set(contributorsAtom, updateContributorList(currentContributors, 8, contributor))

  // Update all periods in ContributorsListFamily (top 100 each)
  Object.values(ProjectLeaderboardPeriod).forEach((period) => {
    const currentPeriodContributors = get(ContributorsListFamily({ period }))
    set(ContributorsListFamily({ period }), updateContributorList(currentPeriodContributors, 100, contributor))
  })
})

/** Reset all real-atoms in this file to it's initial State */
export const contributionAtomReset = atom(null, (get, set) => {
  set(contributionsAtom, [])
  set(contributionListAtom, [])
  set(contributorsAtom, [])
  Object.values(ProjectLeaderboardPeriod).forEach((period) => {
    set(ContributorsListFamily({ period }), [])
  })
})
