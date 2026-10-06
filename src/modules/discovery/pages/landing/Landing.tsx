import { Box, VStack } from '@chakra-ui/react'
import { Outlet, useLocation } from 'react-router'

import { PrimaryColorTrial } from '@/modules/discovery/pages/landing/components/PrimaryColorTrial.tsx'
import { Hero } from '@/modules/discovery/pages/landing/views/mainView/defaultView/sections/Hero.tsx'
import { dimensions } from '@/shared/constants/components/dimensions.ts'
import { __production__ } from '@/shared/constants/config/env.ts'
import { getPath } from '@/shared/constants/index.ts'
import { UserExternalLinksComponent } from '@/shared/molecules/UserExternalLinks.tsx'
import { standardPadding } from '@/shared/styles'

export const Landing = () => {
  const location = useLocation()
  const isLandingPage = location.pathname === getPath('discoveryLanding')

  return (
    <VStack w="full" spacing={4}>
      {isLandingPage ? <Hero /> : null}
      {/* Temporary design try-out; never shown in production. */}
      {isLandingPage && !__production__ ? <PrimaryColorTrial /> : null}

      <Box
        w="100%"
        maxWidth={`${dimensions.maxWidth + 24 * 2}px`}
        position="relative"
        paddingX={standardPadding}
        paddingBottom={{ base: 28, lg: 10 }}
      >
        <Outlet />
        <UserExternalLinksComponent />
      </Box>
    </VStack>
  )
}
