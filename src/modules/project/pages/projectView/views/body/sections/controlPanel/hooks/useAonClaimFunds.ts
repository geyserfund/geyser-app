import { useEffect, useState } from 'react'
import { useApolloClient } from '@apollo/client'

import { useProjectAPI } from '@/modules/project/API/useProjectAPI.ts'
import { QUERY_PAYOUT_LATEST } from '@/modules/project/graphql/query/payoutQuery.ts'
import { useModal } from '@/shared/hooks/useModal.tsx'
import { PaymentStatus, PayoutStatus, ProjectAonGoalStatus } from '@/types'
import { isAllOrNothing } from '@/utils/index.ts'

import { useProjectAtom } from '../../../../../../../hooks/useProjectAtom.ts'
import { useRefetchQueries } from '../../aonNotification/hooks/useRefetchQueries.ts'

const AON_CLAIMABLE_STATUSES = [ProjectAonGoalStatus.Successful, ProjectAonGoalStatus.Claimed]
const AON_ACTIVE_PAYOUT_STATUSES = [PayoutStatus.Pending, PayoutStatus.Processing]

export const useAonClaimFunds = () => {
  const { project, isProjectOwner } = useProjectAtom()
  const payoutRskModal = useModal()
  const { refetchQueriesOnPayoutSuccess } = useRefetchQueries()
  const { queryProject } = useProjectAPI()
  const apolloClient = useApolloClient()

  const isAon = isAllOrNothing(project)
  const [isPayoutProcessing, setIsPayoutProcessing] = useState(false)

  useEffect(() => {
    if (!isProjectOwner || !isAon || !project?.aonGoal?.status) return
    if (!AON_CLAIMABLE_STATUSES.includes(project.aonGoal.status)) return

    apolloClient.query({
      query: QUERY_PAYOUT_LATEST,
      variables: { projectId: project.id },
      fetchPolicy: 'network-only',
    }).then(({ data }) => {
      const payout = data?.payoutLatest?.payout
      const latestPayment = [...(payout?.payments ?? [])].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )[0]
      const isActivePayout = Boolean(payout?.status && AON_ACTIVE_PAYOUT_STATUSES.includes(payout.status))
      const isRetryablePayout =
        payout?.status === PayoutStatus.Failed && latestPayment?.status === PaymentStatus.Refunded

      setIsPayoutProcessing(isActivePayout || isRetryablePayout)
    }).catch(() => {
      setIsPayoutProcessing(false)
    })
  }, [apolloClient, isProjectOwner, isAon, project?.aonGoal?.status, project.id])

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
