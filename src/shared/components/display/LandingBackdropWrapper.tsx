import { Box, BoxProps } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

import { LandingDescriptionBackdropUrl } from '@/shared/constants/index.ts'

export const LandingBackdropWrapper = ({ children, ...rest }: PropsWithChildren<BoxProps>) => {
  return (
    <Box
      w="full"
      paddingX={6}
      paddingY={6}
      borderRadius="22px"
      backgroundImage={`linear-gradient(0deg, rgba(237, 255, 254, 0.33) 0%, rgba(237, 255, 254, 0.33) 100%), url(${LandingDescriptionBackdropUrl})`}
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      backgroundBlendMode="color-burn"
      backgroundColor="overlay.white.10"
      {...rest}
    >
      {children}
    </Box>
  )
}
