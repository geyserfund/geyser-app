// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import { Box, BoxProps } from '@chakra-ui/react'
import { createUseStyles } from 'react-jss'
import { Keyboard, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react'

import { AppTheme } from '@/context'

import { ImageCropAspectRatio } from './ImageCropperModal'
import { RenderImageOrVideo } from './RenderImageOrVideo'

const useStyles = createUseStyles(({ colors }: AppTheme) => ({
  swiper: {
    '&:hover': {
      '& .swiper-button-next': {
        opacity: 1,
      },

      '& .swiper-button-prev': {
        opacity: 1,
      },
      '& .swiper-button-disabled': {
        opacity: 0.1,
      },
    },
    '& .swiper-button-disabled': {
      opacity: 0,
    },

    '& .swiper-pagination-bullets-dynamic': {
      padding: '8px',
      borderRadius: '16px',
      backgroundColor: 'rgba(0, 0, 0, 0.60)',
    },
    '& .swiper-button-next': {
      opacity: 0,
      transition: 'opacity 0.2s',
      '&::after': {
        padding: '8px 8px 8px 9px',
        borderRadius: '12px',
        fontSize: '32px',
        color: colors.utils.whiteContrast,
        backgroundColor: 'rgba(0, 0, 0, 0.50)',
      },
      '&:hover': {
        '&::after': {
          backgroundColor: 'rgba(0, 0, 0, 0.60)',
        },
      },
    },
    '& .swiper-button-prev': {
      opacity: 0,
      transition: 'opacity 0.2s',
      '&::after': {
        padding: '8px 9px 8px 8px',
        borderRadius: '12px',
        fontSize: '32px',
        color: colors.utils.whiteContrast,
        backgroundColor: 'rgba(0, 0, 0, 0.50)',
      },
      '&:hover': {
        '&::after': {
          backgroundColor: 'rgba(0, 0, 0, 0.60)',
        },
      },
    },

    '& .swiper-pagination-bullet': {
      background: colors.utils.whiteContrast,
    },
    '& .swiper-pagination-bullet-active': {
      background: colors.utils.whiteContrast,
    },
  },
}))

export type CarouselItem = string | React.ReactNode

type MediaCarouselProps = {
  links: CarouselItem[]
  aspectRatio?: ImageCropAspectRatio
  wrapperProps?: Omit<BoxProps, 'aspectRatio'>
  onSlideChange?: (index: number) => void
  initialSlide?: number
  swiperProps?: SwiperProps
  altText?: string
} & BoxProps
export const MediaCarousel = ({
  links,
  aspectRatio = ImageCropAspectRatio.Header,
  wrapperProps,
  onSlideChange,
  initialSlide,
  swiperProps,
  altText,
  ...rest
}: MediaCarouselProps) => {
  const classes = useStyles()

  return (
    <Box w="100%" overflow="hidden" {...rest}>
      <Swiper
        className={classes.swiper}
        keyboard={{
          enabled: true,
        }}
        pagination={{
          dynamicBullets: true,
        }}
        navigation={{ enabled: true }}
        modules={[Keyboard, Pagination, Navigation]}
        spaceBetween={10}
        slidesPerView={1}
        onSlideChange={(swiper) => {
          onSlideChange?.(swiper.realIndex)
        }}
        initialSlide={initialSlide}
        {...swiperProps}
      >
        {links.map((link, index) => {
          return (
            <SwiperSlide key={index}>
              {typeof link === 'string' ? (
                <RenderImageOrVideo
                  link={link}
                  borderRadius={0}
                  aspectRatio={aspectRatio}
                  imageProps={{ alt: `${altText}-${index}-carousel` }}
                  {...wrapperProps}
                />
              ) : (
                link
              )}
            </SwiperSlide>
          )
        })}
      </Swiper>
    </Box>
  )
}
