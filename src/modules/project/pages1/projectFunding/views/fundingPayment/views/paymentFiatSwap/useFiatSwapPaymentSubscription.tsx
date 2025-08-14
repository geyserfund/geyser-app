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
        if (options.data.data?.paymentStatusUpdated.paymentType === PaymentType.FiatToLightningSwap) {
          if (options.data.data?.paymentStatusUpdated.status === PaymentStatus.Pending) {
            setFiatSwapStatus(FiatSwapStatus.processing)
          } else if (options.data.data?.paymentStatusUpdated.status === PaymentStatus.Failed) {
            setFiatSwapStatus(FiatSwapStatus.failed)
            setFiatFailureReason(options.data.data?.paymentStatusUpdated.failureReason || null)
          }
        }
      }
    },
  })
}
