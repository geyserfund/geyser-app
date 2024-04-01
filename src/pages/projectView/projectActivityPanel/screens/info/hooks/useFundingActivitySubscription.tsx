import { useCallback, useState } from 'react'

import { FundingTxFragment, useFundingTxStatusUpdatedSubscription } from '../../../../../../types'

type UseFundSubscriptionProps = {
  projectId?: number
  fundingTxId?: number
  onComplete?: (fundingTx: FundingTxFragment) => void
}

export const useFundingActivitySubscription = ({ projectId, fundingTxId, onComplete }: UseFundSubscriptionProps) => {
  const [skip, setSkip] = useState(true)
  const [fundingActivity, setFundingActivity] = useState<FundingTxFragment>()

  const startSubscription = useCallback(() => {
    setSkip(false)
  }, [])

  const stopSubscription = useCallback(() => {
    setFundingActivity(undefined)
    setSkip(true)
  }, [])

  const skipSubscription = skip || !projectId
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
