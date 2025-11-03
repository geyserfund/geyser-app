import { Box, VStack } from '@chakra-ui/react'
import { Outlet } from 'react-router'

import { dimensions } from '@/shared/constants/components/dimensions.ts'
import { UserExternalLinksComponent } from '@/shared/molecules/UserExternalLinks.tsx'
import { standardPadding } from '@/shared/styles'

import { DiscoveryBottomNav } from '../navigation/discoveryNav/DiscoveryBottomNav'

export const Discovery = () => {
  return (
    <>
      {/* <DiscoverySideNav /> */}
      <VStack w="full" h="full">
        <Box
          w="100%"
          maxWidth={`${dimensions.maxWidth + 24 * 2}`}
          position="relative"
          paddingX={standardPadding}
          paddingBottom={{ base: 28, lg: 10 }}
          paddingTop={{ base: 2, lg: 6 }}
        >
          <Outlet />
          <UserExternalLinksComponent />
        </Box>
      </VStack>

      <DiscoveryBottomNav />
    </>
  )
}
