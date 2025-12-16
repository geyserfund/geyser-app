import { Button, ButtonProps } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { useDownloadRefund } from '../hooks/useDownloadRefund'

export const DownloadRefundButton = (props: ButtonProps) => {
  const { t } = useTranslation()

  const { buttonProps } = useDownloadRefund()

  return (
    <Button {...buttonProps} variant="outline" colorScheme="neutral1" {...props}>
      {t('Download refund file')}
    </Button>
  )
}
