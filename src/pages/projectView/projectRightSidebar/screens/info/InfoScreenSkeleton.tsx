import { Box, HStack, VStack } from '@chakra-ui/layout'
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'

import { useMobileMode } from '../../../../../utils'

export const InfoScreenSkeleton = () => {
  const isMobile = useMobileMode()

  return (
    <VStack
      padding={isMobile ? '10px 5px 0px 5px' : '10px 20px'}
      spacing="15px"
      width="100%"
      height="100%"
      overflowY="hidden"
      position="relative"
    >
      <SkeletonText noOfLines={3} width="185px" />
      <SkeletonCircle height="208px" width="208px" marginY="30px" />
      <Skeleton height="40px" width="100%" />

      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        overflow="hidden"
        flex="1"
      >
        <HStack display="flex" marginBottom="10px" w="95%" spacing="5px">
          <Box w="50%">
            <Skeleton w="100%" h="40px" />
          </Box>
          <Box w="50%">
            <Skeleton w="100%" h="40px" />
          </Box>
        </HStack>
        <VStack
          spacing={'8px'}
          w="95%"
          overflow="auto"
          height={isMobile ? 'calc(100% - 44px)' : '100%'}
          paddingBottom="10px"
        >
          <Skeleton width="100%" height="80px" />
          <Skeleton width="100%" height="80px" />
          <Skeleton width="100%" height="80px" />
          <Skeleton width="100%" height="80px" />
        </VStack>
      </Box>
    </VStack>
  )
}
