import { VStack } from '@chakra-ui/react'

import { MobileViews, useProjectContext } from '../../../../../context'
import { ProjectRewardForCreateUpdateFragment } from '../../../../../types'
import { FundingFormRewards } from './FundingFormRewards'

export const RewardSelectionScreen = () => {
  const {
    setMobileView,
    fundForm: { updateReward },
  } = useProjectContext()
  const onRewardClick = (reward: ProjectRewardForCreateUpdateFragment) => {
    updateReward({ id: reward.id, count: 1 })
    setMobileView(MobileViews.funding)
  }

  return (
    <VStack
      py={4}
      px={{ base: 2, lg: 4 }}
      width="100%"
      height="100%"
      position="relative"
      alignItems="flex-start"
      backgroundColor="neutral.0"
    >
      <FundingFormRewards readOnly onRewardClick={onRewardClick} />
    </VStack>
  )
}
