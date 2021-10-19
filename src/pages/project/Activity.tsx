import { Box, Text, VStack } from '@chakra-ui/layout';
import { NumberInput, NumberInputField } from '@chakra-ui/number-input';
import { CloseButton } from '@chakra-ui/close-button';
import { Checkbox } from '@chakra-ui/checkbox';
import { Textarea } from '@chakra-ui/react';
import React, { useState } from 'react';
import { HiOutlineSpeakerphone } from 'react-icons/hi';
import { SatoshiIcon } from '../../components/icons';
import { CircularFundProgress } from '../../components/molecules';
import { IdBar } from '../../components/molecules/IdBar';
import { BadgeVariant, ButtonComponent, Card } from '../../components/ui';
import { isDarkMode, isMobileMode } from '../../utils';

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
		badge: 'crown',
		amount: 200000,
	},
	{
		URL: 'https://bit.ly/dan-abramov',
		userName: 'danAbramov',
		fullName: 'Dan Abrahmov',
		twitter: true,
		badge: 'medal',
		amount: 200000,
	},
	{
		URL: 'https://bit.ly/dan-abramov',
		userName: 'danAbramov',
		fullName: 'Dan Abrahmov',
		twitter: true,
		badge: 'earlyFunder',
		amount: 200000,
	},
	{
		URL: 'https://bit.ly/dan-abramov',
		userName: 'danAbramov',
		fullName: 'Dan Abrahmov',
		twitter: true,
		badge: 'ownerPending',
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
interface IuserInfo {
	URL: string;
	userName: string;
	fullName: string;
	twitter: boolean;
	badge: BadgeVariant;
	amount: number;
}

const Activity = () => {
	const [fundPage, setFundpage] = useState(true);
	const [completedFunding, setCompletedFunding] = useState(false);

	const handleFundProject = () => {
		setFundpage(false);
	};

	const handleCloseButton = () => {
		setFundpage(true);
	};

	const handleFund = () => {
		setCompletedFunding(true);
	};

	const isDark = isDarkMode();
	const isMobile = isMobileMode();

	const infoPage = () => (
		<VStack
			padding={isMobile ? '10px 0px' : '10px 20px'}
			spacing="12px"
			width="100%"
			height="100%"
			overflowY="hidden"
			margin="10px 15px"
		>
			<CircularFundProgress amount={2000} />
			<ButtonComponent
				primary
				standard
				leftIcon={<SatoshiIcon />}
				width="100%"
				onClick={handleFundProject}
			>
				Fund this project
			</ButtonComponent>
			<ButtonComponent
				standard
				leftIcon={<HiOutlineSpeakerphone fontSize="20px" />}
				width="100%"
			>
				Share with Friends
			</ButtonComponent>
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
		</VStack>);

	const paymentPage = () => (
		<VStack
			padding={isMobile ? '10px 0px' : '10px 20px'}
			margin="10px 15px"
			spacing="12px"
			width="100%"
			height="100%"
			overflowY="hidden"
			paddingTop="40px"
			position="relative"
		>
			<CloseButton
				borderRadius="50%"
				position="absolute"
				right="10px"
				top="10px"
				onClick={handleCloseButton}
			/>
			<Box width="100%" >
				<Text lineHeight="26px">Send amount</Text>
				<Box
					backgroundColor="brand.bgGreen"
					height="85px"
					borderRadius="12px"
					display="flex"
					justifyContent="center"
					alignItems="center"
				>
					<NumberInput variant="unstyled" marginLeft="10px">
						<NumberInputField placeholder={'2000'} fontSize="30px" textAlign="center" />
					</NumberInput>
					<SatoshiIcon fontSize="30px" marginRight="10px" marginBottom="5px" />
				</Box>

			</Box>
			<Box width="100%" >
				<Text lineHeight="26px">Comment</Text>
				<Box
					backgroundColor="brand.bgGreen"
					height="85px"
					borderRadius="12px"
					display="flex"
					justifyContent="center"
					alignItems="center"
				>
					<Textarea variant="unstyled" fontSize="14px" margin="5px" />
				</Box>

			</Box>
			<Box width="100%">
				<Checkbox colorScheme="green" defaultValue="false">
					Remain Anonymous
				</Checkbox>
			</Box>
			<ButtonComponent
				primary
				standard
				leftIcon={<SatoshiIcon />}
				width="100%"
				onClick={handleFund}
			>
				Fund project
			</ButtonComponent>

		</VStack>);

	const successPage = () => (
		<VStack
			padding={isMobile ? '10px 10px' : '10px 20px'}
			spacing="12px"
			width="100%"
			height="100%"
			overflowY="hidden"
			position="relative"
			backgroundColor="brand.primary"
			alignItems="center"
			justifyContent="center"
		>
			<Text fontSize="30px" width="70%" textAlign="center">
				21000
				Successfully Funded!
			</Text>
			<ButtonComponent
				standard
				leftIcon={<HiOutlineSpeakerphone />}
				width="100%"
				onClick={handleFund}
			>
				Share project with friends
			</ButtonComponent>
		</VStack>
	);

	return (
		<Card
			flex={2}
			maxWidth={isMobile ? 'auto' : '450px'}
			// Padding="10px 15px"
			display="flex"
			flexDirection="column"
			justifyContent="flex-start"
			alignItems="center"
			backgroundColor={isDark ? 'brand.bgGreyDark' : 'white'}
			borderRadius={isMobile ? '22px' : '0px 22px 22px 0px'}
		>

			{completedFunding ? successPage() : fundPage ? infoPage() : paymentPage()}

		</Card>
	);
};

export default Activity;
