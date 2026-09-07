import { useAtomValue, useSetAtom } from 'jotai'
import { useCallback, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'

import { getPath } from '@/shared/constants'
import { ContributionStatus } from '@/types/index.ts'

import { fundingRequestErrorAtom } from '../state/errorAtom.ts'
import { fundingContributionAtom } from '../state/fundingContributionAtom.ts'
import { startPollingAndSubscriptionAtom, stopPollingAndSubscriptionAtom } from '../state/pollingAndSubscriptionAtom.ts'
import { useFundingContributionPolling } from './useFundingContributionPolling.ts'
import { useFundingContributionSubscription } from './useFundingContributionSubscription.ts'
import { useFundingFormAtom } from './useFundingFormAtom.ts'

const StatusForSuccess = [ContributionStatus.Confirmed, ContributionStatus.Pledged]

/**
 * Listens for funding contribution through polling and subscription and navigates to the success page on contribution confirmed
 * @description Component specific listener, stops polling and subscription on unmount
 */
export const useListenFundingContributionSuccess = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const stopPollingAndSubscription = useSetAtom(stopPollingAndSubscriptionAtom)
  const startPollingAndSubscription = useSetAtom(startPollingAndSubscriptionAtom)

  const { project } = useFundingFormAtom()

  const setFundingRequestError = useSetAtom(fundingRequestErrorAtom)
  const { refetch } = useFundingContributionPolling()
  const handleComplete = useCallback(async () => {
    try {
      await refetch()
    } catch {
      setFundingRequestError(true)
    }
  }, [refetch, setFundingRequestError])

  useFundingContributionSubscription({
    onComplete: handleComplete,
  })

  const fundingContribution = useAtomValue(fundingContributionAtom)

  useEffect(() => {
    if (fundingContribution && StatusForSuccess.includes(fundingContribution.status)) {
      navigate({ pathname: getPath('fundingSuccess', project.name), search: location.search }, { replace: true })
    }
  }, [fundingContribution, navigate, project.name, location.search])

  useEffect(() => {
    startPollingAndSubscription()
    return stopPollingAndSubscription
  }, [startPollingAndSubscription, stopPollingAndSubscription])
}
