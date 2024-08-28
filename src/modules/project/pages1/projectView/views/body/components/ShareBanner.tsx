import { Box, HStack, StackProps, VStack } from '@chakra-ui/react'

import { ImageWithReload } from '@/components/ui'
import { Body } from '@/shared/components/typography'
import { Maybe } from '@/types'

type ShareBannerProps = {
  aspectRatio: number
  bannerImage?: Maybe<string>
  bannerText: string
} & StackProps

export const ShareBanner = ({ aspectRatio, bannerImage, bannerText, ...rest }: ShareBannerProps) => {
  return (
    <VStack w="100%" position="relative" borderRadius="8px" overflow="hidden" {...rest}>
      <Box aspectRatio={aspectRatio} w="100%" overflow={'hidden'}>
        <ImageWithReload width="100%" height="100%" objectFit={'cover'} src={bannerImage} />
      </Box>

      <HStack
        position="absolute"
        bottom={0}
        backgroundColor="rgba(0, 0, 0, 0.70)"
        px={3}
        py={2}
        w="100%"
        justifyContent={'start'}
        zIndex={1}
      >
        <Body size="sm" medium color="utils.whiteContrast">
          {bannerText}
        </Body>
      </HStack>
    </VStack>
  )
}
