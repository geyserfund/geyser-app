import { Box, VStack } from '@chakra-ui/react'
import { Outlet } from 'react-router'

import { dimensions } from '@/shared/constants'
import { standardPadding } from '@/styles'

import { PlatformBottomNav } from '../navigation/platformNav/PlatformBottomNav'
import { PlatformSideNav } from '../navigation/platformNav/PlatformSideNav'

export const Platform = () => {
  return (
    <>
      <PlatformSideNav />
      <VStack
        w="full"
        h="full"
        paddingLeft={{
          base: 0,
          lg: dimensions.platform.sideNav.tablet.width,
          '2xl': dimensions.platform.sideNav.desktop.width,
        }}
      >
        <Box
          w="100%"
          height="100%"
          maxWidth={`${dimensions.maxWidth + 24 * 2}`}
          position="relative"
          paddingX={standardPadding}
        >
          <Outlet />
        </Box>
      </VStack>
      <PlatformBottomNav />
    </>
  )
}
