import { VStack } from '@chakra-ui/react'
import { Outlet } from 'react-router'

import { Head } from '@/config/Head.tsx'
import { dimensions } from '@/shared/constants/components/dimensions.ts'

export const Activity = () => {
  return (
    <VStack
      h="full"
      paddingTop={{ base: `${dimensions.animatedNavBar.height.base}px`, lg: 0 }}
      width="full"
      alignItems="flex-start"
      spacing={4}
      borderTopRadius="xl"
      bg="neutralAlpha.1"
    >
      <Head
        title="Activity feed"
        description="See the latest global activity, updates, and contributions happening across Geyser."
        type="website"
      />
      <Outlet />
    </VStack>
  )
}
