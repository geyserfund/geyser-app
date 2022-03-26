import React from 'react';
import { Box, VStack } from '@chakra-ui/react';
import { DonationInput, RewardItem } from '../../../components/molecules';
import { SectionTitle } from '../../../components/ui';
import { IProjectReward, IRewardCount } from '../../../interfaces';

interface IRewardBasedProps {
    setState: any;
	updateReward: (_:IRewardCount)=> void;
	rewards?: IProjectReward[]
}

export const RewardBased = ({setState, updateReward, rewards}: IRewardBasedProps) => {
	if (!rewards || !(rewards.length > 0)) {
		return (
			<VStack width="100%" spacing="12px" flex="1" overflowY="auto" overflowX="visible">
				<Box width="100%" >
					<SectionTitle>No any rewards</SectionTitle>
				</Box>
			</VStack>
		);
	}

	return (
		<VStack width="100%" spacing="12px" flex="1" overflowY="auto" overflowX="visible">
			<Box width="100%" >
				<SectionTitle>Donate to this idea</SectionTitle>
				<DonationInput name="donationAmount" onChange={setState}/>
			</Box>
			<Box width="100%" >
				<SectionTitle>Donate to receive a reward</SectionTitle>
				<VStack padding="2px">
					{
						rewards.map((reward: IProjectReward) => (
							<RewardItem
								key={reward.id}
								item={reward}
								updateCount={ updateReward}
							/>),
						)
					}
				</VStack>
			</Box>

		</VStack>);
};
