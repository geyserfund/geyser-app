import { useApolloClient } from '@apollo/client'
import { useEffect, useState } from 'react'

import { useBTCConverter } from '@/helpers/useBTCConverter.ts'
import { useProjectAPI } from '@/modules/project/API/useProjectAPI.ts'
import { QUERY_PAYOUT_ACTIVE } from '@/modules/project/graphql/query/payoutQuery.ts'
import { usePrismWithdrawable } from '@/modules/project/pages/projectView/views/body/sections/tiaNotification/usePrismWithdrawable.ts'
import { useModal } from '@/shared/hooks/useModal.tsx'
import { PayoutStatus, ProjectFundingStrategy, Satoshis } from '@/types'

import { useProjectAtom } from '../../../../../../../hooks/useProjectAtom.ts'
import { useRefetchQueries } from '../../aonNotification/hooks/useRefetchQueries.ts'

const MIN_WITHDRAW_USD = 10
const ACTIVE_WITHDRAW_PAYOUT_STATUSES = [PayoutStatus.Pending, PayoutStatus.Processing]

export const useWithdrawFunds = () => {
  const { project, isProjectOwner } = useProjectAtom()
  const payoutRskModal = useModal()
  const { refetchQueriesOnPayoutSuccess } = useRefetchQueries()
  const { queryProject } = useProjectAPI()
  const { getUSDCentsAmount } = useBTCConverter()
  const apolloClient = useApolloClient()
  const [hasOngoingWithdraw, setHasOngoingWithdraw] = useState(false)

  const projectRskEoa = project?.rskEoa || ''
  const { withdrawable, isLoading, refetch: refetchWithdrawable } = usePrismWithdrawable({ rskAddress: projectRskEoa })

  const withdrawableSats = withdrawable ? Number(withdrawable / 10000000000n) : 0
  const withdrawableUsdCents = getUSDCentsAmount(withdrawableSats as Satoshis)
  const withdrawableUsd = withdrawableUsdCents / 100

  const isTiaProject = project?.fundingStrategy === ProjectFundingStrategy.TakeItAll
  const showWithdrawableBalance = isTiaProject && Boolean(projectRskEoa) && !isLoading
  const hasWithdrawableBalance = withdrawable !== null && withdrawable > 0n
  const isBelowMinWithdrawThreshold = withdrawableUsd < MIN_WITHDRAW_USD
  const showWithdraw = showWithdrawableBalance && (hasOngoingWithdraw || (hasWithdrawableBalance && !isBelowMinWithdrawThreshold))

  const refetchActivePayout = () => {
    return apolloClient.query({
      query: QUERY_PAYOUT_ACTIVE,
      variables: { projectId: project.id },
      fetchPolicy: 'network-only',
    }).then(({ data }) => {
      const status = data?.payoutActive?.payout?.status
      setHasOngoingWithdraw(Boolean(status && ACTIVE_WITHDRAW_PAYOUT_STATUSES.includes(status)))
    }).catch(() => {
      setHasOngoingWithdraw(false)
    })
  }

  useEffect(() => {
    if (!isProjectOwner || !isTiaProject || !projectRskEoa) {
      setHasOngoingWithdraw(false)
      return
    }

    void refetchActivePayout()
  }, [apolloClient, isProjectOwner, isTiaProject, project.id, projectRskEoa])

  const onCompleted = () => {
    refetchQueriesOnPayoutSuccess()
    queryProject.execute()
    void refetchWithdrawable()
    void refetchActivePayout()
  }

  return {
    payoutRskModal,
    projectRskEoa,
    withdrawableSats,
    withdrawableUsd,
    showWithdrawableBalance,
    isBelowMinWithdrawThreshold,
    hasOngoingWithdraw,
    showWithdraw,
    onCompleted,
  }
}
