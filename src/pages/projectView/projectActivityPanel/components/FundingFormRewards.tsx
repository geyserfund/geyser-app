import { CheckIcon } from '@chakra-ui/icons'
import { Box, HStack, IconButton, Text, VStack } from '@chakra-ui/react'

import { ItemCard } from '../../../../components/layouts/ItemCard'
import { SectionTitle } from '../../../../components/ui'
import { useProjectContext } from '../../../../context'
import { FundingFormRewardItem } from '../../projectMainBody/components'

export const FundingFormRewards = () => {
  const {
    project,
    fundForm: { state, updateReward },
  } = useProjectContext()

  const rewards = project?.rewards || []

  const hasRewards = rewards && rewards.length

  if (!hasRewards) {
    return null
  }

  const rewardsById = state.rewardsByIDAndCount || {}

  const hasSelectedRewards = Boolean(
    Object.keys(rewardsById).reduce(
      (prev, key) => prev + (rewardsById[key] || 0),
      0,
    ),
  )

  const getRewardCount = (rewardId: number) =>
    state.rewardsByIDAndCount ? state.rewardsByIDAndCount[`${rewardId}`] : 0

  return (
    <Box width="100%">
      <SectionTitle>Donate to receive a reward</SectionTitle>

      {rewards.length > 0 ? (
        <VStack mt={1} padding="2px">
          <ItemCard cursor="initial">
            <HStack>
              <Text flexGrow={1} fontWeight={500}>
                No reward
              </Text>
              <IconButton
                variant="secondary"
                isActive={!hasSelectedRewards}
                border={
                  hasSelectedRewards ? `1px solid ${'neutral.200'}` : undefined
                }
                aria-label="select-reward"
                icon={hasSelectedRewards ? undefined : <CheckIcon />}
              />
            </HStack>
          </ItemCard>
          {rewards.map((reward) => (
            <FundingFormRewardItem
              key={reward.id}
              item={reward}
              count={getRewardCount(reward.id)}
              updateCount={updateReward}
            />
          ))}
        </VStack>
      ) : null}
    </Box>
  )
}
