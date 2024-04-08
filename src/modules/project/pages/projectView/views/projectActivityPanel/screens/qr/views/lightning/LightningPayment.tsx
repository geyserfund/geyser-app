import { Button, Text, VStack } from '@chakra-ui/react'
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaCopy } from 'react-icons/fa'
import { RiLinkUnlink } from 'react-icons/ri'

import { copyTextToClipboard } from '../../../../../../../../../../utils'
import { QRCodeComponent } from '../../components/QRCodeComponent'
import { WaitingForPayment } from '../../components/WaitingForPayment'

interface QRCodeImageProps {
  lightningInvoice: string
}

export const LightningPayment = ({ lightningInvoice }: QRCodeImageProps) => {
  const { t } = useTranslation()

  const [hasCopiedLightning, setHasCopiedLightning] = useState(false)

  const onCopyLightning = useCallback(() => {
    copyTextToClipboard(lightningInvoice)
    setHasCopiedLightning(true)
    setTimeout(() => {
      setHasCopiedLightning(false)
    }, 500)
  }, [lightningInvoice])

  return (
    <VStack flexWrap="wrap" maxWidth="100%">
      <QRCodeComponent value={lightningInvoice} onClick={onCopyLightning} isColored={hasCopiedLightning} />
      <WaitingForPayment />
      <Button
        leftIcon={hasCopiedLightning ? <RiLinkUnlink /> : <FaCopy />}
        onClick={onCopyLightning}
        variant="primary"
        isDisabled={!lightningInvoice}
        width={'100%'}
      >
        <Text>{hasCopiedLightning ? t('Copied!') : t('Copy lightning invoice')}</Text>
      </Button>
    </VStack>
  )
}
