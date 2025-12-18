import { VStack } from '@chakra-ui/react'
import { Trans, useTranslation } from 'react-i18next'

import { Body, H3 } from '@/shared/components/typography'
import { FundingErrorWalletMinUrl } from '@/shared/constants'
import { Feedback, FeedBackVariant } from '@/shared/molecules'

import { ErrorLayout } from './ErrorLayout'

export const FundingMinLimit = ({ amount, creatorId }: { amount?: number | string; creatorId: number }) => {
  const { t } = useTranslation()
  return (
    <ErrorLayout
      url={FundingErrorWalletMinUrl}
      title={t('Receiver’s Wallet Transaction Below Minimum Limit')}
      body={
        <Body>
          <Trans
            i18nKey="We're sorry, but your transaction cannot be completed. The wallet you are trying to fund cannot accept transactions lower than {{amount}} Sats."
            values={{ amount }}
          >
            {
              "We're sorry, but your transaction cannot be completed. The wallet you are trying to fund cannot accept transactions lower than "
            }
            <strong>{'{{amount}}  Sats.'}</strong>
          </Trans>
        </Body>
      }
    >
      <Feedback variant={FeedBackVariant.INFO}>
        <VStack w="full" spacing={4}>
          <VStack w="full" alignItems="start">
            <H3>{t('You can')}</H3>
            <Body size="sm" color="neutral.600">
              {t(
                'To successfully complete your transaction, please try again with an amount greater than the minimum limit.',
              )}
            </Body>
            <Body size="sm">{t("If you need assistance, please don't hesitate to reach out to us for support.")}</Body>
          </VStack>
        </VStack>
      </Feedback>
    </ErrorLayout>
  )
}
