import { useAtomValue, useSetAtom } from 'jotai'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'

import { getPath } from '@/shared/constants'
import { ContributionStatus } from '@/types/index.ts'

import { fundingContributionAtom } from '../state/fundingContributionAtom.ts'
import { launchContributionProjectIdAtom } from '../state/fundingFormAtom.ts'
import { startPollingAndSubscriptionAtom, stopPollingAndSubscriptionAtom } from '../state/pollingAndSubscriptionAtom.ts'
import { useFundingContributionPolling } from './useFundingContributionPolling.ts'
import { useFundingContributionSubscription } from './useFundingContributionSubscription.ts'
import { useFundingFormAtom } from './useFundingFormAtom.ts'

/**
 * Listens for funding contribution through polling and subscription and navigates to the success page on contribution confirmed
 * @description Component specific listener, stops polling and subscription on unmount
 */
export const useListenFundingContributionSuccess = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const stopPollingAndSubscription = useSetAtom(stopPollingAndSubscriptionAtom)
  const startPollingAndSubscription = useSetAtom(startPollingAndSubscriptionAtom)

  const launchContributionProjectId = useAtomValue(launchContributionProjectIdAtom)

  const { project } = useFundingFormAtom()

  const { refetch } = useFundingContributionPolling()
  useFundingContributionSubscription({ onComplete: () => refetch })

  const fundingContribution = useAtomValue(fundingContributionAtom)

  useEffect(() => {
    if (fundingContribution && fundingContribution.status === ContributionStatus.Confirmed) {
      if (launchContributionProjectId) {
        setTimeout(() => {
          navigate({ pathname: getPath('launchProjectStrategy', `${launchContributionProjectId}`) }, { replace: true })
        }, 2000)
      } else {
        navigate({ pathname: getPath('fundingSuccess', project.name), search: location.search }, { replace: true })
      }
    }
  }, [fundingContribution, navigate, project.name, location.search, launchContributionProjectId])

  useEffect(() => {
    startPollingAndSubscription()
    return stopPollingAndSubscription
  }, [startPollingAndSubscription, stopPollingAndSubscription])
}
