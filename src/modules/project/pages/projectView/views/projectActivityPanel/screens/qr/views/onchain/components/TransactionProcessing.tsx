import { Button, Image, Link, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { CardLayout } from '../../../../../../../../../../../components/layouts'
import { Body2, H3 } from '../../../../../../../../../../../components/typography'
import { TransactionProcessingUrl } from '../../../../../../../../../../../constants'

export const TransactionProcessing = ({ buttonUrl }: { buttonUrl?: string }) => {
  const { t } = useTranslation()
  return (
    <CardLayout w="100%" spacing="20px" alignItems="center">
      <Image maxHeight="150px" height="auto" width="auto" objectFit={'contain'} src={TransactionProcessingUrl} />
      <VStack spacing="10px" pb="20px">
        <H3>{t('Transaction is being processed...')}</H3>
        <Body2>
          {t(
            'Completion time may vary due to Bitcoin network conditions, such as mempool size and transaction fees. Thank you for your patience.',
          )}
        </Body2>
      </VStack>
      {
        <Button
          as={Link}
          href={buttonUrl}
          isExternal
          variant="neutral"
          border="1px solid"
          borderColor="neutral.900"
          w="full"
          isDisabled={!buttonUrl}
        >
          {t('View transaction on explorer')}
        </Button>
      }
    </CardLayout>
  )
}
