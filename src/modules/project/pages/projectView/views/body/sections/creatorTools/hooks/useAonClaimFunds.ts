import { useEffect, useState } from 'react'

import { useProjectAPI } from '@/modules/project/API/useProjectAPI.ts'
import { useModal } from '@/shared/hooks/useModal.tsx'
import { PayoutStatus, ProjectAonGoalStatus, usePayoutRequestMutation } from '@/types'
import { isAllOrNothing } from '@/utils/index.ts'

import { useProjectAtom } from '../../../../../../../hooks/useProjectAtom.ts'
import { useRefetchQueries } from '../../aonNotification/hooks/useRefetchQueries.ts'

const AON_CLAIMABLE_STATUSES = [ProjectAonGoalStatus.Successful, ProjectAonGoalStatus.Claimed]

export const useAonClaimFunds = () => {
  const { project, isProjectOwner } = useProjectAtom()
  const payoutRskModal = useModal()
  const { refetchQueriesOnPayoutSuccess } = useRefetchQueries()
  const { queryProject } = useProjectAPI()

  const isAon = isAllOrNothing(project)
  const [isPayoutProcessing, setIsPayoutProcessing] = useState(false)

  const [payoutRequest] = usePayoutRequestMutation()

  useEffect(() => {
    if (!isProjectOwner || !isAon || !project?.aonGoal?.status) return
    if (!AON_CLAIMABLE_STATUSES.includes(project.aonGoal.status)) return

    payoutRequest({
      variables: { input: { projectId: project.id } },
      onCompleted(data) {
        const { status } = data.payoutRequest.payout
        setIsPayoutProcessing(status === PayoutStatus.Pending || status === PayoutStatus.Processing)
      },
    })
  }, [isProjectOwner, isAon, project?.aonGoal?.status, project.id, payoutRequest])

  const goalReached = project.aonGoal?.status === ProjectAonGoalStatus.Successful
  const claimedButProcessing = project.aonGoal?.status === ProjectAonGoalStatus.Claimed && isPayoutProcessing

  const showClaim = isAon && isProjectOwner && (goalReached || claimedButProcessing)

  const onCompleted = () => {
    refetchQueriesOnPayoutSuccess()
    queryProject.execute()
    setIsPayoutProcessing(false)
  }

  return { showClaim, payoutRskModal, onCompleted }
}
