import { VStack } from '@chakra-ui/react'
import { ReactNode } from 'react'

type PayoutStepLayoutProps = {
  notice?: ReactNode
  illustration: ReactNode
  content: ReactNode
  action: ReactNode
}

export function PayoutStepLayout({ notice, illustration, content, action }: PayoutStepLayoutProps) {
  return (
    <VStack w="full" spacing={6} alignItems="center">
      {notice}
      {illustration}
      {content}
      {action}
    </VStack>
  )
}
