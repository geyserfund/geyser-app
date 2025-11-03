import { ListItem, UnorderedList, VStack } from '@chakra-ui/react'
import { Trans, useTranslation } from 'react-i18next'
import { PiMegaphone } from 'react-icons/pi'
import { Link } from 'react-router'

import { Body, H3 } from '@/shared/components/typography'
import { FundingErrorWalletUnreachableUrl, getPath } from '@/shared/constants'
import { Feedback, FeedBackVariant } from '@/shared/molecules'

import { ErrorLayout } from './ErrorLayout'

export const FundingWalletUnreachable = ({ creatorId }: { creatorId: number }) => {
  const { t } = useTranslation()
  return (
    <ErrorLayout
      url={FundingErrorWalletUnreachableUrl}
      title={t('Wallet Unreachable')}
      body={
        <VStack spacing={1}>
          <Body>
            {t(
              "Unfortunately, we're unable to reach the wallet to generate an invoice. This could be happening because",
            )}
            :
          </Body>
          <UnorderedList>
            <ListItem>
              <Body>{t('The lightning node may be temporarily down.')}</Body>
            </ListItem>
            <ListItem>
              <Body>{t('The lightning address provided for the wallet might no longer be valid.')}</Body>
            </ListItem>
          </UnorderedList>
        </VStack>
      }
    >
      <Feedback variant={FeedBackVariant.SUCCESS} icon={<PiMegaphone />}>
        <VStack w="full" alignItems="start">
          <H3>{t('We took actions')}</H3>
          <Body size="sm">
            {t('We notified the creator about this issue, and we hope for a quick resolution on their end.')}
          </Body>
        </VStack>
      </Feedback>
      <Feedback variant={FeedBackVariant.INFO}>
        <VStack w="full" alignItems="start">
          <H3>{t('Alternatively')}</H3>
          <UnorderedList>
            <ListItem>
              <Body size="sm">
                {t('You can try the transaction again, in case the wallet becomes accessible again.')}
              </Body>
            </ListItem>
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
      </Feedback>
    </ErrorLayout>
  )
}
