import { atom } from 'jotai'

import { ContributionStatus, FundingContributionFragment } from '@/types/index.ts'

/** Initial state for the funding  contribution */
const initialFundingContribution: FundingContributionFragment = {
  id: '',
  uuid: '',
  amount: 0,
  status: ContributionStatus.Pending,
  comment: null,
  media: null,
  confirmedAt: null,
  projectId: '',
  creatorEmail: null,
  createdAt: '',
  isAnonymous: false,
  isSubscription: false,
  funder: {
    id: '',
    user: {
      id: '',
      imageUrl: '',
      username: '',
    },
  },
  payments: [],
}

/** Atom for storing the current funding  contribution */
export const fundingContributionAtom = atom<FundingContributionFragment>(initialFundingContribution)

/** Atom for making partial updates to the funding  contribution */
export const fundingContributionPartialUpdateAtom = atom(
  null,
  (get, set, partial: Partial<FundingContributionFragment>) => {
    const current = get(fundingContributionAtom)
    set(fundingContributionAtom, { ...current, ...partial })
  },
)

/** Atom for resetting the funding  contribution to its initial state */
export const resetFundingContributionAtom = atom(null, (_, set) => {
  set(fundingContributionAtom, initialFundingContribution)
})

/** Atom for checking the status of the funding  contribution, update if status is different */
export const fundingContributionStatusCheckAtom = atom(
  null,
  (get, set, fundingContribution: Partial<FundingContributionFragment>) => {
    if (!fundingContribution || !fundingContribution.status) {
      return
    }

    const current = get(fundingContributionAtom)

    if (fundingContribution.status !== current.status && fundingContribution.id === current.id) {
      set(fundingContributionAtom, { ...current, ...fundingContribution })
    }
  },
)
