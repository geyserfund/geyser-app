import { HStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { CardLayout } from '../../../../components/layouts'
import { Body2, H2 } from '../../../../components/typography'
import { RefundPolicyNote } from '../projectView/views/projectActivityPanel/screens/qr/components'
import { ClaimRefundForm } from '../projectView/views/projectActivityPanel/screens/qr/views/onchain/components/ClaimRefundForm'

export const RefundPage = () => {
  const { t } = useTranslation()
  return (
    <HStack w="full" h="full" justifyContent="center" alignItems="center">
      <CardLayout maxWidth="700px" spacing="20px">
        <H2>{t('Refund')}</H2>
        <ClaimRefundForm />
        <CardLayout spacing="10px">
          <Body2>
            {t(
              'Here you can initiate refunds for failed contribution transactions. If your browser has stored Refund files locally, simply enter your Bitcoin on-chain address to proceed. If not, you will also need to upload the Refund file that you should have securely saved during the contribution process.',
            )}
          </Body2>
          <RefundPolicyNote />
        </CardLayout>
      </CardLayout>
    </HStack>
  )
}
