import { Icon, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiInfo } from 'react-icons/pi'

import { Body } from '@/shared/components/typography/index.ts'
import { Feedback, FeedBackVariant } from '@/shared/molecules/Feedback.tsx'

/** Component for displaying bitcoin purchase notice with capital gains implications */
export const BitcoinPurchaseNotice = () => {
  return (
    <Feedback
      variant={FeedBackVariant.NEUTRAL}
      icon={<Icon as={PiInfo} title={t('Important')} fontSize="30px" />}
      title={t('Important')}
    >
      <VStack w="full" alignItems="start">
        <Body size="sm">
          {t('You are buying bitcoin and sending it instantly to the project. Any refunds are processed in bitcoin.')}
        </Body>
      </VStack>
    </Feedback>
  )
}
