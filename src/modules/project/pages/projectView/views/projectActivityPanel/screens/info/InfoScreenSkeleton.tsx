import { Box, HStack, VStack } from '@chakra-ui/layout'

import { SkeletonLayout } from '../../../../../../../../components/layouts'
import { useMobileMode } from '../../../../../../../../utils'
import { ActivityBriefSkeleton } from './ActivityBrief'

export const InfoScreenSkeleton = () => {
  const isMobile = useMobileMode()

  return (
    <VStack
      py={{ base: '0px', lg: '10px' }}
      spacing={4}
      width="100%"
      height="100%"
      overflowY="hidden"
      position="relative"
    >
      <ActivityBriefSkeleton />

      <VStack width="100%" spacing="20px" alignItems="center" overflow="hidden" flex="1">
        <HStack display="flex" marginBottom="10px" w="95%" spacing="5px">
          <Box w="50%">
            <SkeletonLayout w="100%" h="40px" />
          </Box>
          <Box w="50%">
            <SkeletonLayout w="100%" h="40px" />
          </Box>
        </HStack>
        <VStack
          spacing={'10px'}
          w="95%"
          overflow="auto"
          height={isMobile ? 'calc(100% - 44px)' : '100%'}
          paddingBottom="10px"
        >
          <SkeletonLayout width="100%" height="80px" />
          <SkeletonLayout width="100%" height="80px" />
          <SkeletonLayout width="100%" height="80px" />
          <SkeletonLayout width="100%" height="80px" />
        </VStack>
      </VStack>
    </VStack>
  )
}
