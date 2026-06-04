import { ListItem, UnorderedList, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { Body, H3 } from '@/shared/components/typography'
import { FundingErrorUrl } from '@/shared/constants'
import { Feedback, FeedBackVariant } from '@/shared/molecules'

import { ErrorLayout } from './ErrorLayout'

export const FundingProjectClosed = ({ message }: { message: string }) => {
  const { t } = useTranslation()

  return (
    <ErrorLayout
      url={FundingErrorUrl}
      title={t('Project closed')}
      body={<Body>{message}</Body>}
    >
      <Feedback variant={FeedBackVariant.INFO}>
        <VStack w="full" alignItems="start">
          <H3>{t('What now?')}</H3>
          <UnorderedList>
            <ListItem>
              <Body size="sm">{t('This project can no longer accept contributions.')}</Body>
            </ListItem>
            <ListItem>
              <Body size="sm">{t('Please return to the project page for the latest status.')}</Body>
            </ListItem>
          </UnorderedList>
        </VStack>
      </Feedback>
    </ErrorLayout>
  )
}
