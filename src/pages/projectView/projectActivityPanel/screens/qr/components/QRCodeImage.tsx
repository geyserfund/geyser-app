import {
  Box,
  Button,
  HStack,
  Text,
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react'
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaCopy } from 'react-icons/fa'
import { RiLinkUnlink } from 'react-icons/ri'
import { QRCode } from 'react-qrcode-logo'

import Loader from '../../../../../../components/ui/Loader'
import { lightModeColors } from '../../../../../../styles'
import { copyTextToClipboard } from '../../../../../../utils'
import LogoPrimary from '../../../../../assets/logo-brand.svg'
import LogoDark from '../../../../../assets/logo-dark.svg'
import { PaymentMethods } from '../QRCodeSection'

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

  const qrSize =
    useBreakpointValue({ base: 240, sm: 340, lg: 280, xl: 340 }) || 240

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

  return (
    <VStack flexWrap="wrap" maxWidth="100%">
      <PaymentMethodSelection />
      <Box borderRadius={'4px'} borderWidth={'2px'} padding={'2px'}>
        {hasCopiedLightning || hasCopiedOnchain ? (
          <Box borderColor={'primary.400'} w="full">
            <QRCode
              value={
                paymentMethod === PaymentMethods.LIGHTNING
                  ? lightningInvoice
                  : onchainAddress
              }
              size={qrSize}
              bgColor={lightModeColors.neutral[0]}
              fgColor={lightModeColors.primary[400]}
              logoImage={LogoPrimary}
              qrStyle="squares"
              ecLevel="L"
              logoHeight={80}
              logoWidth={80}
              removeQrCodeBehindLogo
            />
          </Box>
        ) : (
          <Box borderColor={'neutral.1000'} w="full">
            <QRCode
              value={
                paymentMethod === PaymentMethods.LIGHTNING
                  ? lightningInvoice
                  : onchainAddress
              }
              size={qrSize}
              bgColor={lightModeColors.neutral[0]}
              fgColor={lightModeColors.neutral[1000]}
              logoImage={LogoDark}
              qrStyle="squares"
              ecLevel="L"
              logoHeight={80}
              logoWidth={80}
              removeQrCodeBehindLogo
            />
          </Box>
        )}
      </Box>
      <Box marginBottom={4} fontSize={'10px'}>
        <HStack spacing={5}>
          <Loader size="md" />
          <Text color={'neutral.900'} fontWeight={400}>
            {t('Waiting for payment')}
          </Text>
        </HStack>
      </Box>
      <HStack
        width="100%"
        flexWrap="wrap"
        align="center"
        spacing={1}
        pt={4}
        justify="center"
      >
        <Box py={1}>
          {isLightning ? (
            <Button
              leftIcon={hasCopiedLightning ? <RiLinkUnlink /> : <FaCopy />}
              onClick={onCopyLightning}
              variant="primary"
              isDisabled={!lightningInvoice}
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
            >
              <Text>
                {hasCopiedOnchain ? t('Copied!') : t('Copy Onchain address')}
              </Text>
            </Button>
          )}
        </Box>
      </HStack>
    </VStack>
  )
}
