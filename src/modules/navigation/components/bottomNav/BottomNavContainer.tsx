import { Stack, StackProps } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

export const BottomNavBarContainer = ({ children, ...props }: PropsWithChildren<StackProps>) => {
  return (
    <Stack
      w="full"
      direction="row"
      padding={3}
      spacing={2}
      paddingBottom={6}
      display={{ base: 'flex', lg: 'none' }}
      position="fixed"
      bottom="0"
      backgroundColor={'utils.pbg'}
      borderTop="1px solid"
      borderColor={'neutral1.6'}
      marginX={'-12px'}
      zIndex={3}
      {...props}
    >
      {children}
    </Stack>
  )
}
