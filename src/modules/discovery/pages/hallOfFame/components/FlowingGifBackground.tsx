import { Box, BoxProps } from '@chakra-ui/react'

import { HallOfFameAnimatedGifUrl } from '@/shared/constants'

export const FlowingGifBackground = (props: BoxProps) => {
  return (
    <Box
      position="absolute"
      left={0}
      top={0}
      width="full"
      height="full"
      backgroundImage={`url(${HallOfFameAnimatedGifUrl})`}
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      opacity="50%"
      mixBlendMode={'color-burn'}
      {...props}
    />
  )
}
