import React from 'react';
import { Box, VStack } from '@chakra-ui/react';
import { DonationInput, RewardItem } from '../../../components/molecules';
import { SectionTitle } from '../../../components/ui';
import { IRewardCount } from '../../../interfaces';

interface IRewardBasedProps {
    setState: any;
	updateReward: (_:IRewardCount)=> void;
}

export const RewardBased = ({setState, updateReward}: IRewardBasedProps) => (
	<VStack width="100%" spacing="12px" flex="1" overflowY="auto" overflowX="visible">
		<Box width="100%" >
			<SectionTitle>Donate to this idea</SectionTitle>
			<DonationInput name="donationAmount" onChange={setState}/>
		</Box>
		<Box width="100%" >
			<SectionTitle>Donate to receive a reward</SectionTitle>
			<VStack padding="2px">
				<RewardItem item={{
					id: 2,
					price: 60,
					title: 'Bitcoin board game',
					backers: 23,
					description: 'Get the full game.',
				}}
				updateCount={ updateReward}
				/>
				<RewardItem item={{
					id: 3,
					price: 60,
					title: 'Bitcoin board game',
					backers: 23,
					description: 'Get the full game.',
				}}
				updateCount={ updateReward}
				/>
				<RewardItem item={{
					id: 4,
					price: 60,
					title: 'Bitcoin board game',
					backers: 23,
					description: 'Get the full game.',
				}}
				updateCount={ updateReward}
				/>
				<RewardItem item={{
					id: 5,
					price: 60,
					title: 'Bitcoin board game',
					backers: 23,
					description: 'Get the full game.',
				}}
				updateCount={ updateReward}
				/>
				<RewardItem item={{
					id: 6,
					price: 60,
					title: 'Bitcoin board game',
					backers: 23,
					description: 'Get the full game.',
				}}
				updateCount={ updateReward}
				/>
			</VStack>
		</Box>

	</VStack>);
