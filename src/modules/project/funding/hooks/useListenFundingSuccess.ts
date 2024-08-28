import { useEffect } from 'react'
import { useNavigate } from 'react-router'

import { getPath } from '@/shared/constants'
import { FundingStatus } from '@/types'

import { useFundingTxAtom } from '../state'
import { useFundPollingAndSubscriptionAtom } from '../state/pollingFundingTx'
import { useFundingFormAtom } from './useFundingFormAtom'
import { useFundPolling } from './useFundPolling'
import { useFundSubscription } from './useFundSubscription'

export const useListenFundingSuccess = () => {
  const navigate = useNavigate()

  const { startPollingAndSubscription, clearPollingAndSubscription } = useFundPollingAndSubscriptionAtom()

  const { project } = useFundingFormAtom()

  const { refetch } = useFundPolling()
  useFundSubscription({ onComplete: () => refetch })

  const { fundingTx } = useFundingTxAtom()

  useEffect(() => {
    if (fundingTx && fundingTx.status === FundingStatus.Paid) {
      navigate(getPath('fundingSuccess', project.name))
    }
  }, [fundingTx, navigate, project.name])

  useEffect(() => {
    startPollingAndSubscription()
    return clearPollingAndSubscription
  }, [startPollingAndSubscription, clearPollingAndSubscription])
}
