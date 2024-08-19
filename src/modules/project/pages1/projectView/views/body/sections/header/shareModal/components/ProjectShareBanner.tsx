import { Box, HStack, Image, VStack } from '@chakra-ui/react'
import { forwardRef } from 'react'
import { QRCode } from 'react-qrcode-logo'

import { Body } from '@/shared/components/typography'

import { lightModeColors } from '../../../../../../../../../../styles'

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
          <Image width="100%" height="100%" objectFit={'cover'} src={bannerImage} />
        </Box>
        <HStack
          aspectRatio={ASPECT_RATIO}
          width="100%"
          alignItems={'start'}
          justifyContent="right"
          paddingRight={4}
          paddingTop={4}
        >
          <VStack
            borderColor={'neutral.1000'}
            overflow={'hidden'}
            _hover={{ cursor: 'pointer' }}
            position="relative"
            backgroundColor="utils.whiteContrast"
            borderRadius={8}
            gap={0}
            pb={1}
          >
            <HStack
              background="white"
              padding="2px"
              position={'absolute'}
              top={`${(QR_SIZE - (LOGO_SIZE - 6) / 2) / 2}px`}
              left={`${(QR_SIZE - (LOGO_SIZE - 6) / 2) / 2}px`}
              borderRadius="8px"
              width={`${LOGO_SIZE + 4}px`}
              height={`${LOGO_SIZE + 4}px`}
            >
              <HStack width={`${LOGO_SIZE}px`} height={`${LOGO_SIZE}px`} borderRadius="8px" justifyContent="center">
                <img
                  alt="Geyser logo"
                  style={{
                    maxWidth: '100%',
                    height: '100%',
                  }}
                  src={centerLogo}
                />
              </HStack>
            </HStack>

            <QRCode
              qrStyle="dots"
              id={lightModeColors.neutral[1000]}
              size={QR_SIZE}
              bgColor={lightModeColors.neutral[0]}
              fgColor={lightModeColors.neutral[1000]}
              value={qrCodeValue}
              removeQrCodeBehindLogo={true}
            />
            <Body size="xs" light>
              {qrCodeText}
            </Body>
          </VStack>
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
