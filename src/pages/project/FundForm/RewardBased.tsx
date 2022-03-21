import React from 'react';
import { Box, Text, VStack } from '@chakra-ui/react';
import { DonationInput, RewardItem } from '../../../components/molecules';

interface setState {
    setState: any;
}

export const RewardBased = ({setState}: setState) => (
	<VStack width="100%">
		<Box width="100%" >
			<Text lineHeight="26px" fontWeight={600}>Donate to this idea</Text>
			<DonationInput name="donationAmount" onChange={setState}/>
		</Box>
		<Box width="100%" >
			<Text lineHeight="26px" fontWeight={600}>Donate to receive a reward</Text>
			<VStack>
				<RewardItem item={{
					price: 60,
					title: 'Bitcoin board game',
					backers: 23,
					description: 'Get the full game.',
				}}
				/>
			</VStack>
		</Box>

	</VStack>);
