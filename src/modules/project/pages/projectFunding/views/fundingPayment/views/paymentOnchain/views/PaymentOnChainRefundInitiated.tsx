import { VStack } from '@chakra-ui/react'
import { useAtomValue } from 'jotai'

import { refundedSwapDataAtom } from '@/modules/project/funding/state'

import { RefundProcessing, SafeToDeleteNotice } from '../../../../refund/components'

export const PaymentOnChainRefundInitiated = () => {
  const refundedSwapData = useAtomValue(refundedSwapDataAtom)

  if (!refundedSwapData) {
    return null
  }

  return (
    <VStack h="full" w="full" spacing={6}>
      <RefundProcessing />
      <SafeToDeleteNotice />
    </VStack>
  )
}
