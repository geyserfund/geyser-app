import { Skeleton, SkeletonProps } from '@chakra-ui/react'

export const SkeletonLayout = (props: SkeletonProps) => {
  return <Skeleton height="20px" width="100%" borderRadius="8px" {...props} />
}
