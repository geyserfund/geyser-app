import { Box, HStack, Skeleton, SkeletonCircle, SkeletonText, Stack, VStack } from '@chakra-ui/react'

export function ApplicationsTableSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <VStack align="stretch" spacing={3}>
      {Array.from({ length: rows }).map((_, idx) => (
        <HStack key={idx} spacing={4} p={3} borderWidth="1px" borderColor="neutral1.6" borderRadius="md">
          <SkeletonCircle size="10" />
          <Box flex={1}>
            <SkeletonText noOfLines={2} spacing={2} skeletonHeight={3} />
          </Box>
          <Skeleton height="20px" width="80px" borderRadius="md" />
          <Skeleton height="20px" width="100px" borderRadius="md" />
          <Skeleton height="32px" width="32px" borderRadius="md" />
        </HStack>
      ))}
    </VStack>
  )
}

export function KpiTilesSkeleton() {
  return (
    <Stack direction={{ base: 'column', sm: 'row' }} spacing={3}>
      {Array.from({ length: 4 }).map((_, idx) => (
        <Skeleton key={idx} height="116px" flex={1} borderRadius="md" />
      ))}
    </Stack>
  )
}
