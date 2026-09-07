import { HStack } from '@chakra-ui/react'
import type { PropsWithChildren } from 'react'

export const BalanceSummaryRow = ({ children }: PropsWithChildren) => (
  <HStack w="full" justifyContent="space-between">
    {children}
  </HStack>
)
