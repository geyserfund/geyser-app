import { ListItem, UnorderedList, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { Body1, H3 } from '../../../../../../../../../../../components/typography'
import { FundingErrorUrl } from '../../../../../../../../../../../constants'
import { ErrorLayout } from './ErrorLayout'

export const FundingErrorOccured = () => {
  const { t } = useTranslation()
  return (
    <ErrorLayout
      url={FundingErrorUrl}
      title={t('An Error Occured')}
      body={
        <Body1>
          {t(
            "We've encountered an issue with the payment flow. This could be due to a third-party service or an internal system error. We apologize for this inconvenience and appreciate your patience as we work to resolve it.",
          )}
        </Body1>
      }
    >
      <VStack w="full" alignItems="start">
        <H3>{t('What now?')}</H3>
        <UnorderedList color="neutral.600">
          <ListItem>
            <Body1>
              {t(
                "If you keep experiencing this problem or need assistance, please don't hesitate to reach out to us for support.",
              )}
            </Body1>
          </ListItem>
          <ListItem>
            <Body1>
              {t('Some system errors are temporary. By clicking try again button you can reattempt the payment.')}
            </Body1>
          </ListItem>
        </UnorderedList>
      </VStack>
    </ErrorLayout>
  )
}
