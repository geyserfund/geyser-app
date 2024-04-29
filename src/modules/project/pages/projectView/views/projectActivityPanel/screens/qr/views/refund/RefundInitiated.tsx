import { useEffect } from 'react'

import { useRefundedSwapData } from '../../../../../../../../funding/state'
import { RefundProcessing, RefundSummary, SafeToDeleteNotice } from '../../../../../../../refund/components'

export const RefundInitiated = ({ onCloseClick }: { onCloseClick: () => void }) => {
  const [refundedSwapData] = useRefundedSwapData()

  useEffect(() => {
    return () => {
      onCloseClick()
    }
  }, [])

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
