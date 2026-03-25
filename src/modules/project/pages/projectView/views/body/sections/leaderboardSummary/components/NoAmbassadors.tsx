import { Image, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { Body } from '@/shared/components/typography'
import { MegaphoneUrl } from '@/shared/constants'
import {
  DEFAULT_CONTRIBUTION_REFERRAL_PAYOUT_RATE,
  formatEffectiveAffiliatePayoutRate,
  GEYSER_PROMOTION_FEE_RATE,
} from '@/shared/utils/affiliatePayout.ts'

export const NoAmbassadors = () => {
  const { t } = useTranslation()
  return (
    <VStack w="full" justifyContent="center" flex={1} padding={6}>
      <Image src={MegaphoneUrl} alt={'no ambassadors image'} height="auto" width="300px" py={4} />
      <Body size="md" medium muted>
        {t('No contributions have been enabled through sharing yet. Share the project and earn {{rate}} of each contribution you enable.', {
          rate: formatEffectiveAffiliatePayoutRate(
            DEFAULT_CONTRIBUTION_REFERRAL_PAYOUT_RATE,
            GEYSER_PROMOTION_FEE_RATE,
          ),
        })}
      </Body>
    </VStack>
  )
}
