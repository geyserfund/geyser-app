import { VStack } from '@chakra-ui/react'
import { Outlet } from 'react-router'

import { DiscoveryBottomNav } from '../navigation/discoveryNav/DiscoveryBottomNav'

export const Discovery = () => {
  return (
    <>
      {/* <DiscoverySideNav /> */}
      <VStack w="full" h="full">
        <Outlet />
      </VStack>

      <DiscoveryBottomNav />
    </>
  )
}
