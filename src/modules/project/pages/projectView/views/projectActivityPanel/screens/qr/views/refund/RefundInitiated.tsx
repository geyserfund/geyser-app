import { VStack } from '@chakra-ui/react'

import { useRefundedSwapData } from '../../../../../../../../funding/state'
import { RefundProcessing, RefundSummary, SafeToDeleteNotice } from '../../../../../../../refund/components'

export const RefundInitiated = () => {
  const [refundedSwapData] = useRefundedSwapData()

  if (!refundedSwapData) {
    return null
  }

  return (
    <VStack h="full" w="full">
      <RefundProcessing />
      <RefundSummary />
      <SafeToDeleteNotice />
    </VStack>
  )
}
