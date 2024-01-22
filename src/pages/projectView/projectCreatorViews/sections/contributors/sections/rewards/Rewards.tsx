import { VStack } from '@chakra-ui/react'
import { Trans } from 'react-i18next'

import { Body1 } from '../../../../../../../components/typography'
import { standardPadding } from '../../../../../../../styles'
import { RewardByStatus } from './RewardByStatus'
import { RewardStatus } from './RewardTable'

export const Rewards = () => {
  return (
    <VStack alignItems="flex-start">
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
