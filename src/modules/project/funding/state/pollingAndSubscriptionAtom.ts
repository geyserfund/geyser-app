import { atom } from 'jotai'

const POLLING_INTERVAL_FIRST = 5 * 1000 // 5 seconds
const POLLING_INTERVAL_SECOND = 2 * 1000 // 5 seconds

const FIRST_POLLING_CYCLE = 15 * 1000 // 15 seconds

/** Atom for enabling/disabling polling of the funding contribution */
export const pollingFundingContributionAtom = atom(0)

/** Atom for enabling/disabling subscription of the funding contribution */
export const fundingContributionSubscriptionActiveAtom = atom(false)

/** Atom for starting polling and subscription of the funding contribution */
export const startPollingAndSubscriptionAtom = atom(null, (get, set) => {
  set(pollingFundingContributionAtom, POLLING_INTERVAL_FIRST)
  set(fundingContributionSubscriptionActiveAtom, true)

  setTimeout(() => {
    const timeout = get(pollingFundingContributionAtom)
    if (timeout !== POLLING_INTERVAL_FIRST) return
    set(pollingFundingContributionAtom, POLLING_INTERVAL_SECOND)
  }, FIRST_POLLING_CYCLE)
})

/** Atom for stopping the polling and subscription of the funding contribution */
export const stopPollingAndSubscriptionAtom = atom(null, (get, set) => {
  set(pollingFundingContributionAtom, 0)
  set(fundingContributionSubscriptionActiveAtom, false)
})
