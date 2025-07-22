import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import {
  ContributionStatus,
  FundingContributionFragment,
  useContributionWithInvoiceStatusGetQuery,
  useFundingContributionStatusUpdatedSubscription,
} from '@/types/index.ts'
import { toInt } from '@/utils/index.ts'

const POLLING_CONTRIBUTION = 10 * 1000 // 10 seconds

interface UseListenToContributionConfirmedProps {
  contributionId?: string | number
  onCompleted: () => void
}

export const useListenToContributionConfirmed = ({
  contributionId,
  onCompleted,
}: UseListenToContributionConfirmedProps) => {
  const { project } = useProjectAtom()

  const handleContributionUpdated = (contribution: Pick<FundingContributionFragment, 'id' | 'status'>) => {
    if (contribution.status === ContributionStatus.Confirmed && contribution.id === contributionId) {
      onCompleted()
    }
  }

  // Polling query to check contribution status
  useContributionWithInvoiceStatusGetQuery({
    variables: {
      contributionId: toInt(contributionId),
    },
    notifyOnNetworkStatusChange: true,
    skip: !contributionId,
    onCompleted(data) {
      if (data && data.contribution) {
        handleContributionUpdated(data.contribution)
      }
    },
    pollInterval: POLLING_CONTRIBUTION,
    fetchPolicy: 'network-only',
  })

  // Subscription to listen for real-time updates
  const skipSubscription = !contributionId || !project.id

  useFundingContributionStatusUpdatedSubscription({
    variables: {
      input: {
        projectId: project.id || undefined,
        contributionId,
      },
    },
    skip: skipSubscription,
    onData(options) {
      if (options.data.data?.contributionStatusUpdated.contribution) {
        const updatedContribution = options.data.data.contributionStatusUpdated.contribution
        handleContributionUpdated(updatedContribution)
      }
    },
  })
}
