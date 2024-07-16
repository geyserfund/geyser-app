import { ListItem, UnorderedList, VStack } from '@chakra-ui/react'
import { Trans, useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { Body1, H3 } from '../../../../../../../../../../../components/typography'
import { FundingErrorWalletUnreachableUrl, getPath } from '../../../../../../../../../../../shared/constants'
import { ErrorLayout } from './ErrorLayout'

export const FundingWalletUnreachable = ({ creatorId }: { creatorId: number }) => {
  const { t } = useTranslation()
  return (
    <ErrorLayout
      url={FundingErrorWalletUnreachableUrl}
      title={t('Wallet Unreachable')}
      body={
        <>
          <Body1>
            {t(
              "Unfortunately, we're unable to reach the wallet to generate an invoice. This could be happening because",
            )}
            :
          </Body1>
          <UnorderedList>
            <ListItem>
              <Body1>{t('The lightning node may be temporarily down.')}</Body1>
            </ListItem>
            <ListItem>
              <Body1>{t('The lightning address provided for the wallet might no longer be valid.')}</Body1>
            </ListItem>
          </UnorderedList>
        </>
      }
    >
      <VStack w="full" alignItems="start">
        <H3>{t('We took actions')}</H3>
        <Body1 color="neutral.600">
          {t('We notified the creator about this issue, and we hope for a quick resolution on their end.')}
        </Body1>
      </VStack>

      <VStack w="full" alignItems="start">
        <H3>{t('Alternatively')}</H3>
        <UnorderedList color="neutral.600">
          <ListItem>
            <Body1>{t('You can try the transaction again, in case the wallet becomes accessible again.')}</Body1>
          </ListItem>
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
