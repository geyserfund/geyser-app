import { ListItem, UnorderedList, VStack } from '@chakra-ui/react'
import { Trans, useTranslation } from 'react-i18next'
import { Link } from 'react-router'

import { Body, H3 } from '@/shared/components/typography'
import { FundingErrorRewardsOutOfStockUrl, getPath } from '@/shared/constants'
import { Feedback, FeedBackVariant } from '@/shared/molecules'

import { ErrorLayout } from './ErrorLayout'

export const FundingRewardsOutOfStock = ({
  rewards,
  creatorId,
  projectName,
}: {
  creatorId: number
  rewards: { name: string }[]
  projectName: string
}) => {
  const { t } = useTranslation()
  return (
    <ErrorLayout
      url={FundingErrorRewardsOutOfStockUrl}
      title={t('Products Out of Stock')}
      body={
        <>
          <Body>
            {t('Unfortunately, one or more of the products you selected are no longer available or in stock.')}
            {rewards.length > 0 ? `${t('Products affected')}:` : ''}
          </Body>
          {rewards.length > 0 && (
            <UnorderedList>
              {rewards.map((reward) => {
                return (
                  <ListItem key={reward.name}>
                    <Body>{reward.name}</Body>
                  </ListItem>
                )
              })}
            </UnorderedList>
          )}
        </>
      }
    >
      <Feedback variant={FeedBackVariant.INFO}>
        <VStack w="full" alignItems="start">
          <H3>{t('Alternatively')}</H3>
          <UnorderedList color="neutral.600">
            <ListItem>
              <Body size="sm">
                <Trans
                  i18nKey={
                    'You can <1>return to the product selection screen</1> to adjust your choices, excluding the affected products, and proceed with your contribution.'
                  }
                >
                  {'You can '}
                  <Link to={getPath('projectRewards', `${projectName}`)} style={{ textDecoration: 'underline' }}>
                    return to the product selection screen
                  </Link>
                  {' to adjust your choices, excluding the affected products, and proceed with your contribution.'}
                </Trans>
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
