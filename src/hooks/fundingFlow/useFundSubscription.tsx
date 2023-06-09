import { useCallback, useState } from 'react'

import {
  ActivityResourceType,
  FundingTxFragment,
  useFundingActivityCreatedSubscription,
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

  useFundingActivityCreatedSubscription({
    variables: {
      input: {
        where: {
          projectIds: [projectId],
          resourceType: ActivityResourceType.FundingTx,
        },
      },
    },
    skip: skipSubscription,
    onData(options) {
      const activityCreated = options.data.data
        ?.activityCreated as FundingTxFragment
      setFundingActivity(activityCreated)
    },
  })

  return { startListening, stopListening, fundingActivity }
}
