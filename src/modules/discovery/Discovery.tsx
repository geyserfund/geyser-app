import { Box, VStack } from '@chakra-ui/react'
import { useEffect } from 'react'
import { Outlet, useSearchParams } from 'react-router'

import { useAuthContext } from '@/context/auth.tsx'
import { dimensions } from '@/shared/constants/components/dimensions.ts'
import { UserExternalLinksComponent } from '@/shared/molecules/UserExternalLinks.tsx'
import { standardPadding } from '@/shared/styles'

import { DiscoveryBottomNav } from '../navigation/discoveryNav/DiscoveryBottomNav'

export const Discovery = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { user } = useAuthContext()

  useEffect(() => {
    if (!user.heroId || searchParams.get('hero')) {
      return
    }

    const nextSearchParams = new URLSearchParams(searchParams)
    nextSearchParams.set('hero', user.heroId)
    setSearchParams(nextSearchParams, { replace: true })
  }, [user.heroId, searchParams, setSearchParams])

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
        >
          <Outlet />
          <UserExternalLinksComponent />
        </Box>
      </VStack>

      <DiscoveryBottomNav />
    </>
  )
}
