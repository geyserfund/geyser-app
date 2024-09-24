// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import { Box } from '@chakra-ui/react'
import { createUseStyles } from 'react-jss'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { AppTheme } from '@/context'

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
      background: colors.neutral1[1],
    },
    '&. swiper-pagination-bullet-active': {
      background: colors.utils.whiteContrast,
    },
  },
}))

export const MediaCarousel = ({ links }: { links: string[] }) => {
  const classes = useStyles()
  return (
    <Box w="100%" overflow="hidden">
      <Swiper
        className={classes.swiper}
        pagination={{
          dynamicBullets: true,
        }}
        navigation={{ enabled: true }}
        modules={[Pagination, Navigation]}
        spaceBetween={10}
        slidesPerView={1}
      >
        {links.map((link) => {
          return (
            <SwiperSlide key={link}>
              <RenderImageOrVideo link={link} borderRadius={0} />
            </SwiperSlide>
          )
        })}
      </Swiper>
    </Box>
  )
}
