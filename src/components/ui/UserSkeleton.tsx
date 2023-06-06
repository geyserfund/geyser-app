import { Box, BoxProps } from '@chakra-ui/react'

export const UserSkeleton = (props: BoxProps) => {
  return (
    <Box
      width="30px"
      height="30px"
      borderRadius="50%"
      backgroundColor="neutral.100"
      {...props}
    />
  )
}
