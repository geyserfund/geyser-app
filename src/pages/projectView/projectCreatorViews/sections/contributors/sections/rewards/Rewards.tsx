import { VStack } from '@chakra-ui/react'
import { Trans, useTranslation } from 'react-i18next'

import { Body1 } from '../../../../../../../components/typography'
import { ProjectRewardsImageUrl } from '../../../../../../../constants'
import { standardPadding } from '../../../../../../../styles'
import { EmptyContainer } from '../../components'
import { RewardStatus } from './components/RewardTable'
import { RewardByStatus } from './RewardByStatus'
import { useRewardEmptyAtom } from './state/rewardsAtom'

export const Rewards = () => {
  const { t } = useTranslation()
  const isRewardEmpty = useRewardEmptyAtom()

  if (isRewardEmpty) {
    return <EmptyContainer image={ProjectRewardsImageUrl} text={t('No rewards sold yet')} />
  }

  return (
    <VStack w="full" alignItems="flex-start">
      <Body1 px={standardPadding}>
        <Trans i18nKey="This page is for managing your reward sales. Mark your rewards as <0>Shipped</0> or <1>Delivered.</1>">
          {'This page is for managing your reward sales. Mark your rewards as '}
          <strong>Shipped</strong>
          {' or '}
          <strong>Delivered.</strong>
        </Trans>
      </Body1>
      <RewardByStatus status={RewardStatus.todo} />
      <RewardByStatus status={RewardStatus.shipped} />
      <RewardByStatus status={RewardStatus.delivered} />
    </VStack>
  )
}
