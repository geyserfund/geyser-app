import { StackProps, VStack } from '@chakra-ui/react'
import { HStack } from '@chakra-ui/react'
import { useAtomValue } from 'jotai'
import { PropsWithChildren } from 'react'

import { dimensions } from '@/shared/constants'
import { standardPadding } from '@/shared/styles'
import { discoveryPageCommonLayoutStyles } from '@/shared/styles/discoveryPageLayout'

import { isDiscoveryRoutesAtom } from '../../platformNavBar/platformNavBarAtom'

/** Wrap any top nav bar with this, to have it placed at the top, same palce as project navbar */
export const TopNavContainer = ({ children, ...props }: PropsWithChildren<StackProps>) => {
  const isPlatformRoutes = useAtomValue(isDiscoveryRoutesAtom)
  return (
    <HStack
      w="full"
      position="fixed"
      top={{ base: `${dimensions.topNavBar.mobile.height}px`, lg: `${dimensions.topNavBar.desktop.height}px` }}
      left={0}
      {...(isPlatformRoutes && discoveryPageCommonLayoutStyles)}
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
