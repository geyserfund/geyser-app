import { Image, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { CardLayout } from '../../../../../../../../../../../components/layouts'
import { Body2, H3 } from '../../../../../../../../../../../components/typography'
import { TransactionFailedImageUrl } from '../../../../../../../../../../../constants'
import { standardPadding } from '../../../../../../../../../../../styles'

export const TransactionFailed = ({ error }: { error?: Error | string }) => {
  const { t } = useTranslation()
  return (
    <CardLayout padding={standardPadding} w="full">
      <Image src={TransactionFailedImageUrl} height="160px" width="auto" objectFit={'contain'} />
      <VStack spacing="10px" alignItems="center">
        <H3 color="secondary.red">{t('Transaction has failed')}</H3>
        <Body2 color="secondary.red" textAlign={'center'}>{`${error}`}</Body2>
      </VStack>
    </CardLayout>
  )
}
