import { useSetAtom } from 'jotai'

import { PaymentStatus, PaymentType, usePaymentStatusUpdatedSubscription } from '@/types/index.ts'

import { fiatFailureReasonAtom, FiatSwapStatus, fiatSwapStatusAtom } from './atom/fiatSwapStatusAtom.ts'

export const useFiatSwapPaymentSubscription = ({ contributionUUID }: { contributionUUID?: string | null }) => {
  const setFiatSwapStatus = useSetAtom(fiatSwapStatusAtom)
  const setFiatFailureReason = useSetAtom(fiatFailureReasonAtom)
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

        if (
          statusUpdated.paymentType === PaymentType.FiatToLightningSwap &&
          statusUpdated.status === PaymentStatus.Pending
        ) {
          setFiatSwapStatus(FiatSwapStatus.processing)
          return
        }

        if (
          (statusUpdated.paymentType === PaymentType.FiatToLightningSwap ||
            statusUpdated.paymentType === PaymentType.LightningToRskSwap) &&
          statusUpdated.status === PaymentStatus.Failed
        ) {
          setFiatSwapStatus(FiatSwapStatus.failed)
          setFiatFailureReason(statusUpdated.failureReason || null)
        }
      }
    },
  })
}
