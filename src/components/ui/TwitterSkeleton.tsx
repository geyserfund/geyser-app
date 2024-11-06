import { Box } from '@chakra-ui/react'
import { SkeletonCircle, SkeletonText } from '@chakra-ui/react'

export const TwitterSkeleton = () => {
  return (
    <Box
      minWidth="250px"
      maxWidth="450px"
      cursor="pointer"
      pointerEvents="auto"
      borderWidth="1px"
      borderRadius="12px"
      borderColor="neutral.200"
      overflow="hidden"
      padding="20px 40px"
      boxShadow="lg"
      bg="neutral.0"
    >
      <SkeletonCircle size="10" />
      <SkeletonText mt="4" noOfLines={4} spacing="4" />
    </Box>
  )
}
