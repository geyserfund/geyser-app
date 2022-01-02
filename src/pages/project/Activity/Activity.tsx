import { Box, Text, VStack } from '@chakra-ui/layout';
import React, { useEffect, useState } from 'react';
import { HiOutlineSpeakerphone } from 'react-icons/hi';
import { SatoshiIcon } from '../../../components/icons';
import { CircularFundProgress } from '../../../components/molecules';
import { IdBar } from '../../../components/molecules/IdBar';
import { ButtonComponent, Card, FundingStatus } from '../../../components/ui';
import { IFundingTx, IProject, IProjectUser } from '../../../interfaces';
import { useLazyQuery, useMutation } from '@apollo/client';
import { MUTATION_FUND_PROJECT } from '../../../graphql/mutations/fund';
import { QUERY_GET_FUNDING } from '../../../graphql';
import { setInterval } from 'timers';
import { SuccessPage } from './SuccessPage';
import { QrPage } from './QrPage';
import { getDaysLeft, isDarkMode, isMobileMode } from '../../../utils';
import { PaymentPage } from './PaymentPage';

interface IActivityProps {
	project: IProject
}

const initialFunding = {
	id: '',
	invoiceId: '',
	paid: false,
	amount: 0,
	paymentRequest: '',
	canceled: false,
};

let fundInterval: any;
const Activity = ({ project }: IActivityProps) => {
	const [fundPage, setFundpage] = useState(true);
	const [completedFunding, setCompletedFunding] = useState(false);
	const [startedFunding, setStartedFunding] = useState(false);
	const [btcRate, setBtcRate] = useState(0);
	const [amount, setAmount] = useState(0);
	const [comment, setComment] = useState('');
	const [anonymous, setAnonymous] = useState(false);

	const [fundingTx, setFundingTx] = useState<IFundingTx>(initialFunding);

	const [fundProject, {
		data,
		// Loading,
		// error,
	}] = useMutation(MUTATION_FUND_PROJECT);

	const [getFunding, { loading: fundLoading, error: fundError, data: fundData }] = useLazyQuery(QUERY_GET_FUNDING,
		{
			variables: { fundingTxId: fundingTx.id },
			fetchPolicy: 'network-only',
		},
	);

	console.log('checking fund loading', fundLoading);
	console.log('checking fund error', fundError);
	console.log('checking fund data', fundData);

	useEffect(() => {
		if (fundData && fundData.getFundingTx) {
			if (fundData.getFundingTx.paid || fundData.getFundingTx.canceled) {
				clearInterval(fundInterval);
				setCompletedFunding(true);
			}
		}
	}, [fundData]);

	useEffect(() => {
		if (completedFunding) {
			console.log('inside clear');
			clearInterval(fundInterval);
		}

		if (startedFunding && !completedFunding) {
			fundInterval = setInterval(getFunding, 2000);
		}
	}, [startedFunding, completedFunding]);

	useEffect(() => {
		getBitcoinRates();
	}, []);

	useEffect(() => {
		if (data && data.fundProject && data.fundProject.success) {
			console.log('checking funding data', data.fundProject.fundingTx);
			setFundingTx(data.fundProject.fundingTx);
			setStartedFunding(true);
			setCompletedFunding(false);
		}
	}, [data]);

	const isDark = isDarkMode();
	const isMobile = isMobileMode();

	const getBitcoinRates = async () => {
		const response: any = (await fetch('https://api.coinbase.com/v2/exchange-rates?currency=BTC'));
		const responseJson = await response.json();
		const satoshirate = responseJson.data.rates.USD * 0.00000001;
		setBtcRate(satoshirate);
	};

	const handleFundProject = () => {
		setFundpage(false);
	};

	const handleCloseButton = () => {
		setFundpage(true);
	};

	const handleFund = () => {
		fundProject({
			variables: {
				projectId: project.id,
				amount,
				comment,
				anonymous,
			},
		});
	};

	const users: IProjectUser[] = project.funders;

	console.log('checkign users', users);

	const infoPage = () => (
		<VStack
			padding={isMobile ? '10px 0px' : '10px 20px'}
			spacing="12px"
			width="100%"
			height="100%"
			overflowY="hidden"
			margin="10px 15px"
		>
			<FundingStatus open={true} />
			<CircularFundProgress rate={btcRate} goal={parseInt(project.fundingGoal, 10)} amount={parseInt(project.balance, 10)} />
			<Text>{`${getDaysLeft(project.expiresAt)} to go`}</Text>
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
							<IdBar key={index} {...user.user} />
						))
					}
				</VStack>

			</Box>
		</VStack>);

	return (
		<Card
			flex={2}
			maxWidth={isMobile ? 'auto' : '450px'}
			display="flex"
			flexDirection="column"
			justifyContent="flex-start"
			alignItems="center"
			backgroundColor={isDark ? 'brand.bgGreyDark' : 'white'}
		>

			{completedFunding
				? <SuccessPage />
				: startedFunding
					? <QrPage
						comment={comment}
						title={project.title}
						amount={amount}
						owner={project.owner.user.username}
						qrCode={fundingTx.paymentRequest}
					/>
					: fundPage
						? infoPage()
						: <PaymentPage
							{...{
								isMobile,
								handleCloseButton,
								btcRate,
								amount,
								setAmount,
								comment,
								setComment,
								anonymous,
								setAnonymous,
								handleFund,
							}}
						/>
			}

		</Card>
	);
};

export default Activity;
