import { Button, ButtonProps } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { useMobileMode } from '@/utils'

import { useDownloadRefund } from '../hooks/useDownloadRefund'

export const DownloadRefundButton = (props: ButtonProps) => {
  const { t } = useTranslation()
  const isMobile = useMobileMode()

  const { downloadRefundJson, downloadRefundQr } = useDownloadRefund()

  const handleClick = () => {
    if (isMobile) {
      downloadRefundQr()
    } else {
      downloadRefundJson()
    }
  }

  return (
    <Button variant="outline" colorScheme="neutral1" onClick={handleClick} {...props}>
      {t('Download refund file')}
    </Button>
  )
}
