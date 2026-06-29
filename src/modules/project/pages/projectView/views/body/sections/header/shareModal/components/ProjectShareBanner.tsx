import { Box, HStack, Image, StackProps, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import QRCodeStyling from 'qr-code-styling'
import { forwardRef, useEffect, useRef } from 'react'

import { Body } from '@/shared/components/typography'

import { lightModeColors } from '../../../../../../../../../../shared/styles'

interface Props {
  bannerImage: string
  qrCodeValue: string
  qrCodeText: string
  centerLogo: string
  banneText: string
}

const QR_SIZE = 120
const LOGO_SIZE = 24

const ASPECT_RATIO = 16 / 9

export const ProjectShareBanner = forwardRef<HTMLDivElement, Props>(
  ({ bannerImage, qrCodeValue, qrCodeText, banneText, centerLogo }, ref) => {
    return (
      <VStack ref={ref} w="100%" position="relative">
        <Box aspectRatio={ASPECT_RATIO} w="100%" position="absolute" top={0} left={0}>
          <Image width="100%" height="100%" objectFit={'cover'} src={bannerImage} alt={'share banner image'} />
        </Box>
        <HStack
          aspectRatio={ASPECT_RATIO}
          width="100%"
          alignItems={'start'}
          justifyContent="right"
          paddingRight={4}
          paddingTop={4}
        >
          <ProjectShareQrCodeComponent
            qrCodeValue={qrCodeValue}
            qrCodeText={qrCodeText}
            centerLogo={centerLogo}
            qrSize={QR_SIZE}
            logoSize={LOGO_SIZE}
          />
        </HStack>

        <HStack
          position="absolute"
          bottom={0}
          backgroundColor="rgba(0, 0, 0, 0.70)"
          px={3}
          height="32px"
          w="100%"
          justifyContent={'start'}
          zIndex={1}
        >
          <Body size="sm" medium color="utils.whiteContrast">
            {banneText}
          </Body>
        </HStack>
      </VStack>
    )
  },
)

export const ProjectShareQrCodeComponent = ({
  qrCodeValue,
  qrCodeText,
  centerLogo,
  qrSize,
  logoSize,
}: {
  qrCodeValue: string
  qrCodeText?: string
  centerLogo: string
  qrSize: number
  logoSize: number
} & StackProps) => {
  const qrContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const instance = new QRCodeStyling({
      type: 'svg',
      width: qrSize,
      height: qrSize,
      margin: 0,
      data: qrCodeValue,
      qrOptions: { errorCorrectionLevel: 'H' },
      backgroundOptions: { color: lightModeColors.utils.pbg },
      dotsOptions: { type: 'dots', color: lightModeColors.utils.text },
      cornersSquareOptions: { type: 'extra-rounded', color: lightModeColors.utils.text },
      cornersDotOptions: { color: lightModeColors.utils.text },
    })

    if (qrContainerRef.current) {
      qrContainerRef.current.replaceChildren()
      instance.append(qrContainerRef.current)
    }
  }, [qrSize, qrCodeValue])

  return (
    <VStack
      borderColor={'neutral.1000'}
      overflow={'hidden'}
      _hover={{ cursor: 'pointer' }}
      backgroundColor="utils.whiteContrast"
      borderRadius={8}
      gap={1}
      padding={2}
    >
      <Box position="relative" lineHeight={0}>
        <Box ref={qrContainerRef} role="img" aria-label={qrCodeText ?? t('QR code')} lineHeight={0} />
        <HStack
          background="utils.pbg"
          padding="2px"
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          borderRadius="8px"
          width={`${logoSize + 4}px`}
          height={`${logoSize + 4}px`}
        >
          <HStack width={`${logoSize}px`} height={`${logoSize}px`} borderRadius="8px" justifyContent="center">
            <img
              alt=""
              style={{
                maxWidth: '100%',
                height: '100%',
              }}
              src={centerLogo}
            />
          </HStack>
        </HStack>
      </Box>
      {qrCodeText && (
        <Body size="xs" light>
          {qrCodeText}
        </Body>
      )}
    </VStack>
  )
}
