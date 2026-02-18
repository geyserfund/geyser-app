import { useSetAtom } from 'jotai'

import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { PaymentStatus, PaymentType, usePaymentStatusUpdatedSubscription } from '@/types/index.ts'
import { ProjectFundingStrategy } from '@/types/index.ts'

import { fiatFailureReasonAtom, FiatSwapStatus, fiatSwapStatusAtom } from './atom/fiatSwapStatusAtom.ts'

export const useFiatSwapPaymentSubscription = ({ contributionUUID }: { contributionUUID?: string | null }) => {
  const { project } = useProjectAtom()
  const setFiatSwapStatus = useSetAtom(fiatSwapStatusAtom)
  const setFiatFailureReason = useSetAtom(fiatFailureReasonAtom)
  const isAonProject = project?.fundingStrategy === ProjectFundingStrategy.AllOrNothing
  usePaymentStatusUpdatedSubscription({
    skip: !contributionUUID,
    variables: {
      input: {
        contributionUUID,
      },
    },
    onData(options) {
      if (options.data.data?.paymentStatusUpdated) {
        const statusUpdated = options.data.data.paymentStatusUpdated
        const isFiatToLightningSwap = statusUpdated.paymentType === PaymentType.FiatToLightningSwap
        const isLightningToRskSwap = statusUpdated.paymentType === PaymentType.LightningToRskSwap

        if (isFiatToLightningSwap && statusUpdated.status === PaymentStatus.Pending) {
          setFiatSwapStatus(FiatSwapStatus.processing)
          setFiatFailureReason(null)
          return
        }

        // AON uses fiat->lightning then lightning->RSK, so keep pending after fiat leg succeeds.
        if (isAonProject && isFiatToLightningSwap && statusUpdated.status === PaymentStatus.Paid) {
          setFiatSwapStatus(FiatSwapStatus.pending)
          setFiatFailureReason(null)
          return
        }

        // Non-AON fiat flow completes at fiat->lightning payment.
        if (!isAonProject && isFiatToLightningSwap && statusUpdated.status === PaymentStatus.Paid) {
          setFiatSwapStatus(FiatSwapStatus.success)
          setFiatFailureReason(null)
          return
        }

        if (isAonProject && isLightningToRskSwap && statusUpdated.status === PaymentStatus.Pending) {
          setFiatSwapStatus(FiatSwapStatus.pending)
          setFiatFailureReason(null)
          return
        }

        if (isAonProject && isLightningToRskSwap && statusUpdated.status === PaymentStatus.Paid) {
          setFiatSwapStatus(FiatSwapStatus.success)
          setFiatFailureReason(null)
          return
        }

        if (
          (isFiatToLightningSwap || isLightningToRskSwap) &&
          statusUpdated.status === PaymentStatus.Failed
        ) {
          setFiatSwapStatus(FiatSwapStatus.failed)
          setFiatFailureReason(statusUpdated.failureReason || null)
        }
      }
    },
  })
}
