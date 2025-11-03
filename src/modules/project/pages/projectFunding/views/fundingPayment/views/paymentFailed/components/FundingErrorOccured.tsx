import { ListItem, UnorderedList, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { Body, H3 } from '@/shared/components/typography'
import { FundingErrorUrl } from '@/shared/constants'
import { Feedback, FeedBackVariant } from '@/shared/molecules'

import { ErrorLayout } from './ErrorLayout'

export const FundingErrorOccured = () => {
  const { t } = useTranslation()
  return (
    <ErrorLayout
      url={FundingErrorUrl}
      title={t('An Error Occured')}
      body={
        <Body>
          {t(
            "We've encountered an issue with the payment flow. This could be due to a third-party service or an internal system error. We apologize for this inconvenience and appreciate your patience as we work to resolve it.",
          )}
        </Body>
      }
    >
      <Feedback variant={FeedBackVariant.INFO}>
        <VStack w="full" alignItems="start">
          <H3>{t('What now?')}</H3>
          <UnorderedList>
            <ListItem>
              <Body size="sm">
                {t(
                  "If you keep experiencing this problem or need assistance, please don't hesitate to reach out to us for support.",
                )}
              </Body>
            </ListItem>
            <ListItem>
              <Body size="sm">
                {t('Some system errors are temporary. By clicking try again button you can reattempt the payment.')}
              </Body>
            </ListItem>
          </UnorderedList>
        </VStack>
      </Feedback>
    </ErrorLayout>
  )
}
