import { atom, useAtomValue, useSetAtom } from 'jotai'

const POLLING_INTERVAL = 5 * 1000 // 5 seconds

export const pollingFundingTxAtom = atom(0)

export const subscriptionActiveAtom = atom(false)

const startPollingAndSubscriptionAtom = atom(null, (get, set) => {
  set(pollingFundingTxAtom, POLLING_INTERVAL)
  set(subscriptionActiveAtom, true)
})

const clearPollingAndSubscriptionAtom = atom(null, (get, set) => {
  set(pollingFundingTxAtom, 0)
  set(subscriptionActiveAtom, false)
})

export const useFundPollingAndSubscription = () => {
  const pollingFundingTx = useAtomValue(pollingFundingTxAtom)
  const subscriptionActive = useAtomValue(subscriptionActiveAtom)

  const startPollingAndSubscription = useSetAtom(startPollingAndSubscriptionAtom)
  const clearPollingAndSubscription = useSetAtom(clearPollingAndSubscriptionAtom)

  return { pollingFundingTx, subscriptionActive, startPollingAndSubscription, clearPollingAndSubscription }
}
