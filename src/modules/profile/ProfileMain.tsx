import { Box, VStack } from '@chakra-ui/react'
import { Outlet } from 'react-router'

import { dimensions } from '@/shared/constants'
import { standardPadding } from '@/shared/styles'

export const ProfileMain = () => {
  return (
    <VStack w="full" h="full">
      <Box
        w="100%"
        height="100%"
        overflow="hidden"
        maxWidth={`${dimensions.maxWidth + 24 * 2}`}
        position="relative"
        paddingX={standardPadding}
        paddingBottom={10}
      >
        <Outlet />
      </Box>
    </VStack>
  )
}
