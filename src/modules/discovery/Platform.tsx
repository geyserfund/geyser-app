import { Box, VStack } from '@chakra-ui/react'
import { Outlet } from 'react-router'

import { dimensions } from '@/shared/constants'
import { standardPadding } from '@/styles'

import { DiscoveryBottomNav } from '../navigation/discoveryNav/DiscoveryBottomNav'
import { DiscoverySideNav } from '../navigation/discoveryNav/DiscoverySideNav'

export const Platform = () => {
  return (
    <>
      <DiscoverySideNav />
      <VStack
        w="full"
        h="full"
        paddingLeft={{
          base: 0,
          lg: dimensions.discovery.sideNav.tablet.width,
          '2xl': dimensions.discovery.sideNav.desktop.width,
        }}
      >
        <Box
          w="100%"
          height="100%"
          maxWidth={`${dimensions.maxWidth + 24 * 2}`}
          position="relative"
          paddingX={standardPadding}
          paddingBottom={{ base: 28, lg: 100 }}
        >
          <Outlet />
        </Box>
      </VStack>
      <DiscoveryBottomNav />
    </>
  )
}
