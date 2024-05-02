import { ListItem, UnorderedList, VStack } from '@chakra-ui/react'
import { Trans, useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { Body1, H3 } from '../../../../../../../../../../../components/typography'
import { FundingErrorWalletmaxUrl, getPath } from '../../../../../../../../../../../constants'
import { ErrorLayout } from './ErrorLayout'

export const FundingMaxLimit = ({ amount, creatorId }: { amount?: number; creatorId: number }) => {
  const { t } = useTranslation()
  return (
    <ErrorLayout
      url={FundingErrorWalletmaxUrl}
      title={t('Receiver’s wallet maximum limit Reached')}
      body={
        <Body1>
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
        </Body1>
      }
    >
      <VStack w="full" alignItems="start">
        <H3>{t('You can')}</H3>
        <Body1 color="neutral.600">
          {t(
            'To successfully complete your transaction, please try sending a lower amount that is below wallet’s maximum limit.',
          )}
        </Body1>
      </VStack>

      <VStack w="full" alignItems="start">
        <H3>{t('Alternatively')}</H3>
        <UnorderedList color="neutral.600">
          <ListItem>
            <Body1>
              <Trans i18nKey={'Feel free to <1>contact the creator</1> to inform them of your funding attempt.'}>
                {'Feel free to '}
                <Link to={getPath('userProfile', `${creatorId}`)} style={{ textDecoration: 'underline' }}>
                  contact the creator
                </Link>
                {' to inform them of your funding attempt.'}
              </Trans>
            </Body1>
          </ListItem>
          <ListItem>
            <Body1>{t("If you need assistance, please don't hesitate to reach out to us for support.")}</Body1>
          </ListItem>
        </UnorderedList>
      </VStack>
    </ErrorLayout>
  )
}
