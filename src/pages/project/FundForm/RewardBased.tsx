import React from 'react';
import { Box, VStack } from '@chakra-ui/react';
import { DonationInput, RewardItem } from '../../../components/molecules';
import { SectionTitle } from '../../../components/ui';
import { IProjectReward, IRewardCount } from '../../../interfaces';
import { IFundForm } from '../../../hooks';

interface IRewardBasedProps {
  setState: any;
  updateReward: (_: IRewardCount) => void;
  rewards?: IProjectReward[];
  state?: IFundForm;
}

export const RewardBased = ({
  setState,
  updateReward,
  rewards,
  state,
}: IRewardBasedProps) => {
  if (!rewards || !(rewards.length > 0)) {
    return (
      <VStack width="100%" spacing="12px" flex="1" overflowX="visible">
        <Box width="100%">
          <SectionTitle>Not any rewards</SectionTitle>
        </Box>
      </VStack>
    );
  }

  const getRewardCount = (rewardId: number) => state?.rewards[`${rewardId}`];

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
          onChange={setState}
        />
      </Box>
      <Box width="100%">
        <SectionTitle>Donate to receive a reward</SectionTitle>
        <VStack padding="2px">
          {rewards.map((reward: IProjectReward) => (
            <RewardItem
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
