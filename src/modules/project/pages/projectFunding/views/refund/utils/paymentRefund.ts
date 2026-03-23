import { SwapData } from '@/modules/project/funding/state/swapAtom.ts'
import { Payment } from '@/types/index.ts'

export const getRefundFileFromPayment = (payment: Payment): SwapData | undefined => {
  const paymentDetails = payment.paymentDetails

  if (
    paymentDetails?.__typename !== 'OnChainToLightningSwapPaymentDetails' &&
    paymentDetails?.__typename !== 'OnChainToRskSwapPaymentDetails'
  ) {
    return undefined
  }

  try {
    return JSON.parse(paymentDetails.swapMetadata) as SwapData
  } catch {
    return undefined
  }
}
