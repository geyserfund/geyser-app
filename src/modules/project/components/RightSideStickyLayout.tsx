import { StackProps, VStack } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

import { derivedDimensions, dimensions } from '@/shared/constants/components/dimensions.ts'

export const RightSideStickyLayout = ({ children, ...props }: PropsWithChildren<StackProps>) => {
  return (
    <VStack
      position="sticky"
      top={{
        base: `${dimensions.projectNavBar.mobile.height}px`,
        lg: `${dimensions.projectNavBar.desktop.height}px`,
      }}
      height={derivedDimensions.heightAfterTopNavBar}
      display={{ base: 'none', lg: 'flex' }}
      width="full"
      maxWidth={dimensions.project.rightSideNav.width}
      justifyContent="start"
      paddingBottom={10}
      {...props}
    >
      {children}
    </VStack>
  )
}
