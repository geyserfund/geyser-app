import { Box, VStack } from '@chakra-ui/react'
import { Outlet } from 'react-router'

import { Hero } from '@/modules/discovery/pages/landing/views/mainView/defaultView/sections/Hero.tsx'
import { dimensions } from '@/shared/constants/components/dimensions.ts'
import { UserExternalLinksComponent } from '@/shared/molecules/UserExternalLinks.tsx'
import { standardPadding } from '@/shared/styles'

export const Landing = () => {
  return (
    <VStack w="full" spacing={4} paddingTop={{ base: 1, lg: 3 }}>
      <Hero />

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
