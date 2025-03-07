import { useAtomValue, useSetAtom } from 'jotai'

import { useContributionWithInvoiceStatusGetQuery } from '@/types'
import { toInt } from '@/utils'

import { fundingContributionAtom, fundingContributionStatusCheckAtom } from '../state/fundingContributionAtom.ts'
import { pollingFundingContributionAtom } from '../state/pollingAndSubscriptionAtom.ts'

export const useFundingContributionPolling = () => {
  const checkFundingContributionStatus = useSetAtom(fundingContributionStatusCheckAtom)

  const pollingContribution = useAtomValue(pollingFundingContributionAtom)

  const fundingContribution = useAtomValue(fundingContributionAtom)

  const skipPolling = pollingContribution === 0 || !fundingContribution.id

  const { refetch } = useContributionWithInvoiceStatusGetQuery({
    variables: {
      contributionId: toInt(fundingContribution.id),
    },
    notifyOnNetworkStatusChange: true,
    skip: skipPolling,
    onCompleted(data) {
      if (data && data.contribution) {
        checkFundingContributionStatus(data.contribution)
      }
    },
    pollInterval: pollingContribution,
    fetchPolicy: 'network-only',
  })

  return {
    refetch,
  }
}
