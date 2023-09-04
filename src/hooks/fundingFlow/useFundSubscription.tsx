import { useCallback, useState } from 'react'

import {
  FundingTxFragment,
  useFundingTxStatusUpdatedSubscription,
} from '../../types'

type UseFundSubscriptionProps = {
  projectId?: number
  fundingTxId?: number
  onComplete?: (fundingTx: FundingTxFragment) => void
}

export const useFundSubscription = ({
  projectId,
  fundingTxId,
  onComplete,
}: UseFundSubscriptionProps) => {
  const [skip, setSkip] = useState(true)
  const [fundingActivity, setFundingActivity] = useState<FundingTxFragment>()

  const startListening = useCallback(() => {
    setSkip(false)
  }, [])

  const stopListening = useCallback(() => {
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

  return { startListening, stopListening, fundingActivity }
}
