import { Box, BoxProps } from '@chakra-ui/react'

export const StatusLabel = ({ ...props }: BoxProps) => {
  return (
    <Box
      p={2}
      borderRadius="8px"
      textAlign="center"
      color="primary1.11"
      border="1px solid"
      borderColor="neutral1.6"
      fontSize="14px"
      fontWeight={700}
      {...props}
    />
  )
}
