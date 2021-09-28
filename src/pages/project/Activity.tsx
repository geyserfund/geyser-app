import { Box, Text, VStack } from '@chakra-ui/layout';
import React from 'react';
import { HiOutlineSpeakerphone } from 'react-icons/hi';
import { SatoshiIcon } from '../../components/icons';
import { CircularFundProgress } from '../../components/molecules';
import { IdBar } from '../../components/molecules/IdBar';
import { BadgeVariant, ButtonComponent, Card } from '../../components/ui';
import { isDarkMode, isMobileMode } from '../../utils';

interface IuserInfo {
	URL: string;
	userName: string;
	fullName: string;
	twitter: boolean;
	badge: BadgeVariant;
	amount: number;
}

const Activity = () => {
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
	const isMobile = isMobileMode();

	return (
		<Card
			flex={2}
			maxWidth={isMobile ? 'auto' : '450px'}
			padding="10px 15px"
			display="flex"
			flexDirection="column"
			justifyContent="flex-start"
			alignItems="center"
			backgroundColor={isDark ? 'brand.bgGreyDark' : 'white'}
			borderRadius={isMobile ? '22px' : '0px 22px 22px 0px'}
		>
			<VStack padding={isMobile ? '10px 0px' : '10px 20px'} spacing="12px" width="100%" height="100%" overflowY="hidden">
				<CircularFundProgress amount={2000} />
				<ButtonComponent primary standard leftIcon={<SatoshiIcon />} width="100%" >Fund this project</ButtonComponent>
				<ButtonComponent standard leftIcon={<HiOutlineSpeakerphone fontSize="20px" />} width="100%" >Share with Friends</ButtonComponent>
				<Box width="100%" display="flex" flexDirection="column" alignItems="start" overflow="hidden" height="-webkit-fill-available">
					<Text fontSize="16px" marginBottom="10px" marginTop="10px">
						{`Project Backers ${users.length ? `( ${users.length} )` : ''}`}
					</Text>
					<VStack spacing={'8px'} width="100%" overflow="auto" height="calc(100% - 60px)" paddingBottom="30px">
						{
							users.map((user, index) => (
								<IdBar key={index} {...user} />
							))
						}
					</VStack>

				</Box>
			</VStack>

		</Card>
	);
};

export default Activity;
