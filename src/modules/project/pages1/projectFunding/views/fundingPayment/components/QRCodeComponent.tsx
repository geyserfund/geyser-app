import { Box, useBreakpointValue } from '@chakra-ui/react'
import { QRCode } from 'react-qrcode-logo'

import { LogoDark } from '../../../../../../../assets'
import { lightModeColors } from '../../../../../../../shared/styles'

type QRCodeComponentProps = {
  value: string
  onClick: () => void
  isColored: boolean
}

export const QRCodeSizeMap = {
  base: 240,
  xs: 280,
}

export const QRCodeComponent = ({ value, isColored, onClick }: QRCodeComponentProps) => {
  const qrSize = useBreakpointValue(QRCodeSizeMap)

  if (!qrSize) return null

  return (
    <Box
      borderRadius={'12px'}
      borderWidth={'5px'}
      padding={'2px'}
      borderColor={isColored ? 'primary.400' : 'neutral.1000'}
    >
      <Box
        w="full"
        borderRadius="8px"
        overflow={'hidden'}
        onClick={onClick}
        _hover={{ cursor: 'pointer' }}
        position="relative"
      >
        <img
          alt="Geyser logo"
          style={{
            position: 'absolute',
            top: (qrSize - 25) / 2,
            left: (qrSize - 25) / 2,
            width: 50,
            height: 50,
            padding: '8px',
            background: 'white',
            borderRadius: '8px',
          }}
          src={LogoDark}
        />
        <QRCode
          value={value}
          id={'qr-code'}
          size={qrSize}
          bgColor={lightModeColors.utils.pbg}
          fgColor={isColored ? lightModeColors.primary1[9] : lightModeColors.utils.text}
          qrStyle="squares"
          ecLevel="L"
          removeQrCodeBehindLogo
        />
      </Box>
    </Box>
  )
}
