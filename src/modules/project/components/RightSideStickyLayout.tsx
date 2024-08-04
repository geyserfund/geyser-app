import { StackProps, VStack } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

import { dimensions } from '@/shared/constants'

export const RightSideStickyLayout = ({ children, ...props }: PropsWithChildren<StackProps>) => {
  return (
    <VStack
      position="sticky"
      top={{
        base: `${dimensions.projectNavBar.mobile.height}px`,
        lg: `${dimensions.projectNavBar.desktop.height}px`,
      }}
      height={`calc(100vh - ${dimensions.topNavBar.desktop.height + dimensions.projectNavBar.desktop.height}px)`}
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
