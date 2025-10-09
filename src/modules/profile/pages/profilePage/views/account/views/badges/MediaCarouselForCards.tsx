import { Button, Link, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useEffect, useMemo, useRef, useState } from 'react'
import { PiCopy, PiDownloadSimple } from 'react-icons/pi'
import { createUseStyles } from 'react-jss'

import { AppTheme } from '@/context'
import { useCreateAndCopyImage } from '@/modules/project/pages/projectView/hooks'
import { CustomModalProps, Modal } from '@/shared/components/layouts'
import { Body } from '@/shared/components/typography'
import { UseModalReturn } from '@/shared/hooks'
import { MediaCarousel } from '@/shared/molecules/MediaCarousel'
import { fonts } from '@/shared/styles'
import { useNotification } from '@/utils'

import { HeroCardDisplay } from '../HeroCardDisplay'
import { ImageComponentForCards } from './ImageComponentForCards'

const useStyles = createUseStyles((theme: AppTheme) => ({
  currentClass: {
    fontFamily: fonts.brand,
    color: theme.colors.neutral1[9],
    fontSize: '20px',
    fontWeight: 500,
  },
  totalClass: {
    fontFamily: fonts.brand,
    color: theme.colors.neutral1[9],
    fontSize: '20px',
    fontWeight: 500,
  },
  ofClass: {
    fontFamily: fonts.brand,
    color: theme.colors.neutral1[9],
    fontSize: '20px',
    fontWeight: 500,
  },
}))

type MediaCarouselForCardsModalProps = {
  imageLinkList: string[]
  dataList?: { name: string; description: string[] }[]
  description?: string
} & UseModalReturn<{ currentIndex: number }> &
  Omit<CustomModalProps, 'children'>

export const MediaCarouselForCards = ({
  imageLinkList,
  dataList,
  description,
  ...modalProps
}: MediaCarouselForCardsModalProps) => {
  const classes = useStyles()
  const toast = useNotification()

  const [currentIndex, setCurrentIndex] = useState<number>(modalProps.props?.currentIndex || 0)

  const [refElement, setRefElement] = useState<HTMLDivElement | null>(null)

  const [downloadUrl, setDownloadUrl] = useState<string>('')
  const [downloadLoading, setDownloadLoading] = useState<boolean>(false)

  const { handleGenerateAndCopy, copying, getObjectUrl } = useCreateAndCopyImage()

  const handleCopy = async () => {
    await handleGenerateAndCopy({
      element: refElement,
      onSuccess() {
        toast.success({
          title: 'Copied!',
          description: 'Ready to paste into Social media posts',
        })
      },
      onError() {
        toast.error({
          title: 'Failed to download image',
          description: 'Please try again',
        })
      },
    })
  }

  useEffect(() => {
    setDownloadLoading(true)
    setTimeout(async () => {
      const url = await getObjectUrl({
        element: refElement,
      })
      if (url) {
        setDownloadUrl(url)
      }

      setDownloadLoading(false)
    }, 1000)
  }, [refElement])

  const links = useMemo(() => {
    return [
      <RenderWithRef
        Component={HeroCardDisplay}
        currentIndex={currentIndex}
        index={0}
        setRefElement={setRefElement}
        key="hero-card-display"
      />,
      ...imageLinkList.map((item, index) => {
        return (
          <RenderWithRef
            Component={ImageComponentForCards}
            currentIndex={currentIndex}
            index={index + 1}
            setRefElement={setRefElement}
            key={`${index} + 1`}
            props={{ src: item, alt: `${item} image` }}
          />
        )
      }),
    ]
  }, [imageLinkList, currentIndex])

  return (
    <Modal size="lg" isCentered={false} {...modalProps}>
      {description && <Body size="sm">{description}</Body>}
      <MediaCarousel
        links={links}
        altText={'carousel card image'}
        onSlideChange={(index) => {
          setCurrentIndex(index)
        }}
        wrapperProps={{
          backgroundColor: 'transparent',
          height: { base: '400px', lg: '400px' },
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

      <VStack w="full">
        <Button
          size="lg"
          variant="solid"
          colorScheme="primary1"
          w="100%"
          rightIcon={<PiCopy />}
          onClick={handleCopy}
          isLoading={copying}
        >
          {t('Copy card')}
        </Button>
        <Button
          as={Link}
          download={'hero-card.png'}
          href={downloadUrl}
          size="lg"
          variant="outline"
          colorScheme="neutral1"
          w="100%"
          rightIcon={<PiDownloadSimple />}
          isLoading={downloadLoading}
          isDisabled={!downloadUrl}
        >
          {t('Download')}
        </Button>
      </VStack>
    </Modal>
  )
}

export const RenderWithRef = ({
  Component,
  currentIndex,
  index,
  setRefElement,
  props,
}: {
  Component: React.ComponentType<any>
  currentIndex: number
  index: number
  setRefElement: (element: HTMLDivElement) => void
  props?: any
}) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (currentIndex === index && ref.current) {
      setRefElement(ref.current)
    }
  }, [currentIndex, index, setRefElement])

  return <Component ref={ref} {...props} />
}
