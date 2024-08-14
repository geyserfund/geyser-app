import { StackProps } from '@chakra-ui/react'
import { HStack } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

import { dimensions } from '@/shared/constants'
import { standardPadding } from '@/styles'

/** Wrap any top nav bar with this, to have it placed at the top, same palce as project navbar */
export const TopNavContainer = ({ children, ...props }: PropsWithChildren<StackProps>) => {
  return (
    <HStack
      maxWidth={{ base: dimensions.maxWidth + 24, lg: dimensions.maxWidth + 48 }}
      w="full"
      position="fixed"
      top={{ base: `${dimensions.topNavBar.mobile.height}px`, lg: `${dimensions.topNavBar.desktop.height}px` }}
      paddingX={standardPadding}
      paddingBottom={4}
      background={'utils.pbg'}
      zIndex={3}
      {...props}
    >
      {children}
    </HStack>
  )
}
