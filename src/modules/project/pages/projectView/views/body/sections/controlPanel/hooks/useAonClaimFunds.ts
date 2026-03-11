import { useEffect, useState } from 'react'
import { useApolloClient } from '@apollo/client'

import { useProjectAPI } from '@/modules/project/API/useProjectAPI.ts'
import { QUERY_PAYOUT_ACTIVE } from '@/modules/project/graphql/query/payoutQuery.ts'
import { useModal } from '@/shared/hooks/useModal.tsx'
import { PayoutStatus, ProjectAonGoalStatus } from '@/types'
import { isAllOrNothing } from '@/utils/index.ts'

import { useProjectAtom } from '../../../../../../../hooks/useProjectAtom.ts'
import { useRefetchQueries } from '../../aonNotification/hooks/useRefetchQueries.ts'

const AON_CLAIMABLE_STATUSES = [ProjectAonGoalStatus.Successful, ProjectAonGoalStatus.Claimed]

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
      query: QUERY_PAYOUT_ACTIVE,
      variables: { projectId: project.id },
      fetchPolicy: 'network-only',
    }).then(({ data }) => {
      const status = data?.payoutActive?.payout?.status
      setIsPayoutProcessing(status === PayoutStatus.Pending || status === PayoutStatus.Processing)
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
