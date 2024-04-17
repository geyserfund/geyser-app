import { Image, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { CardLayout } from '../../../../../../../../../../../components/layouts'
import { Body2, H3 } from '../../../../../../../../../../../components/typography'
import { TransactionFailedImageUrl } from '../../../../../../../../../../../constants'
import { standardPadding } from '../../../../../../../../../../../styles'

export const OnChainTransactionFailed = () => {
  const { t } = useTranslation()
  return (
    <CardLayout padding={standardPadding}>
      <Image src={TransactionFailedImageUrl} height="160px" width="auto" objectFit={'contain'} />
      <VStack spacing="10px">
        <H3 color="secondary.red">{t('Transaction has failed')}</H3>
        <Body2>
          The transaction failed because the transaction fee set was not high enough to ensure transaction within 24
          hours, leading to its automatic rejection.
        </Body2>
      </VStack>
    </CardLayout>
  )
}
