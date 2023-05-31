import { Box, BoxProps } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

export const SectionCard = (props: PropsWithChildren<BoxProps>) => {
  return (
    <Box
      my={4}
      display="flex"
      flexDir="column"
      width="100%"
      border="2px solid"
      borderColor="neutral.200"
      borderRadius="8px"
      boxSizing="border-box"
      {...props}
    />
  )
}
