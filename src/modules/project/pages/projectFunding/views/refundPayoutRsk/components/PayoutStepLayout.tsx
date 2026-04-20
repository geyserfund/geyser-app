import { VStack } from '@chakra-ui/react'
import { ReactNode } from 'react'

type PayoutStepLayoutProps = {
  notice?: ReactNode
  illustration: ReactNode
  content: ReactNode
  action: ReactNode
}

/** PayoutStepLayout: Wrapper for payout and refund step screens with notice, illustration, content, and action sections */
export const PayoutStepLayout = ({ notice, illustration, content, action }: PayoutStepLayoutProps) => {
  return (
    <VStack w="full" spacing={6} alignItems="center">
      {notice}
      {illustration}
      {content}
      {action}
    </VStack>
  )
}
