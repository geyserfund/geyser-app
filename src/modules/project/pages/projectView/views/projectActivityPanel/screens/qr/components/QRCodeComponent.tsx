import { Box, useBreakpointValue } from '@chakra-ui/react'
import { QRCode } from 'react-qrcode-logo'

import { LogoIcon } from '../../../../../../../../../assets'
import { useDebounce } from '../../../../../../../../../hooks'
import { lightModeColors } from '../../../../../../../../../styles'

type QRCodeComponentProps = {
  value: string
  onClick: () => void
  isColored: boolean
}

export const QRCodeComponent = ({ value, isColored, onClick }: QRCodeComponentProps) => {
  const qrSize = useBreakpointValue({
    base: 240,
    xs: 300,
    sm: 380,
    lg: 280,
    xl: 340,
  })

  const debouncedQRSize = useDebounce(qrSize, 100)

  if (!debouncedQRSize) return null

  return (
    <Box borderRadius={'12px'} borderWidth={'2px'} padding={'2px'}>
      <Box
        borderColor={isColored ? 'primary.400' : 'neutral.1000'}
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
            top: (debouncedQRSize - 25) / 2,
            left: (debouncedQRSize - 25) / 2,
            width: 50,
            height: 50,
            padding: '5px',
            background: 'white',
            borderRadius: '8px',
          }}
          src={LogoIcon}
        />
        <QRCode
          value={value}
          id={'qr-code'}
          size={debouncedQRSize}
          bgColor={lightModeColors.neutral[0]}
          fgColor={isColored ? lightModeColors.primary[400] : lightModeColors.neutral[1000]}
          qrStyle="squares"
          ecLevel="L"
          removeQrCodeBehindLogo
        />
      </Box>
    </Box>
  )
}
