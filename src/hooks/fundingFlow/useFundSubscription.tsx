import { useSubscription } from '@apollo/client'
import { useCallback, useState } from 'react'

import { PROJECT_FUNDING_SUBSCRIPTION } from '../../graphql/subscriptions/fundingActivity'
import { ActivityResourceType, FundingTxFragment } from '../../types'

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
  useSubscription(PROJECT_FUNDING_SUBSCRIPTION, {
    variables: {
      where: {
        projectIds: [projectId],
        resourceType: ActivityResourceType.FundingTx,
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
