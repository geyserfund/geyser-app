import { Stack, StackProps } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

export const BottomNavBarContainer = ({ children, ...props }: PropsWithChildren<StackProps>) => {
  return (
    <Stack
      w="full"
      direction="row"
      padding={3}
      spaicng={2}
      display={{ base: 'flex', lg: 'none' }}
      position="fixed"
      bottom="0"
      backgroundColor={'neutral1.1'}
      borderTop="1px solid"
      borderColor={'neutral1.6'}
      marginX={'-12px'}
      {...props}
    >
      {children}
    </Stack>
  )
}
