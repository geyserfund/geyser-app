import { Box, BoxProps, useColorModeValue } from '@chakra-ui/react'

/** Reusable card primitive for the launch start playbook sections. */
export const PlaybookCard = ({ children, ...props }: BoxProps) => {
  const backgroundColor = useColorModeValue('white', 'neutral1.3')
  const borderColor = useColorModeValue('neutral1.4', 'neutral1.5')

  return (
    <Box
      backgroundColor={backgroundColor}
      border="1px solid"
      borderColor={borderColor}
      borderRadius="16px"
      padding={{ base: 5, lg: 6 }}
      {...props}
    >
      {children}
    </Box>
  )
}
