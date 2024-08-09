import { useAtom } from 'jotai'
import { useCallback, useState } from 'react'

import { FundingTxFragment, useFundingTxStatusUpdatedSubscription } from '../../../../types'
import { useFundingTxAtom } from '../state'
import { subscriptionActiveAtom } from '../state/pollingFundingTx'
import { useFundingFormAtom } from './useFundingFormAtom'

type UseFundSubscriptionProps = {
  onComplete?: (fundingTx: FundingTxFragment) => void
}

export const useFundSubscription = ({ onComplete }: UseFundSubscriptionProps) => {
  const { project } = useFundingFormAtom()
  const { fundingTx } = useFundingTxAtom()

  const [isSubscriptionActive, setIsSubscriptionActive] = useAtom(subscriptionActiveAtom)

  const startSubscription = useCallback(() => {
    setIsSubscriptionActive(true)
  }, [setIsSubscriptionActive])

  const stopSubscription = useCallback(() => {
    setIsSubscriptionActive(false)
  }, [setIsSubscriptionActive])

  const [fundingActivity, setFundingActivity] = useState<FundingTxFragment>()

  const skipSubscription = !isSubscriptionActive || !project.id || !fundingTx.id

  useFundingTxStatusUpdatedSubscription({
    variables: {
      input: {
        projectId: project.id || undefined,
        fundingTxId: fundingTx.id || undefined,
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
