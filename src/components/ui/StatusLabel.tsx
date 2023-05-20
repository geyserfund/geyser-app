import { Box, BoxProps } from '@chakra-ui/react'

export const StatusLabel = ({ ...props }: BoxProps) => {
  return (
    <Box
      p={2}
      borderRadius="8px"
      backgroundColor="primary.100"
      textAlign="center"
      color="neutral.900"
      fontSize="14px"
      fontWeight={500}
      {...props}
    />
  )
}
