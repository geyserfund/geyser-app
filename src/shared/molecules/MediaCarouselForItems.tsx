import { VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { createUseStyles } from 'react-jss'

import { AppTheme } from '@/context'
import { Modal } from '@/shared/components/layouts'
import { Body } from '@/shared/components/typography'
import { UseModalReturn } from '@/shared/hooks'
import { MediaCarousel } from '@/shared/molecules/MediaCarousel'
import { fonts } from '@/shared/styles'

const useStyles = createUseStyles((theme: AppTheme) => ({
  currentClass: {
    fontFamily: fonts.cormorant,
    color: theme.colors.neutral1[9],
    fontSize: '20px',
    fontWeight: 500,
  },
  totalClass: {
    fontFamily: fonts.cormorant,
    color: theme.colors.neutral1[9],
    fontSize: '20px',
    fontWeight: 500,
  },
  ofClass: {
    fontFamily: fonts.cormorant,
    color: theme.colors.neutral1[9],
    fontSize: '20px',
    fontWeight: 500,
  },
}))

type MediaCarouselForItemsModalProps = {
  imageLinkList: string[]
  dataList: { name: string; description: string[] }[]
} & Omit<UseModalReturn<{ currentIndex: number }>, 'children'>

export const MediaCarouselForItemsModal = ({
  imageLinkList,
  dataList,
  ...modalProps
}: MediaCarouselForItemsModalProps) => {
  const classes = useStyles()
  const [currentIndex, setCurrentIndex] = useState<number>(modalProps.props?.currentIndex || 0)

  return (
    <Modal {...modalProps} size="lg" noClose isCentered={false}>
      <MediaCarousel
        links={imageLinkList}
        onSlideChange={(index) => {
          console.log('checking index', index)
          setCurrentIndex(index)
        }}
        wrapperProps={{
          backgroundColor: 'transparent',
          paddingBottom: '40px',
          height: { base: '400px', lg: '800px' },
        }}
        initialSlide={currentIndex}
        swiperProps={{
          style: { paddingBottom: '40px' },
          loop: true,
          pagination: {
            type: 'fraction',
            renderFraction(currentClass, totalClass) {
              return (
                '<span class="' +
                classes.currentClass +
                '"></span>' +
                '<span class="' +
                classes.ofClass +
                '"></span>' +
                '<span class="' +
                classes.totalClass +
                '"></span>'
              )
            },
            formatFractionCurrent: (current) => `${current} of  `,
            formatFractionTotal: (total) => total,
            currentClass: classes.currentClass,
            totalClass: classes.totalClass,
          },
        }}
      />
      <VStack w="full" fontFamily={fonts.cormorant} alignItems="flex-start">
        <Body size="xl" bold>
          {dataList[currentIndex]?.name}
        </Body>
        {dataList[currentIndex]?.description.map((item, index) => (
          <Body medium key={index}>
            {item}
          </Body>
        ))}
      </VStack>
    </Modal>
  )
}
