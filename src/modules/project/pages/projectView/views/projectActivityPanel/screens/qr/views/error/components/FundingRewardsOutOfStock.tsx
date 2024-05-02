import { ListItem, UnorderedList, VStack } from '@chakra-ui/react'
import { Trans, useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { Body1, H3 } from '../../../../../../../../../../../components/typography'
import { FundingErrorRewardsOutOfStockUrl, getPath } from '../../../../../../../../../../../constants'
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
      title={t('Rewards Out of Stock')}
      body={
        <>
          <Body1>
            {t('Unfortunately, one or more of the rewards you selected are no longer available or in stock.')}
            {rewards.length > 0 ? `${t('Rewards affected')}:` : ''}
          </Body1>
          {rewards.length > 0 && (
            <UnorderedList>
              {rewards.map((reward) => {
                return (
                  <ListItem key={reward.name}>
                    <Body1>{reward.name}</Body1>
                  </ListItem>
                )
              })}
            </UnorderedList>
          )}
        </>
      }
    >
      <VStack w="full" alignItems="start">
        <H3>{t('Alternatively')}</H3>
        <UnorderedList color="neutral.600">
          <ListItem>
            <Body1>
              <Trans
                i18nKey={
                  'You can <1>return to the reward selection screen</1> to adjust your choices, excluding the affected rewards, and proceed with your contribution.'
                }
              >
                {'You can '}
                <Link to={getPath('projectRewards', `${projectName}`)} style={{ textDecoration: 'underline' }}>
                  return to the reward selection screen
                </Link>
                {' to adjust your choices, excluding the affected rewards, and proceed with your contribution.'}
              </Trans>
            </Body1>
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
