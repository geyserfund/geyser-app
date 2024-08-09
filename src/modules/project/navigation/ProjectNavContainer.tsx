import { HStack, StackProps } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

import { TopNavContainer } from './components/TopNavContainer'

/** Padding UI and background along with TopNavContainer, use it directly if custom ui is required at the position of navbar */
export const ProjectNavContainer = ({ children, ...props }: PropsWithChildren<StackProps>) => {
  return (
    <TopNavContainer {...props}>
      <HStack
        padding="2px"
        borderRadius={{ base: '10px', lg: '12px' }}
        backgroundColor="neutral1.3"
        w="full"
        justifyContent="space-between"
      >
        {children}
      </HStack>
    </TopNavContainer>
  )
}
