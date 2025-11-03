import { VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { CardLayoutProps } from '@/shared/components/layouts/CardLayout'
import { Body } from '@/shared/components/typography'
import { Feedback, FeedBackVariant } from '@/shared/molecules'

export const SafeToDeleteNotice = (props: CardLayoutProps) => {
  const { t } = useTranslation()
  return (
    <Feedback variant={FeedBackVariant.INFO}>
      <VStack w="full" alignItems="start">
        <Body size="lg" medium>
          {t('Safe to delete refund file')}
        </Body>
        <Body size="sm">
          {t('The Refund file is safe to delete, as your transaction has been successfully processed.')}
        </Body>
      </VStack>
    </Feedback>
  )
}
