import { Box, VStack } from '@chakra-ui/react'
import { Outlet, useLocation } from 'react-router'

import { Hero } from '@/modules/discovery/pages/landing/views/mainView/defaultView/sections/Hero.tsx'
import { getPath } from '@/shared/constants/index.ts'
import { dimensions } from '@/shared/constants/components/dimensions.ts'
import { UserExternalLinksComponent } from '@/shared/molecules/UserExternalLinks.tsx'
import { standardPadding } from '@/shared/styles'

export const Landing = () => {
  const location = useLocation()
  const isLandingPage = location.pathname === getPath('discoveryLanding')

  return (
    <VStack w="full" spacing={4}>
      {isLandingPage ? <Hero /> : null}

      <Box
        w="100%"
        maxWidth={`${dimensions.maxWidth + 24 * 2}`}
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
