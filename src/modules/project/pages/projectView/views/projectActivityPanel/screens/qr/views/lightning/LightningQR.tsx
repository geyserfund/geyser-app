import { Button, Text, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { FaCopy } from 'react-icons/fa'
import { RiLinkUnlink } from 'react-icons/ri'

import { QRCodeComponent } from '../../components/QRCodeComponent'
import { WaitingForPayment } from '../../components/WaitingForPayment'
import { useCopyToClipboard } from '../../hooks/useCopyButton'

interface LightningQRProps {
  lightningInvoice: string
}

export const LightningQR = ({ lightningInvoice }: LightningQRProps) => {
  const { t } = useTranslation()

  const { onCopy, hasCopied } = useCopyToClipboard(lightningInvoice)

  return (
    <VStack flexWrap="wrap" width="100%" spacing="20px">
      <VStack w="full">
        <QRCodeComponent value={lightningInvoice} onClick={onCopy} isColored={hasCopied} />
        <WaitingForPayment />
      </VStack>

      <Button
        size="md"
        leftIcon={hasCopied ? <RiLinkUnlink /> : <FaCopy />}
        onClick={onCopy}
        variant="primary"
        isDisabled={!lightningInvoice}
        width={'100%'}
      >
        <Text>{hasCopied ? t('Copied!') : t('Copy lightning invoice')}</Text>
      </Button>
    </VStack>
  )
}
