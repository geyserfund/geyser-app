import { useSubscription } from '@apollo/client'
import { useState } from 'react'

import { ACTIVITY_CREATION_SUBSCRIPTION } from '../../graphql/subscriptions'
import {
  ActivityCreatedSubscription,
  ActivityCreatedSubscriptionInput,
  ActivityResourceType,
  FundingTxForLandingPageFragment,
} from '../../types'

type UseFundSubscriptionProps = {
  projectId: number
}

export const useFundSubscription = ({
  projectId,
}: UseFundSubscriptionProps) => {
  const [skip, setSkip] = useState(true)
  const [fundingTxId, setFundingTxId] = useState<number | null>(null)
  const [funded, setFunded] = useState(false)

  const startListening = (id: number) => {
    setFundingTxId(id)
    setSkip(false)
  }

  const stopListening = () => {
    setFundingTxId(null)
    setFunded(false)
    setSkip(true)
  }

  const skipSubscription = skip || !projectId || !fundingTxId

  const { loading } = useSubscription<
    ActivityCreatedSubscription,
    ActivityCreatedSubscriptionInput
  >(ACTIVITY_CREATION_SUBSCRIPTION, {
    variables: {
      where: {
        projectIds: [projectId],
        resourceType: ActivityResourceType.FundingTx,
      },
    },
    skip: skipSubscription,
    onData(options) {
      console.log('checking value', options)
      const activityCreated = options.data.data
        ?.activityCreated as FundingTxForLandingPageFragment
      if (activityCreated.id === fundingTxId) {
        setFunded(false)
      }
    },
  })
  console.log('checking loading', loading)
  return { startListening, stopListening, funded }
}
