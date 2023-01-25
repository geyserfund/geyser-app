import { Box, VStack } from '@chakra-ui/react'

import { DonationInput } from '../../components/molecules'
import { SectionTitle } from '../../components/ui'
import { IFundForm } from '../../hooks'
import { IRewardCount } from '../../interfaces'
import { ProjectReward } from '../../types/generated/graphql'
import { FundingFormRewardItem } from './components/FundingFormRewardItem'

type Props = {
  setFormState: any
  updateReward: (_: IRewardCount) => void
  rewards?: ProjectReward[]
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
      ? formState?.rewardsByIDAndCount[`${rewardId}` as keyof ProjectReward]
      : 0

  const hasRewards = rewards && rewards.length > 0

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
            <VStack padding="2px">
              {rewards.map((reward: ProjectReward) => (
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
