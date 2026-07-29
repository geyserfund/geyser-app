import { Box, VStack } from '@chakra-ui/react'
import { Outlet } from 'react-router'

import { dimensions } from '@/shared/constants/components/dimensions.ts'
import { standardPadding } from '@/shared/styles'

export const ProfileLayout = () => {
  return (
    <VStack w="full">
      <Box
        w="100%"
        overflowX="hidden"
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
