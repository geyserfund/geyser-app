import { Box, BoxProps, forwardRef, HStack, Icon, IconButton, ImageProps } from '@chakra-ui/react'
import { PiArrowLeft, PiArrowRight, PiStarFill, PiTrash } from 'react-icons/pi'

import { ImageWithReload } from '@/shared/components/display/ImageWithReload'
import { Body } from '@/shared/components/typography'
import { dimensions } from '@/shared/constants/components/dimensions.ts'
import { validateImageUrl } from '@/shared/markdown/validations/image'
import { ImageCropAspectRatio } from '@/shared/molecules/ImageCropperModal'
import { lightModeColors } from '@/shared/styles'
import { getVimeoThumbailFromLink, getYoutubeThumbailFromLink } from '@/shared/utils/formatData/videoTools'

import { VideoPlayer } from './VideoPlayer'

export type RenderImageOrVideoProps = {
  link: string
  enableDrag?: boolean
  showStar?: boolean
  onDelete?: (link: string) => void
  aspectRatio?: number
  imageProps?: ImageProps
} & BoxProps

export const RenderImageOrVideo = forwardRef(
  ({ link, enableDrag, onDelete, aspectRatio, showStar, imageProps, ...rest }: RenderImageOrVideoProps, ref) => {
    const isImage = validateImageUrl(link)

    const youtubeThumbnail = getYoutubeThumbailFromLink(link)

    const vimeoThumbnail = getVimeoThumbailFromLink(link)

    const objectFit = enableDrag ? 'cover' : 'contain'

    return (
      <Box
        ref={ref}
        key={link}
        width="full"
        height="auto"
        maxHeight={aspectRatio ? 'none' : dimensions.project.header.maxHeight}
        aspectRatio={aspectRatio || ImageCropAspectRatio.Header}
        backgroundColor={'neutralAlpha.3'}
        borderRadius="8px"
        position="relative"
        overflow={'hidden'}
        {...rest}
      >
        {onDelete && (
          <IconButton
            aria-label="delete-image"
            position="absolute"
            size="sm"
            top={2}
            right={2}
            icon={<Icon as={PiTrash} />}
            onClick={() => onDelete(link)}
            variant="solid"
            colorScheme="error"
            zIndex={1}
          />
        )}
        {showStar && (
          <HStack
            position="absolute"
            top={1}
            left={1}
            backgroundColor={`${lightModeColors.neutral1[6]}44`}
            justifyContent={'center'}
            alignItems="center"
            padding={1}
            borderRadius={'6px'}
          >
            <Icon as={PiStarFill} color={'utils.whiteContrast'} />
          </HStack>
        )}
        {enableDrag && (
          <HStack
            w="full"
            h="full"
            backgroundColor="blackAlpha.800"
            opacity={0}
            _hover={{ opacity: 1 }}
            justifyContent="center"
            alignItems="center"
            position="absolute"
            top={0}
            left={0}
            color="white"
          >
            <Icon as={PiArrowLeft} fontSize={'24px'} />
            <Body size="2xl" bold paddingBottom={3}>
              .
            </Body>
            <Icon as={PiArrowRight} fontSize={'24px'} />
          </HStack>
        )}
        {isImage || enableDrag ? (
          <ImageWithReload
            width="100%"
            height="100%"
            objectFit={objectFit}
            src={isImage ? link : youtubeThumbnail || vimeoThumbnail || undefined}
            userSelect={'none'}
            {...imageProps}
          />
        ) : (
          <VideoPlayer url={link} />
        )}
      </Box>
    )
  },
)
