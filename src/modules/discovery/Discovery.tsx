import { Box, VStack } from '@chakra-ui/react'
import { useAtomValue } from 'jotai'
import { Outlet } from 'react-router'

import { dimensions } from '@/shared/constants'
import { standardPadding } from '@/shared/styles'
import { discoveryPageCommonLayoutStyles } from '@/shared/styles/discoveryPageLayout'
import { toPx } from '@/utils'

import { DiscoveryBottomNav } from '../navigation/discoveryNav/DiscoveryBottomNav'
import { DiscoverySideNav } from '../navigation/discoveryNav/DiscoverySideNav'
import { isLandingPageRouteAtom } from '../navigation/topNavBar/topNavBarAtom'

export const Discovery = () => {
  const isLandingPageRoute = useAtomValue(isLandingPageRouteAtom)
  return (
    <>
      <DiscoverySideNav />
      <VStack w="full" h="full" {...discoveryPageCommonLayoutStyles}>
        <Box
          w="100%"
          maxWidth={`${dimensions.maxWidth + 24 * 2}`}
          position="relative"
          paddingX={standardPadding}
          paddingBottom={{ base: 28, lg: 10 }}
          paddingTop={{
            base: isLandingPageRoute ? toPx(dimensions.topNavBarFilterOffset.mobile.height) : 0,
            lg: 0,
          }}
        >
          <Outlet />
        </Box>
      </VStack>
      <DiscoveryBottomNav />
    </>
  )
}
