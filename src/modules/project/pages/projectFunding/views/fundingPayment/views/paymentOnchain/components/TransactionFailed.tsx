import { Box, Image, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { CardLayout } from '@/shared/components/layouts/CardLayout'
import { Body, H3 } from '@/shared/components/typography'
import { TransactionFailedImageUrl } from '@/shared/constants'

export const TransactionFailed = ({ error }: { error?: Error | string }) => {
  const { t } = useTranslation()
  return (
    <CardLayout noborder dense id="transaction-failed-card" w="full" alignItems="center" spacing={6}>
      <Box padding="20px">
        <Image
          src={TransactionFailedImageUrl}
          alt={'Transaction failed image'}
          height="150px"
          width="auto"
          objectFit={'contain'}
        />
      </Box>
      <VStack alignItems="center">
        <H3 color="error.11">{t('Transaction has failed')}</H3>
        <Body size="sm" color="error.11" textAlign={'center'}>{`${error}`}</Body>
      </VStack>
    </CardLayout>
  )
}
