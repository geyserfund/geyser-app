import { Text, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom'
import { H2 } from '@/shared/components/typography'

import { FundingFormRewardItem } from '../components/FundingFormRewardItem'

type Props = {
  readOnly?: boolean
}

export const FundingInitRewards = ({ readOnly }: Props) => {
  const { t } = useTranslation()

  const { formState, project } = useFundingFormAtom()

  const { rewards } = project

  const hasRewards = rewards && rewards.length

  if (!hasRewards) {
    return null
  }

  const rewardsById = formState.rewardsByIDAndCount || {}

  const hasSelectedRewards = Boolean(Object.keys(rewardsById).reduce((prev, key) => prev + (rewardsById[key] || 0), 0))

  const availableRewards = rewards.filter((reward) => !reward.isHidden)

  if (availableRewards.length === 0) {
    return null
  }

  return (
    <VStack width="100%" spacing={6}>
      <VStack w="full" spacing={2} alignItems="start">
        <H2 size="2xl" bold>
          {t('Basket')}
        </H2>
        {hasSelectedRewards ? (
          <VStack w="full">
            {rewards.map((reward) => {
              return <FundingFormRewardItem showOnSelected readOnly={readOnly} key={reward.id} reward={reward} />
            })}
          </VStack>
        ) : (
          <Text>{t('No rewards are selected')}</Text>
        )}
      </VStack>

      <VStack w="full" spacing={2} alignItems="start">
        <H2 size="2xl" bold>
          {t('Available Rewards')}
        </H2>
        <VStack w="full">
          {availableRewards.map((reward) => {
            return <FundingFormRewardItem showOnEmpty readOnly={readOnly} key={reward.id} reward={reward} />
          })}
        </VStack>
      </VStack>
    </VStack>
  )
}
