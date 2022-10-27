import React from 'react';
import { Box, VStack } from '@chakra-ui/react';
import { DonationInput } from '../../../components/molecules';
import { SectionTitle } from '../../../components/ui';
import { IRewardCount } from '../../../interfaces';
import { IFundForm } from '../../../hooks';
import { FundingFormRewardItem } from '../components/FundingFormRewardItem';
import { ProjectReward } from '../../../types/generated/graphql';

type Props = {
  setFormState: any;
  updateReward: (_: IRewardCount) => void;
  rewards?: ProjectReward[];
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
      ? formState?.rewardsByIDAndCount[`${rewardId}` as keyof ProjectReward]
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
          {rewards.map((reward: ProjectReward) => (
            <FundingFormRewardItem
              key={reward.id}
              item={reward}
              count={getRewardCount(reward.id)}
              updateCount={updateReward}
            />
          ))}
        </VStack>
      </Box>
    </VStack>
  );
};
