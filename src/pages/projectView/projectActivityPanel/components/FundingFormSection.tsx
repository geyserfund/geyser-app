import { CheckIcon } from '@chakra-ui/icons'
import { Box, HStack, IconButton, Text, VStack } from '@chakra-ui/react'

import { ItemCard } from '../../../../components/layouts/ItemCard'
import { DonationInput } from '../../../../components/molecules'
import { SectionTitle } from '../../../../components/ui'
import { IFundForm } from '../../../../hooks'
import { IRewardCount } from '../../../../interfaces'
import { colors } from '../../../../styles'
import { ProjectRewardForCreateUpdateFragment } from '../../../../types/generated/graphql'
import { FundingFormRewardItem } from '../../projectMainBody/components/FundingFormRewardItem'

type Props = {
  setFormState: any
  updateReward: (_: IRewardCount) => void
  rewards?: ProjectRewardForCreateUpdateFragment[]
  formState?: IFundForm
}

export const FundingFormSection = ({
  setFormState,
  updateReward,
  rewards = [],
  formState,
}: Props) => {
  const getRewardCount = (rewardId: number) =>
    formState?.rewardsByIDAndCount
      ? formState?.rewardsByIDAndCount[
          `${rewardId}` as keyof ProjectRewardForCreateUpdateFragment
        ]
      : 0

  const hasRewards = rewards && rewards.length

  const rewardsById = formState?.rewardsByIDAndCount || {}

  const hasSelectedRewards = Boolean(
    Object.keys(rewardsById).reduce(
      (prev, key) => prev + (rewardsById[key] || 0),
      0,
    ),
  )

  return (
    <VStack
      marginTop="0px !important"
      width="100%"
      spacing="30px"
      flex="1"
      overflowX="visible"
    >
      <Box width="100%">
        <SectionTitle>Donate to this idea</SectionTitle>

        <DonationInput
          inputGroup={{ padding: '2px' }}
          name="donationAmount"
          onChange={setFormState}
        />
      </Box>

      {hasRewards && (
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
                    sx={{
                      border: hasSelectedRewards
                        ? `1px solid ${colors.neutral200}`
                        : undefined,
                    }}
                    backgroundColor={
                      hasSelectedRewards ? colors.bgWhite : colors.primary
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
      )}
    </VStack>
  )
}
