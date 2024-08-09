import { atom, useAtomValue, useSetAtom } from 'jotai'

const POLLING_INTERVAL_FIRST = 5 * 1000 // 5 seconds
const POLLING_INTERVAL_SECOND = 2 * 1000 // 5 seconds

const FIRST_POLLING_CYCLE = 15 * 1000 // 15 seconds

export const pollingFundingTxAtom = atom(0)

export const subscriptionActiveAtom = atom(false)

export const startPollingAndSubscriptionAtom = atom(null, (get, set) => {
  set(pollingFundingTxAtom, POLLING_INTERVAL_FIRST)
  set(subscriptionActiveAtom, true)

  setTimeout(() => {
    const timeout = get(pollingFundingTxAtom)
    if (timeout !== POLLING_INTERVAL_FIRST) return
    set(pollingFundingTxAtom, POLLING_INTERVAL_SECOND)
  }, FIRST_POLLING_CYCLE)
})

const clearPollingAndSubscriptionAtom = atom(null, (get, set) => {
  set(pollingFundingTxAtom, 0)
  set(subscriptionActiveAtom, false)
})

export const useFundPollingAndSubscriptionAtom = () => {
  const pollingFundingTx = useAtomValue(pollingFundingTxAtom)
  const subscriptionActive = useAtomValue(subscriptionActiveAtom)

  const startPollingAndSubscription = useSetAtom(startPollingAndSubscriptionAtom)
  const clearPollingAndSubscription = useSetAtom(clearPollingAndSubscriptionAtom)

  return { pollingFundingTx, subscriptionActive, startPollingAndSubscription, clearPollingAndSubscription }
}
