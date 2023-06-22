import { Stack, StackDivider, StackProps } from '@chakra-ui/react'

import { useMobileMode } from '../../utils'

type Props = StackProps

export const CardsStackLayout = ({ children, ...props }: Props) => {
  const isMobile = useMobileMode()
  return (
    <Stack
      divider={
        isMobile ? (
          <StackDivider borderWidth="1px" color="neutral.200" />
        ) : undefined
      }
      p={{ base: '0 0 75px 0', lg: '0 40px 70px 40px' }}
      spacing={{ base: 0, lg: 3 }}
      mt={{ base: 0, lg: 5 }}
      maxWidth="1000px"
      w="100%"
      {...props}
    >
      {children}
    </Stack>
  )
}
