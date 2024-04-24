import { useEffect } from 'react'

import { useRefundedSwapData } from '../../../../../../../../funding/state'
import { RefundProcessing, RefundSummary, SafeToDeleteNotice } from '../../../../../../../refund/components'
import { useShowContributionInfoBoxSet } from '../../states'

export const RefundInitiated = () => {
  const [refundedSwapData] = useRefundedSwapData()

  const setShowContributionInfoBox = useShowContributionInfoBoxSet()

  useEffect(() => {
    setShowContributionInfoBox(false)

    return () => {
      setShowContributionInfoBox(true)
    }
  }, [setShowContributionInfoBox])

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
