import { Box, HStack, StackProps, VStack } from '@chakra-ui/react'
import { Emoji } from 'emoji-picker-react'

import { ImageWithReload } from '@/shared/components/display/ImageWithReload'
import { Body } from '@/shared/components/typography'
import { Maybe } from '@/types'

type ShareBannerProps = {
  aspectRatio: number
  bannerImage?: Maybe<string>
  bannerText: string
  emoji?: string
} & StackProps

export const ShareBanner = ({ aspectRatio, bannerImage, bannerText, emoji, ...rest }: ShareBannerProps) => {
  return (
    <VStack w="100%" position="relative" borderRadius="8px" overflow="hidden" {...rest}>
      <Box aspectRatio={aspectRatio} w="100%" overflow={'hidden'}>
        <ImageWithReload width="100%" height="100%" objectFit={'cover'} src={bannerImage} alt={'share banner image'} />
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
        {emoji && <Emoji size={16} unified={emoji} />}
        <Body size="sm" medium color="utils.whiteContrast">
          {bannerText}
        </Body>
      </HStack>
    </VStack>
  )
}
