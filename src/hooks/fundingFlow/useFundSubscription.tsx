import { useCallback, useState } from 'react'

import {
  FundingTxFragment,
  useFundingTxStatusUpdatedSubscription,
} from '../../types'

type UseFundSubscriptionProps = {
  projectId: number
}

export const useFundSubscription = ({
  projectId,
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
      // input: {
      //   where: {
      //     projectIds: [projectId],
      //     resourceType: ActivityResourceType.FundingTx,
      //   },
      // },
    },
    skip: skipSubscription,
    onData(options) {
      const fundingTx = options.data.data?.fundingTxStatusUpdated.fundingTx
      setFundingActivity(fundingTx)
    },
  })

  return { startListening, stopListening, fundingActivity }
}
