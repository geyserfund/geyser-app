import { Box, Text, VStack } from '@chakra-ui/layout';
import { NumberInput, NumberInputField } from '@chakra-ui/number-input';
import { CloseButton } from '@chakra-ui/close-button';
import { Textarea } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { HiOutlineSpeakerphone } from 'react-icons/hi';
import { SatoshiIcon } from '../../components/icons';
import { CircularFundProgress } from '../../components/molecules';
import { IdBar } from '../../components/molecules/IdBar';
import { BadgeVariant, ButtonComponent, Card, CustomToggle } from '../../components/ui';
import { isDarkMode, isMobileMode } from '../../utils';
import { IProject } from '../../interfaces';
import { useMutation } from '@apollo/client';
import { MUTATION_FUND_PROJECT } from '../../graphql/mutations/fund';
// Import { useMutation } from '@apollo/client';
// import { MUTATION_FUND_PROJECT } from '../../graphql/mutations/fund';

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

interface IActivityProps {
	project: IProject
}

const Activity = ({ project }: IActivityProps) => {
	const [fundPage, setFundpage] = useState(true);
	const [completedFunding, setCompletedFunding] = useState(false);
	const [btcRate, setBtcRate] = useState(0);
	const [amount, setAmount] = useState(0);
	// Const [comment, setComment] = useState('');

	const [fundProject, { data, loading, error }] = useMutation(MUTATION_FUND_PROJECT);

	useEffect(() => {
		getBitcoinRates();
	}, []);

	const handleFundProject = () => {
		setFundpage(false);
	};

	const handleCloseButton = () => {
		setFundpage(true);
	};

	const handleFund = () => {
		setCompletedFunding(true);
		fundProject({
			variables: {
				projectId: project.id,
				amount,
			},
		});
	};

	console.log('checking data loading and error', data, loading, error);

	const isDark = isDarkMode();
	const isMobile = isMobileMode();

	const getBitcoinRates = async () => {
		const response: any = (await fetch('https://api.coinbase.com/v2/exchange-rates?currency=BTC'));
		const responseJson = await response.json();
		console.log('checking response', responseJson);
		console.log('checking btc', responseJson.data.rates.USD);
		const satoshirate = responseJson.data.rates.USD * 0.00000001;
		setBtcRate(satoshirate);
	};

	const handleInput = (stringv: string, numberv: number) => {
		console.log('Checking input', stringv, numberv);

		if (!numberv) {
			setAmount(0);
			return;
		}

		setAmount(numberv);
	};

	console.log('checking project', project);

	const infoPage = () => (
		<VStack
			padding={isMobile ? '10px 0px' : '10px 20px'}
			spacing="12px"
			width="100%"
			height="100%"
			overflowY="hidden"
			margin="10px 15px"
		>
			<CircularFundProgress rate={btcRate} goal={170000} amount={parseInt(project.balance, 10)} />
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
					flexDirection="column"
					justifyContent="center"
					alignItems="center"
				>
					<Box
						display="flex"
						justifyContent="center"
						alignItems="center"
						width="80%"
						position="relative"
					>
						<NumberInput variant="unstyled" marginLeft="10px" onChange={handleInput} value={amount}>
							<NumberInputField placeholder={'2000'} fontSize="30px" textAlign="center" />
						</NumberInput>
						<Box position="absolute" right={20}>
							<SatoshiIcon fontSize="30px" marginRight="10px" marginBottom="5px" />
						</Box>
					</Box>
					<Text color="brand.textGrey" fontSize="12px">{`$ ${btcRate * amount}`}</Text>
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
				{/* <Checkbox colorScheme="green" defaultValue="false">
					Remain Anonymous
				</Checkbox> */}
				<CustomToggle />
			</Box>
			<Box width="100%">
				<ButtonComponent
					primary
					standard
					leftIcon={<SatoshiIcon />}
					width="100%"
					marginTop="15px"
					onClick={handleFund}
				>
					Fund project
				</ButtonComponent>
			</Box>

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
