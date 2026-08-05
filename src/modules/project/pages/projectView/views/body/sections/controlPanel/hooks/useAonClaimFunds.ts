import { useAtomValue } from 'jotai'
import { useNavigate } from 'react-router'

import { authUserAtom } from '@/modules/auth/state/authAtom.ts'
import { useProjectAPI } from '@/modules/project/API/useProjectAPI.ts'
import { useModal } from '@/shared/hooks/useModal.tsx'
import { getPath } from '@/shared/constants/index.ts'
import { ProjectAonGoalStatus } from '@/types'
import { isAllOrNothing } from '@/utils/index.ts'

import { useProjectAtom } from '../../../../../../../hooks/useProjectAtom.ts'
import { useRefetchQueries } from '../../aonNotification/hooks/useRefetchQueries.ts'

/**
 * Controls AON claim-to-EOA entry from the control panel.
 * SUCCESSFUL → show claim modal. CLAIMED → skip claim and send user to wallet withdraw.
 */
export const useAonClaimFunds = () => {
  const { project, isProjectOwner } = useProjectAtom()
  const aonClaimModal = useModal()
  const navigate = useNavigate()
  const user = useAtomValue(authUserAtom)
  const { refetchQueriesOnPayoutSuccess } = useRefetchQueries()
  const { queryProject } = useProjectAPI()

  const isAon = isAllOrNothing(project)
  const goalReached = project.aonGoal?.status === ProjectAonGoalStatus.Successful
  const alreadyClaimed = project.aonGoal?.status === ProjectAonGoalStatus.Claimed

  const showClaim = isAon && isProjectOwner && goalReached
  /** After claim-to-EOA, funds sit on the personal RSK wallet — point creators to withdraw there. */
  const showClaimedWithdraw = isAon && isProjectOwner && alreadyClaimed

  const openClaimedWithdraw = () => {
    if (!user?.id) {
      return
    }

    navigate(`${getPath('userProfileSettingsWallet', String(user.id))}?action=withdraw`)
  }

  const onCompleted = () => {
    refetchQueriesOnPayoutSuccess()
    queryProject.execute()
  }

  return {
    showClaim,
    showClaimedWithdraw,
    /** @deprecated use aonClaimModal — kept for ControlPanel compatibility during rename */
    payoutRskModal: aonClaimModal,
    aonClaimModal,
    openClaimedWithdraw,
    onCompleted,
  }
}
