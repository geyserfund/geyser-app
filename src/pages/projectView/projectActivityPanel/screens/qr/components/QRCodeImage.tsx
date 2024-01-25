import {
  Box,
  Button,
  HStack,
  Image,
  Text,
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react'
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaCopy } from 'react-icons/fa'
import { RiLinkUnlink } from 'react-icons/ri'
import { QRCode } from 'react-qrcode-logo'

import { LogoIcon } from '../../../../../../assets'
import Loader from '../../../../../../components/ui/Loader'
import { useDebounce } from '../../../../../../hooks'
import { lightModeColors } from '../../../../../../styles'
import { copyTextToClipboard } from '../../../../../../utils'
import { PaymentMethods } from '../QRCodeSection'
import WarningIcon from './warning.svg'

interface QRCodeImageProps {
  lightningInvoice: string
  onchainAddress: string
  paymentMethod: PaymentMethods
  setPaymentMethod: (paymentMethod: PaymentMethods) => void
}

export const QRCodeImage = ({
  paymentMethod,
  setPaymentMethod,
  lightningInvoice,
  onchainAddress,
}: QRCodeImageProps) => {
  const { t } = useTranslation()

  const [hasCopiedLightning, setHasCopiedLightning] = useState(false)
  const [hasCopiedOnchain, setHasCopiedOnchain] = useState(false)

  const qrSize = useBreakpointValue({
    base: 240,
    xs: 300,
    sm: 380,
    lg: 280,
    xl: 340,
  })

  const debouncedQRSize = useDebounce(qrSize, 100)

  const isLightning = paymentMethod === PaymentMethods.LIGHTNING

  const onCopyLightning = useCallback(() => {
    copyTextToClipboard(lightningInvoice)
    setHasCopiedLightning(true)
    setTimeout(() => {
      setHasCopiedLightning(false)
    }, 500)
  }, [lightningInvoice])

  const onCopyOnchain = useCallback(() => {
    copyTextToClipboard(onchainAddress)
    setHasCopiedOnchain(true)
    setTimeout(() => {
      setHasCopiedOnchain(false)
    }, 500)
  }, [onchainAddress])

  const PaymentMethodSelection = useCallback(() => {
    return (
      <HStack w="full">
        <Button
          flex={1}
          variant={'secondary'}
          borderColor={isLightning ? 'primary.400' : undefined}
          color={isLightning ? 'primary.400' : undefined}
          onClick={() => setPaymentMethod(PaymentMethods.LIGHTNING)}
        >
          {t('Lightning')}
        </Button>
        <Button
          flex={1}
          variant={'secondary'}
          borderColor={!isLightning ? 'primary.400' : undefined}
          color={!isLightning ? 'primary.400' : undefined}
          onClick={() => setPaymentMethod(PaymentMethods.ONCHAIN)}
        >
          {t('Onchain')}
        </Button>
      </HStack>
    )
  }, [isLightning, setPaymentMethod, t])

  const isColored = hasCopiedLightning || hasCopiedOnchain
  const fgColor = isColored
    ? lightModeColors.primary[400]
    : lightModeColors.neutral[1000]

  return (
    <VStack flexWrap="wrap" maxWidth="100%">
      <PaymentMethodSelection />
      {!onchainAddress && !isLightning ? (
        <Box borderRadius={'12px'} borderWidth={'2px'} padding={'2px'}>
          <VStack justifyContent={'center'} p={2}>
            <Image src={WarningIcon} />
            <Text
              textAlign="center"
              color="#DF3634"
              fontSize={'16px'}
              fontWeight={'bold'}
            >
              {t(
                'Onchain donations are temporarily unavailable. They should be operational by February 2024',
              )}
            </Text>
          </VStack>
        </Box>
      ) : (
        <>
          <Box borderRadius={'12px'} borderWidth={'2px'} padding={'2px'}>
            {debouncedQRSize ? (
              <Box
                borderColor={isColored ? 'primary.400' : 'neutral.1000'}
                w="full"
                borderRadius="8px"
                overflow={'hidden'}
                onClick={isLightning ? onCopyLightning : onCopyOnchain}
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
                  value={
                    paymentMethod === PaymentMethods.LIGHTNING
                      ? lightningInvoice
                      : onchainAddress
                  }
                  id={fgColor}
                  size={debouncedQRSize}
                  bgColor={lightModeColors.neutral[0]}
                  fgColor={fgColor}
                  qrStyle="squares"
                  ecLevel="L"
                  removeQrCodeBehindLogo
                />
              </Box>
            ) : null}
          </Box>
          <Box marginBottom={4} fontSize={'10px'}>
            <HStack spacing={5}>
              <Loader size="md" />
              <Text color={'neutral.900'} fontWeight={400}>
                {t('Waiting for payment')}
              </Text>
            </HStack>
          </Box>
          <HStack width="100%" flexWrap="wrap" align="center" justify="center">
            {isLightning ? (
              <Button
                leftIcon={hasCopiedLightning ? <RiLinkUnlink /> : <FaCopy />}
                onClick={onCopyLightning}
                variant="primary"
                isDisabled={!lightningInvoice}
                width={'100%'}
              >
                <Text>
                  {hasCopiedLightning
                    ? t('Copied!')
                    : t('Copy lightning invoice')}
                </Text>
              </Button>
            ) : (
              <Button
                leftIcon={hasCopiedOnchain ? <RiLinkUnlink /> : <FaCopy />}
                onClick={onCopyOnchain}
                variant="primary"
                width={'100%'}
              >
                <Text>
                  {hasCopiedOnchain ? t('Copied!') : t('Copy onchain address')}
                </Text>
              </Button>
            )}
          </HStack>
        </>
      )}
    </VStack>
  )
}
