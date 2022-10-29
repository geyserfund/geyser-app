import React from 'react';
import { Box, VStack } from '@chakra-ui/react';
import { DonationInput } from '../../../components/molecules';
import { SectionTitle } from '../../../components/ui';
import { IProjectReward, IRewardCount } from '../../../interfaces';
import { IFundForm } from '../../../hooks';
import { FundingFormRewardItem } from '../components/FundingFormRewardItem';

type Props = {
  setFormState: any;
  updateReward: (_: IRewardCount) => void;
  rewards?: IProjectReward[];
  formState?: IFundForm;
};

export const RewardBasedFundingFormSection = ({
  setFormState,
  updateReward,
  rewards = [],
  formState,
}: Props) => {
  if (rewards.length === 0) {
    return null;
  }

  const getRewardCount = (rewardId: number) =>
    formState?.rewardsByIDAndCount
      ? formState?.rewardsByIDAndCount[`${rewardId}` as keyof IProjectReward]
      : 0;

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

      <Box width="100%">
        <SectionTitle>Donate to receive a reward</SectionTitle>
          <VStack padding="2px">
            {rewards.map((reward: IProjectReward) => (
              <FundingFormRewardItem
                key={reward.id}
                /* Hard-coding USD as reward currency as a quick fix. Seeing as it is used accross several places, a
                 * sensible refactor would be to set the ProjectCurrency as a a shared context variable.
                 */
                item={reward}
                count={getRewardCount(reward.id)}
                updateCount={updateReward}
              />
            ))}
          </VStack>
        </Box>
      )}
    </VStack>
  );
};
