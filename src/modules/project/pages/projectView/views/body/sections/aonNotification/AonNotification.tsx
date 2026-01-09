import { useEffect, useState } from 'react'

import { useAuthContext } from '@/context/index.ts'
import { useProjectAPI } from '@/modules/project/API/useProjectAPI.ts'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { PayoutRsk } from '@/modules/project/pages/projectFunding/views/refundPayoutRsk/PayoutRsk.tsx'
import { RefundRsk } from '@/modules/project/pages/projectFunding/views/refundPayoutRsk/RefundRsk.tsx'
import { useModal } from '@/shared/hooks/useModal.tsx'
import {
  ContributionStatus,
  PaymentStatus,
  PayoutStatus,
  ProjectAonGoalStatus,
  usePayoutRequestMutation,
  useProjectContributorQuery,
} from '@/types/index.ts'
import { isAllOrNothing } from '@/utils/index.ts'

import { useRefetchQueries } from './hooks/useRefetchQueries.ts'
import CampaignFailedNotification from './views/CampaignFailedNotification.tsx'
import { CampaignSuccessNotification } from './views/CampaignSuccessNotification.tsx'
import { ContributionPendingToProjectNotification } from './views/ContributionPendingToProjectNotification.tsx'
import { FailedToClaimNotification } from './views/FailedToClaimNotification.tsx'
import { FundedToCampaign } from './views/FundedToCampaign.tsx'
import { FundsClaimedNotification } from './views/FundsClaimedNotification.tsx'
import { FundsReturnedNotification } from './views/FundsReturnedNotification.tsx'

export const AonSuccessfullStatuses = [ProjectAonGoalStatus.Successful, ProjectAonGoalStatus.Claimed]

export const AonNotification = () => {
  const { project, isProjectOwner } = useProjectAtom()
  const { user } = useAuthContext()

  const { refetchQueriesOnPledgeRefund, refetchQueriesOnPayoutSuccess } = useRefetchQueries()
  const { queryProject } = useProjectAPI()

  const payoutRskModal = useModal()
  const refundModal = useModal()

  const isAon = isAllOrNothing(project)

  const [isPayoutProcessing, setIsPayoutProcessing] = useState(false)

  const { data, loading } = useProjectContributorQuery({
    skip: !project.id || !user.id || !isAon,
    fetchPolicy: 'network-only',
    variables: {
      input: {
        projectId: project.id,
        userId: user.id,
      },
    },
  })

  const [payoutRequest] = usePayoutRequestMutation({
    variables: {
      input: {
        projectId: project.id,
      },
    },
  })

  useEffect(() => {
    if (isProjectOwner && project?.aonGoal?.status && AonSuccessfullStatuses.includes(project.aonGoal.status)) {
      payoutRequest({
        variables: {
          input: {
            projectId: project.id,
          },
        },
        onCompleted(data) {
          const { status } = data.payoutRequest.payout

          if (status === PayoutStatus.Pending || status === PayoutStatus.Processing) {
            setIsPayoutProcessing(true)
          } else {
            setIsPayoutProcessing(false)
          }
        },
      })
    }
  }, [isProjectOwner, payoutRequest, project])

  const contributionPendingToProject = data?.contributor?.contributions.find(
    (contribution) =>
      contribution.status === ContributionStatus.Pending &&
      contribution.payments.some((payment) => payment.status === PaymentStatus.Pending),
  )

  const fundedToCampaign = data?.contributor?.contributions.find(
    (contribution) => contribution.status === ContributionStatus.Pledged,
  )
  const isPayoutRemaining =
    (project.aonGoal?.status === ProjectAonGoalStatus.Successful || isPayoutProcessing) && isProjectOwner

  const renderNotification = () => {
    if (!isAon || loading) {
      return null
    }

    if (project.aonGoal?.status === ProjectAonGoalStatus.Successful) {
      return <CampaignSuccessNotification onOpen={payoutRskModal.onOpen} />
    }

    if (project.aonGoal?.status === ProjectAonGoalStatus.Claimed) {
      if (isPayoutProcessing) {
        return <CampaignSuccessNotification onOpen={payoutRskModal.onOpen} />
      }

      return <FundsClaimedNotification />
    }

    if (project.aonGoal?.status === ProjectAonGoalStatus.Failed) {
      return <CampaignFailedNotification hasFundedToCampaign={Boolean(fundedToCampaign)} onOpen={refundModal.onOpen} />
    }

    if (project.aonGoal?.status === ProjectAonGoalStatus.Cancelled) {
      return <FailedToClaimNotification hasFundedToCampaign={Boolean(fundedToCampaign)} onOpen={refundModal.onOpen} />
    }

    if (project.aonGoal?.status === ProjectAonGoalStatus.Finalized) {
      return <FundsReturnedNotification />
    }

    if (contributionPendingToProject) {
      return <ContributionPendingToProjectNotification contribution={contributionPendingToProject} />
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
          refetchQueriesOnPledgeRefund()
          queryProject.execute()
        }}
      />
    )
  }

  const renderPayoutModal = () => {
    if (!isPayoutRemaining) {
      return null
    }

    return (
      <PayoutRsk
        {...payoutRskModal}
        project={project}
        onCompleted={() => {
          refetchQueriesOnPayoutSuccess()
          queryProject.execute()
          setIsPayoutProcessing(false)
        }}
      />
    )
  }

  return (
    <>
      {renderNotification()}
      {renderRefundModal()}
      {renderPayoutModal()}
    </>
  )
}
