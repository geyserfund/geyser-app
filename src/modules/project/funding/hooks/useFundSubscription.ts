import { useAtom } from 'jotai'
import { useCallback, useState } from 'react'

import { FundingTxFragment, useFundingTxStatusUpdatedSubscription } from '../../../../types'
import { subscriptionActiveAtom } from '../state/pollingFundingTx'

type UseFundSubscriptionProps = {
  projectId?: number
  fundingTxId?: number
  onComplete?: (fundingTx: FundingTxFragment) => void
}

export const useFundSubscription = ({ projectId, fundingTxId, onComplete }: UseFundSubscriptionProps) => {
  const [isSubscriptionActive, setIsSubscriptionActive] = useAtom(subscriptionActiveAtom)

  const startSubscription = useCallback(() => {
    setIsSubscriptionActive(true)
  }, [setIsSubscriptionActive])

  const stopSubscription = useCallback(() => {
    setIsSubscriptionActive(false)
  }, [setIsSubscriptionActive])

  const [fundingActivity, setFundingActivity] = useState<FundingTxFragment>()

  const skipSubscription = !isSubscriptionActive || !projectId
  useFundingTxStatusUpdatedSubscription({
    variables: {
      input: {
        projectId: projectId || undefined,
        fundingTxId: fundingTxId || undefined,
      },
    },
    skip: skipSubscription,
    onData(options) {
      const fundingTx = options.data.data?.fundingTxStatusUpdated.fundingTx
      setFundingActivity(fundingTx)
      if (fundingTx && onComplete) {
        onComplete(fundingTx)
      }
    },
  })

  return { startSubscription, stopSubscription, fundingActivity }
}
