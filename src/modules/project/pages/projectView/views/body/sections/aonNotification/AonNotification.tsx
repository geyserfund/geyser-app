import { useAuthContext } from '@/context/index.ts'
import { useProjectAPI } from '@/modules/project/API/useProjectAPI.ts'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { RefundRsk } from '@/modules/project/pages/projectFunding/views/refundPayoutRsk/RefundRsk.tsx'
import { useModal } from '@/shared/hooks/useModal.tsx'
import { ContributionStatus, ProjectAonGoalStatus, useProjectContributorQuery } from '@/types/index.ts'
import { isAllOrNothing } from '@/utils/index.ts'

import CampaignFailedNotification from './views/CampaignFailedNotification.tsx'
import { CampaignSuccessNotification } from './views/CampaignSuccessNotification.tsx'
import { FailedToClaimNotification } from './views/FailedToClaimNotification.tsx'
import { FundedToCampaign } from './views/FundedToCampaign.tsx'
import { FundsClaimedNotification } from './views/FundsClaimedNotification.tsx'
import { FundsReturnedNotification } from './views/FundsReturnedNotification.tsx'

export const AonNotification = () => {
  const { project } = useProjectAtom()
  const { user } = useAuthContext()

  const { queryProject } = useProjectAPI()

  const refundModal = useModal()

  const isAon = isAllOrNothing(project)

  const { data, loading, refetch } = useProjectContributorQuery({
    skip: !project.id || !user.id || !isAon,
    variables: {
      input: {
        projectId: project.id,
        userId: user.id,
      },
    },
  })

  console.log('data', data)
  const fundedToCampaign = data?.contributor?.contributions.find(
    (contribution) => contribution.status === ContributionStatus.Pledged,
  )

  const renderNotification = () => {
    if (!isAon || loading) {
      return null
    }

    if (project.aonGoal?.status === ProjectAonGoalStatus.Successful) {
      return <CampaignSuccessNotification />
    }

    if (project.aonGoal?.status === ProjectAonGoalStatus.Failed) {
      return <CampaignFailedNotification hasFundedToCampaign={Boolean(fundedToCampaign)} onOpen={refundModal.onOpen} />
    }

    if (project.aonGoal?.status === ProjectAonGoalStatus.Claimed) {
      return <FundsClaimedNotification />
    }

    if (project.aonGoal?.status === ProjectAonGoalStatus.Cancelled) {
      return <FailedToClaimNotification hasFundedToCampaign={Boolean(fundedToCampaign)} onOpen={refundModal.onOpen} />
    }

    if (project.aonGoal?.status === ProjectAonGoalStatus.Finalized) {
      return <FundsReturnedNotification />
    }

    if (fundedToCampaign) {
      return <FundedToCampaign onOpen={refundModal.onOpen} />
    }
  }

  const renderRefundModal = () => {
    if (!fundedToCampaign) {
      return null
    }

    return (
      <RefundRsk
        {...refundModal}
        contributionUUID={fundedToCampaign.uuid || ''}
        projectId={project.id}
        onCompleted={() => {
          refetch()
          queryProject.execute()
        }}
      />
    )
  }

  return (
    <>
      {renderNotification()}
      {renderRefundModal()}
    </>
  )
}
