import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { ProjectAonGoalStatus } from '@/types/index.ts'
import { isAllOrNothing } from '@/utils/index.ts'

import CampaignFailedNotification from './views/CampaignFailedNotification.tsx'
import { CampaignSuccessNotification } from './views/CampaignSuccessNotification.tsx'
import { FailedToClaimNotification } from './views/FailedToClaimNotification.tsx'
import { FundsClaimedNotification } from './views/FundsClaimedNotification.tsx'
import { FundsReturnedNotification } from './views/FundsReturnedNotification.tsx'

export const AonNotification = () => {
  const { project } = useProjectAtom()

  if (!isAllOrNothing(project)) {
    return null
  }

  if (project.aonGoalStatus === ProjectAonGoalStatus.Successful) {
    return <CampaignSuccessNotification />
  }

  if (project.aonGoalStatus === ProjectAonGoalStatus.Failed) {
    return <CampaignFailedNotification />
  }

  if (project.aonGoalStatus === ProjectAonGoalStatus.Claimed) {
    return <FundsClaimedNotification />
  }

  if (project.aonGoalStatus === ProjectAonGoalStatus.Cancelled) {
    return <FailedToClaimNotification />
  }

  if (project.aonGoalStatus === ProjectAonGoalStatus.Finalized) {
    return <FundsReturnedNotification />
  }
}
