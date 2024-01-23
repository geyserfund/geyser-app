import { VStack } from '@chakra-ui/react'

import { PaymentsAndAccoutningList } from './PaymentsAndAccoutningList'

export const PaymentsAndAccounting = () => {
  return (
    <VStack alignItems="flex-start">
      <PaymentsAndAccoutningList />
    </VStack>
  )
}
