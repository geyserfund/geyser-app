import { StackProps, VStack } from '@chakra-ui/react'
import { HStack } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

import { dimensions } from '@/shared/constants/components/dimensions.ts'
import { standardPadding } from '@/shared/styles'

/** Wrap any top nav bar with this, to have it placed at the top, same palce as project navbar */
export const TopNavContainer = ({ children, ...props }: PropsWithChildren<StackProps>) => {
  return (
    <HStack
      w="full"
      position="fixed"
      top={{ base: `${dimensions.topNavBar.mobile.height}px`, lg: `${dimensions.topNavBar.desktop.height}px` }}
      left={0}
      justifyContent={'center'}
      zIndex={9}
      {...props}
    >
      <VStack
        paddingX={standardPadding}
        paddingBottom={4}
        maxWidth={{ base: dimensions.maxWidth + 24, lg: dimensions.maxWidth + 48 }}
        width="100%"
        backgroundColor={'utils.pbg'}
        justifySelf={'center'}
        spacing={4}
      >
        {children}
      </VStack>
    </HStack>
  )
}
