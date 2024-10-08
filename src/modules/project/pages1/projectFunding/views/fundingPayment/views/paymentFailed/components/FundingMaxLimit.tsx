import { ListItem, UnorderedList, VStack } from '@chakra-ui/react'
import { Trans, useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { Body, H3 } from '@/shared/components/typography'
import { FundingErrorWalletmaxUrl, getPath } from '@/shared/constants'
import { Feedback, FeedBackVariant } from '@/shared/molecules'

import { ErrorLayout } from './ErrorLayout'

export const FundingMaxLimit = ({ amount, creatorId }: { amount?: number | string; creatorId: number }) => {
  const { t } = useTranslation()
  return (
    <ErrorLayout
      url={FundingErrorWalletmaxUrl}
      title={t('Receiver’s Wallet Transaction Above Maximum Limit')}
      body={
        <Body>
          <Trans
            i18nKey="We're sorry, but your transaction cannot be completed. The project's wallet you are trying to fund has reached its maximum limit and cannot receive more than {{amount}} Sats at this time."
            values={{ amount }}
          >
            {
              "We're sorry, but your transaction cannot be completed. The project's wallet you are trying to fund has reached its maximum limit and cannot receive more than "
            }
            <strong>{'{{amount}}  Sats'}</strong>
            {' at this time.'}
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
                'To successfully complete your transaction, please try sending a lower amount that is below wallet’s maximum limit.',
              )}
            </Body>
          </VStack>

          <VStack w="full" alignItems="start">
            <H3>{t('Alternatively')}</H3>
            <UnorderedList color="neutral.600">
              <ListItem>
                <Body size="sm">
                  <Trans i18nKey={'Feel free to <1>contact the creator</1> to inform them of your funding attempt.'}>
                    {'Feel free to '}
                    <Link to={getPath('userProfile', `${creatorId}`)} style={{ textDecoration: 'underline' }}>
                      contact the creator
                    </Link>
                    {' to inform them of your funding attempt.'}
                  </Trans>
                </Body>
              </ListItem>
              <ListItem>
                <Body size="sm">
                  {t("If you need assistance, please don't hesitate to reach out to us for support.")}
                </Body>
              </ListItem>
            </UnorderedList>
          </VStack>
        </VStack>
      </Feedback>
    </ErrorLayout>
  )
}
