import { VStack } from '@chakra-ui/react'

import { PaymentsAndAccoutningList } from './PaymentsAndAccoutningList'

export const PaymentsAndAccounting = () => {
  return (
    <VStack w="full" alignItems="flex-start">
      <PaymentsAndAccoutningList />
    </VStack>
  )
}
