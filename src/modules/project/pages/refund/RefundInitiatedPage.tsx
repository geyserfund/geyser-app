import { HStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { CardLayout } from '../../../../components/layouts'
import { H2 } from '../../../../components/typography'
import { getPath } from '../../../../constants'
import { standardPadding } from '../../../../styles'
import { TransactionProcessing } from '../projectView/views/projectActivityPanel/screens/qr/views/onchain/components'
import { useRefundTransactionId } from '../projectView/views/projectActivityPanel/screens/qr/views/onchain/states/onChainTransaction'
import { BLOCK_EXPLORER_BASE_URL } from '../projectView/views/projectActivityPanel/screens/qr/views/onchain/views/OnChainProcessing'

export const RefundInitiatedPage = () => {
  const { t } = useTranslation()
  const refundTransactionId = useRefundTransactionId()
  const navigate = useNavigate()

  // setTimeout(() => {
  //   if (!refundTransactionId) {
  //     navigate(getPath('refund'))
  //   }
  // }, 100)

  return (
    <HStack w="full" h="full" justifyContent="center" alignItems="center">
      <CardLayout maxWidth="700px" padding={standardPadding} spacing="20px">
        <H2>{t('Refund')}</H2>
        <TransactionProcessing
          title={t('Your refund has been successfully intiated.')}
          subTitle={t(
            'We apologize for any inconvenience caused. In future transactions, please ensure to set a higher transaction fee for timely processing.',
          )}
          //  buttonUrl={`${BLOCK_EXPLORER_BASE_URL}${transactionId}`}
          buttonUrl={`${BLOCK_EXPLORER_BASE_URL}/${refundTransactionId}`}
          noborder
        />
      </CardLayout>
    </HStack>
  )
}
