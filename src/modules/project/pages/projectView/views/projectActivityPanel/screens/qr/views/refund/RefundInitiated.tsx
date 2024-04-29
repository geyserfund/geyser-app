import { useRefundedSwapData } from '../../../../../../../../funding/state'
import { RefundProcessing, RefundSummary, SafeToDeleteNotice } from '../../../../../../../refund/components'

export const RefundInitiated = () => {
  const [refundedSwapData] = useRefundedSwapData()

  if (!refundedSwapData) {
    return null
  }

  return (
    <>
      <RefundProcessing />
      <RefundSummary />
      <SafeToDeleteNotice />
    </>
  )
}
