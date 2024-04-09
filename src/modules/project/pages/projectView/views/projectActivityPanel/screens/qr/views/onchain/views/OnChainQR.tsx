import { Button, Text, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { FaCopy } from 'react-icons/fa'
import { RiLinkUnlink } from 'react-icons/ri'

import { QRCodeComponent } from '../../../components/QRCodeComponent'
import { WaitingForPayment } from '../../../components/WaitingForPayment'
import { useCopyToClipboard } from '../../../hooks/useCopyButton'
import { PaymentAndRefundInstructions } from '../components'
import { useGoToNextOnChainStatus } from '../states/onChainStatus'

export const OnChainQR = ({ onChainAddress }: { onChainAddress: string }) => {
  const { t } = useTranslation()
  const { onCopy, hasCopied } = useCopyToClipboard(onChainAddress)

  const goToNextOnChainStatus = useGoToNextOnChainStatus()

  return (
    <VStack flexWrap="wrap" maxWidth="100%" spacing="20px">
      <VStack w="full">
        <QRCodeComponent value={onChainAddress} onClick={onCopy} isColored={hasCopied} />
        <WaitingForPayment />
      </VStack>

      <Button
        size="md"
        leftIcon={hasCopied ? <RiLinkUnlink /> : <FaCopy />}
        onClick={onCopy}
        variant="primary"
        isDisabled={!onChainAddress}
        width={'100%'}
      >
        <Text>{hasCopied ? t('Copied!') : t('Copy onchain address')}</Text>
      </Button>

      <Button size="md" onClick={goToNextOnChainStatus} variant="secondary" width={'100%'}>
        goToNextOnChainStatus
      </Button>

      <PaymentAndRefundInstructions />
    </VStack>
  )
}
