import { HStack, StackProps } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

import { TopNavContainer } from './TopNavContainer'

/** Row layout inside TopNavContainer; use TopNavContainer directly if custom UI is required at the position of the navbar. */
export const TopNavContainerBar = ({ children, ...props }: PropsWithChildren<StackProps>) => {
  return (
    <TopNavContainer {...props}>
      <HStack w="full" justifyContent="space-between">
        {children}
      </HStack>
    </TopNavContainer>
  )
}
