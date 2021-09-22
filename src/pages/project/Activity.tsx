import { Box, Text, VStack } from '@chakra-ui/layout';
import React from 'react';
import { HiOutlineSpeakerphone } from 'react-icons/hi';
import { SatoshiIcon } from '../../components/icons';
import { CircularFundProgress } from '../../components/molecules';
import { IdBar } from '../../components/molecules/IdBar';
import { BadgeVariant, ButtonComponent } from '../../components/ui';
import { isDarkMode } from '../../utils';

interface IuserInfo {
	URL: string;
	userName: string;
	fullName: string;
	twitter: boolean;
	badge: BadgeVariant;
	amount: number;
}

export const Activity = () => {
	const users: IuserInfo[] = [
		{
			URL: 'https://bit.ly/dan-abramov',
			userName: 'danAbramov',
			fullName: 'Dan Abrahmov',
			twitter: true,
			badge: 'ambassador',
			amount: 120,
		},
		{
			URL: 'https://bit.ly/dan-abramov',
			userName: 'danAbramov',
			fullName: 'Dan Abrahmov',
			twitter: true,
			badge: 'ambassador',
			amount: 200000,
		},
		{
			URL: 'https://bit.ly/dan-abramov',
			userName: 'danAbramov',
			fullName: 'Dan Abrahmov',
			twitter: true,
			badge: 'ambassador',
			amount: 200000,
		},
		{
			URL: 'https://bit.ly/dan-abramov',
			userName: 'danAbramov',
			fullName: 'Dan Abrahmov',
			twitter: true,
			badge: 'ambassador',
			amount: 200000,
		},
		{
			URL: 'https://bit.ly/dan-abramov',
			userName: 'danAbramov',
			fullName: 'Dan Abrahmov',
			twitter: true,
			badge: 'ambassador',
			amount: 200000,
		},
		{
			URL: 'https://bit.ly/dan-abramov',
			userName: 'danAbramov',
			fullName: 'Dan Abrahmov',
			twitter: true,
			badge: 'ambassador',
			amount: 200000,
		},
		{
			URL: 'https://bit.ly/dan-abramov',
			userName: 'danAbramov',
			fullName: 'Dan Abrahmov',
			twitter: true,
			badge: 'ambassador',
			amount: 200000,
		},
		{
			URL: 'https://bit.ly/dan-abramov',
			userName: 'danAbramov',
			fullName: 'Dan Abrahmov',
			twitter: true,
			badge: 'ambassador',
			amount: 200000,
		},

	];

	const isDark = isDarkMode();

	return (
		<Box
			flex={2}
			padding="10px 15px"
			display="flex"
			flexDirection="column"
			justifyContent="flex-start"
			alignItems="center"
			backgroundColor={isDark ? 'brand.bgGreyDark' : 'white'}
		>
			<VStack padding="10px 20px" spacing="12px" width="100%" overflowY="hidden">
				<CircularFundProgress amount={2000} />
				<ButtonComponent primary standard leftIcon={<SatoshiIcon />} width="100%">Fund this project</ButtonComponent>
				<ButtonComponent standard leftIcon={<HiOutlineSpeakerphone fontSize="20px" />} width="100%">Share with Friends</ButtonComponent>
				<Box width="100%" marginTop="20px" display="flex" flexDirection="column" alignItems="start" overflow="hidden">
					<Text fontSize="16px" marginBottom="10px">
						{`Project Backers ${users.length ? `( ${users.length} )` : ''}`}
					</Text>
					<VStack spacing={'12px'} width="100%" overflow="auto">
						{
							users.map((user, index) => (
								<IdBar key={index} {...user} />
							))
						}
					</VStack>

				</Box>
			</VStack>

		</Box>
	);
};
