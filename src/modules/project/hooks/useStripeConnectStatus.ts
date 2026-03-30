import type { WatchQueryFetchPolicy } from '@apollo/client'
import { t } from 'i18next'

import { useProjectStripeConnectStatusQuery } from '@/types/index.ts'

type UseStripeConnectStatusProps = {
  projectId?: string | number | bigint
  isTiaProject: boolean
  fetchPolicy?: WatchQueryFetchPolicy
}

type StripeDisabledReason = 'requirements.past_due' | 'requirements.pending_verification' | 'under_review'

export type StripeStatusType = 'enabled' | 'action_required' | 'processing' | null

const STRIPE_DISABLED_REASONS = {
  pastDue: 'requirements.past_due',
  pendingVerification: 'requirements.pending_verification',
  underReview: 'under_review',
} as const

function getStripeStatusType(reason?: string | null, isReady?: boolean): StripeStatusType {
  if (isReady) return 'enabled'
  if (reason === STRIPE_DISABLED_REASONS.pastDue) return 'action_required'
  if (reason === STRIPE_DISABLED_REASONS.pendingVerification || reason === STRIPE_DISABLED_REASONS.underReview) {
    return 'processing'
  }

  return null
}

function getStripeDisabledReasonLabel(reason?: string | null) {
  if (!reason) return null

  const reasonMap: Record<StripeDisabledReason, string> = {
    [STRIPE_DISABLED_REASONS.pastDue]: t(
      'Stripe needs additional details to activate this account. Open Stripe Connect to continue.',
    ),
    [STRIPE_DISABLED_REASONS.pendingVerification]: t(
      'Stripe verification is still in progress. Please check again shortly.',
    ),
    [STRIPE_DISABLED_REASONS.underReview]: t('Stripe is reviewing this account.'),
  }

  if (reason in reasonMap) {
    return reasonMap[reason as StripeDisabledReason]
  }

  return t('Stripe requires additional action to activate this account.')
}

/** Returns derived Stripe Connect onboarding state for a project. */
export const useStripeConnectStatus = ({
  projectId,
  isTiaProject,
  fetchPolicy = 'cache-first',
}: UseStripeConnectStatusProps) => {
  const { data, loading, error, refetch } = useProjectStripeConnectStatusQuery({
    variables: { projectId },
    skip: !projectId || !isTiaProject,
    fetchPolicy,
  })

  const status = data?.projectStripeConnectStatus
  const isReady = Boolean(status?.isReady)
  const hasAccount = Boolean(status?.accountId)
  const statusType = getStripeStatusType(status?.disabledReason, isReady)
  const disabledReasonLabel = getStripeDisabledReasonLabel(status?.disabledReason)
  const isActionRequired = statusType === 'action_required'
  const isProcessing = statusType === 'processing'
  const isIncomplete = hasAccount && !isReady

  return {
    status,
    isReady,
    hasAccount,
    statusType,
    disabledReasonLabel,
    isActionRequired,
    isProcessing,
    isIncomplete,
    loading,
    error,
    refetch,
  }
}
