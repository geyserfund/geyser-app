import { VStack } from '@chakra-ui/react'
import { Outlet } from 'react-router'

import { dimensions } from '@/shared/constants/components/dimensions.ts'

import { useLastVisistedFollowedProjects } from '../../hooks/useLastVisited.ts'

export const Activity = () => {
  useLastVisistedFollowedProjects()

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
      <Outlet />
    </VStack>
  )
}
