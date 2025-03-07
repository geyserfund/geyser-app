import { useAtom, useAtomValue } from 'jotai'
import { useCallback } from 'react'

import {
  FundingContributionSubscriptionFragment,
  useFundingContributionStatusUpdatedSubscription,
} from '@/types/index.ts'

import { fundingContributionAtom } from '../state/fundingContributionAtom.ts'
import { fundingContributionSubscriptionActiveAtom } from '../state/pollingAndSubscriptionAtom.ts'
import { useFundingFormAtom } from './useFundingFormAtom.ts'

type UseFundingContributionSubscriptionProps = {
  onComplete?: (fundingContribution: FundingContributionSubscriptionFragment) => void
}

export const useFundingContributionSubscription = ({ onComplete }: UseFundingContributionSubscriptionProps) => {
  const { project } = useFundingFormAtom()

  const fundingContribution = useAtomValue(fundingContributionAtom)

  const [isSubscriptionActive, setIsSubscriptionActive] = useAtom(fundingContributionSubscriptionActiveAtom)

  const startSubscription = useCallback(() => {
    setIsSubscriptionActive(true)
  }, [setIsSubscriptionActive])

  const stopSubscription = useCallback(() => {
    setIsSubscriptionActive(false)
  }, [setIsSubscriptionActive])

  const skipSubscription = !isSubscriptionActive || !project.id || !fundingContribution.id

  useFundingContributionStatusUpdatedSubscription({
    variables: {
      input: {
        projectId: project.id || undefined,
        contributionId: fundingContribution.id,
      },
    },
    skip: skipSubscription,
    onData(options) {
      if (options.data.data?.contributionStatusUpdated.contribution && onComplete) {
        onComplete(options.data.data?.contributionStatusUpdated.contribution)
      }
    },
  })

  return { startSubscription, stopSubscription }
}
