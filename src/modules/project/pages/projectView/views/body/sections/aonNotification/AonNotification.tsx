import { useAuthContext } from '@/context/index.ts'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
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

  const isAon = isAllOrNothing(project)

  const { data, loading } = useProjectContributorQuery({
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

  if (!isAon || loading) {
    return null
  }

  if (project.aonGoal?.status === ProjectAonGoalStatus.Successful) {
    return <CampaignSuccessNotification />
  }

  if (project.aonGoal?.status === ProjectAonGoalStatus.Failed) {
    return <CampaignFailedNotification />
  }

  if (project.aonGoal?.status === ProjectAonGoalStatus.Claimed) {
    return <FundsClaimedNotification />
  }

  if (project.aonGoal?.status === ProjectAonGoalStatus.Cancelled) {
    return <FailedToClaimNotification />
  }

  if (project.aonGoal?.status === ProjectAonGoalStatus.Finalized) {
    return <FundsReturnedNotification />
  }

  if (fundedToCampaign) {
    return <FundedToCampaign contribution={fundedToCampaign} />
  }
}
