import { Box, VStack } from '@chakra-ui/react'
import { Outlet } from 'react-router'

import { dimensions } from '@/shared/constants'
import { standardPadding } from '@/shared/styles'
import { discoveryPageCommonLayoutStyles } from '@/shared/styles/discoveryPageLayout'

import { DiscoveryBottomNav } from '../navigation/discoveryNav/DiscoveryBottomNav'
import { DiscoverySideNav } from '../navigation/discoveryNav/DiscoverySideNav'

export const Discovery = () => {
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
        >
          <Outlet />
        </Box>
      </VStack>
      <DiscoveryBottomNav />
    </>
  )
}
