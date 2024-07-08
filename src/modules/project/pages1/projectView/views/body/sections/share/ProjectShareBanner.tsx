import { Box, HStack, Image, VStack } from '@chakra-ui/react'
import { forwardRef } from 'react'
import { QRCode } from 'react-qrcode-logo'

import { Body } from '@/shared/components/typography'
import { useCustomTheme } from '@/utils'

import { lightModeColors } from '../../../../../../../../styles'

interface Props {
  bannerImage: string
  qrCodeValue: string
  qrCodeText: string
  centerLogo: string
}

const QR_SIZE = 120

export const ProjectShareBanner = forwardRef<HTMLDivElement, Props>(
  ({ bannerImage, qrCodeValue, qrCodeText, centerLogo }, ref) => {
    const { colors } = useCustomTheme()

    return (
      <VStack ref={ref} w="100%" position="relative">
        <Box height="200px" w="100%" position="absolute" top={0} left={0}>
          <Image width="100%" height="100%" objectFit={'cover'} src={bannerImage} />
        </Box>
        <HStack height="200px" width="100%" alignItems={'center'} justifyContent="right" paddingRight="4">
          <VStack
            borderColor={'neutral.1000'}
            overflow={'hidden'}
            _hover={{ cursor: 'pointer' }}
            position="relative"
            backgroundColor="utils.whiteContrast"
            borderRadius={8}
            gap={0}
          >
            <HStack
              background="white"
              padding="3px"
              position={'absolute'}
              top={(QR_SIZE - 23) / 2}
              left={(QR_SIZE - 23) / 2}
            >
              <img
                alt="Geyser logo"
                style={{
                  maxWidth: 46,
                  height: 46,
                  padding: '10px',
                  backgroundColor: colors.utils.text,
                  borderRadius: '8px',
                }}
                src={centerLogo}
              />
            </HStack>

            <QRCode
              qrStyle="squares"
              id={lightModeColors.neutral[1000]}
              size={QR_SIZE}
              bgColor={lightModeColors.neutral[0]}
              fgColor={lightModeColors.neutral[1000]}
              ecLevel="L"
              removeQrCodeBehindLogo
              value={qrCodeValue}
            />
            <Body size="xs" light>
              {qrCodeText}
            </Body>
          </VStack>
        </HStack>
      </VStack>
    )
  },
)
